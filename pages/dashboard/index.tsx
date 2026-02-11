import { DashboardComponents } from "@components/pages";

import type { NextPageWithLayout } from "@types";

import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";

import { useUser } from "@hooks";
import { DashboardLayout } from "@components/composition";

const MY_ACCOUNTS = gql`
  query MyAccounts {
    myAccounts {
      id
      accountType
      accountNumber
      routingNumber
      balance
      apyRate
      isActive
    }
  }
`;

const CREATE_ACCOUNT = gql`
  mutation CreateAccount($createAccountInput: CreateAccountInput!) {
    createAccount(createAccountInput: $createAccountInput) {
      id
      accountType
      balance
    }
  }
`;

const TRANSACTIONS = gql`
  query Transactions($accountId: ID!, $filters: FilterTransactionsInput) {
    transactions(accountId: $accountId, filters: $filters) {
      id
      transactionType
      amount
      merchantName
      description
      status
      transactionDate
    }
  }
`;

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(amount));

const formatGroupDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const formatTxTime = (dateStr: string): string =>
  new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const isPositiveAmount = (type: string, amount: number): boolean =>
  type === "DIRECT_DEPOSIT" || (type === "TRANSFER" && amount > 0);

const getIconLetter = (name: string): string =>
  (name?.[0] || "T").toUpperCase();

interface TransactionItem {
  id: string;
  transactionType: string;
  amount: number;
  merchantName?: string;
  description?: string;
  status: string;
  transactionDate: string;
}

const DashboardPage: NextPageWithLayout = () => {
  const { push: navigate } = useRouter();
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"CHECKING" | "SAVINGS">(
    "CHECKING"
  );
  const txSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasToken = mounted && !!localStorage.getItem("accessToken");

  const { data: accountsData, loading: accountsLoading } = useQuery(
    MY_ACCOUNTS,
    { skip: !hasToken }
  );

  const [createAccount] = useMutation(CREATE_ACCOUNT, {
    refetchQueries: [{ query: MY_ACCOUNTS }],
  });
  const initRef = useRef(false);
  const [initializing, setInitializing] = useState(false);

  const accounts = accountsData?.myAccounts ?? [];
  const checkingAccount = accounts.find(
    (a: any) => a.accountType === "CHECKING"
  );
  const savingsAccount = accounts.find(
    (a: any) => a.accountType === "SAVINGS"
  );

  useEffect(() => {
    if (!accountsData || accountsLoading || initRef.current) return;

    const missing: string[] = [];
    if (!checkingAccount) missing.push("CHECKING");
    if (!savingsAccount) missing.push("SAVINGS");
    if (missing.length === 0) return;

    initRef.current = true;
    setInitializing(true);
    Promise.all(
      missing.map(type =>
        createAccount({
          variables: { createAccountInput: { accountType: type } },
        })
      )
    ).finally(() => setInitializing(false));
  }, [accountsData, accountsLoading, checkingAccount, savingsAccount, createAccount]);

  const { data: checkingTxData } = useQuery(TRANSACTIONS, {
    skip: !checkingAccount?.id,
    variables: { accountId: checkingAccount?.id },
    fetchPolicy: "cache-and-network",
  });

  const { data: savingsTxData } = useQuery(TRANSACTIONS, {
    skip: !savingsAccount?.id,
    variables: { accountId: savingsAccount?.id },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (mounted && !hasToken) {
      navigate("/users/log-in");
    }
  }, [mounted, hasToken, navigate]);

  const activeTransactions: TransactionItem[] = useMemo(() => {
    const data =
      activeTab === "CHECKING"
        ? checkingTxData?.transactions
        : savingsTxData?.transactions;
    return data ?? [];
  }, [activeTab, checkingTxData, savingsTxData]);

  const groupedTransactions = useMemo(() => {
    const grouped: Record<string, TransactionItem[]> = {};
    for (const tx of activeTransactions) {
      const dateKey = formatGroupDate(tx.transactionDate);
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(tx);
    }
    return grouped;
  }, [activeTransactions]);

  const handleViewClick = (accountType: "CHECKING" | "SAVINGS") => {
    setActiveTab(accountType);
    txSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!mounted || !hasToken) return null;

  return (
    <DashboardComponents.Container>
      <Head>
        <title>Dashboard | Chime</title>
        <meta name="description" content="Your Chime Dashboard" />
      </Head>

      <DashboardComponents.Greeting>
        {user
          ? `${getGreeting()}, ${user.firstName}`
          : "Loading..."}
      </DashboardComponents.Greeting>

      {accountsLoading || initializing ? (
        <p>Loading your accounts...</p>
      ) : (
        <>
          <DashboardComponents.Grid>
            {checkingAccount && (
              <DashboardComponents.AccountCard>
                <div className="label">Available</div>
                <div className="type">Chime Checking</div>
                <div className="balance">
                  {formatCurrency(checkingAccount.balance)}
                </div>
                <button
                  className="view-btn"
                  onClick={() => handleViewClick("CHECKING")}
                >
                  View
                </button>
              </DashboardComponents.AccountCard>
            )}
            {savingsAccount && (
              <DashboardComponents.AccountCard>
                <div className="label">Available</div>
                <div className="type">Savings Account</div>
                <div className="balance">
                  {formatCurrency(savingsAccount.balance)}
                </div>
                <button
                  className="view-btn"
                  onClick={() => handleViewClick("SAVINGS")}
                >
                  View
                </button>
              </DashboardComponents.AccountCard>
            )}
          </DashboardComponents.Grid>

          <div ref={txSectionRef}>
            <DashboardComponents.SectionHeading>
              Recent Transactions
            </DashboardComponents.SectionHeading>

            <DashboardComponents.TabBar>
              <DashboardComponents.Tab
                $active={activeTab === "CHECKING"}
                onClick={() => setActiveTab("CHECKING")}
              >
                Chime
              </DashboardComponents.Tab>
              <DashboardComponents.Tab
                $active={activeTab === "SAVINGS"}
                onClick={() => setActiveTab("SAVINGS")}
              >
                Savings
              </DashboardComponents.Tab>
            </DashboardComponents.TabBar>

            {activeTransactions.length === 0 ? (
              <DashboardComponents.EmptyState>
                No transactions yet
              </DashboardComponents.EmptyState>
            ) : (
              Object.entries(groupedTransactions).map(([date, txs]) => (
                <div key={date}>
                  <DashboardComponents.DateHeader>
                    {date}
                  </DashboardComponents.DateHeader>
                  {txs.map(tx => {
                    const displayName =
                      tx.merchantName || tx.description || tx.transactionType;
                    const positive = isPositiveAmount(
                      tx.transactionType,
                      tx.amount
                    );
                    return (
                      <DashboardComponents.TransactionRow key={tx.id}>
                        <DashboardComponents.IconCircle>
                          {getIconLetter(displayName)}
                        </DashboardComponents.IconCircle>
                        <DashboardComponents.TxInfo>
                          <DashboardComponents.TxName>
                            {displayName}
                          </DashboardComponents.TxName>
                          <DashboardComponents.TxDate>
                            {formatTxTime(tx.transactionDate)}
                          </DashboardComponents.TxDate>
                        </DashboardComponents.TxInfo>
                        <DashboardComponents.TxAmount $positive={positive}>
                          {positive ? "+" : "-"}
                          {formatCurrency(tx.amount)}
                        </DashboardComponents.TxAmount>
                      </DashboardComponents.TransactionRow>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </DashboardComponents.Container>
  );
};

DashboardPage.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default DashboardPage;
