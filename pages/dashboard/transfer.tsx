import { TransferComponents as TC } from "@components/pages";

import type { NextPageWithLayout } from "@types";

import { ReactElement, useEffect, useState } from "react";
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
      balance
    }
  }
`;

const TRANSFER_MONEY = gql`
  mutation TransferMoney($transferInput: TransferMoneyInput!) {
    transferMoney(transferInput: $transferInput) {
      id
      transactionType
      amount
      description
      transactionDate
    }
  }
`;

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

const formatAccountLabel = (type: string, balance: number): string =>
  `${type === "CHECKING" ? "Chime Checking" : "Savings"} — ${formatCurrency(balance)}`;

const toLocalDatetime = (d: Date): string => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const TransferPage: NextPageWithLayout = () => {
  const { push: navigate } = useRouter();
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);

  const [amount, setAmount] = useState("");
  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const [txDate, setTxDate] = useState(toLocalDatetime(new Date()));
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasToken = mounted && !!localStorage.getItem("accessToken");

  const { data: accountsData } = useQuery(MY_ACCOUNTS, {
    skip: !hasToken,
  });

  const accounts = accountsData?.myAccounts ?? [];

  useEffect(() => {
    if (accounts.length >= 2 && !fromId) {
      setFromId(accounts[0].id);
      setToId(accounts[1].id);
    }
  }, [accounts, fromId]);

  // Keep toId in sync — pick the first account that isn't fromId
  useEffect(() => {
    if (!fromId || accounts.length < 2) return;
    const other = accounts.find((a: any) => a.id !== fromId);
    if (other && toId === fromId) {
      setToId(other.id);
    }
  }, [fromId, accounts, toId]);

  const [transferMoney, { loading: transferring }] = useMutation(
    TRANSFER_MONEY,
    {
      refetchQueries: [{ query: MY_ACCOUNTS }],
    }
  );

  useEffect(() => {
    if (mounted && !hasToken) {
      navigate("/users/log-in");
    }
  }, [mounted, hasToken, navigate]);

  if (!mounted || !hasToken) return null;

  const fromAccount = accounts.find((a: any) => a.id === fromId);
  const toAccount = accounts.find((a: any) => a.id === toId);

  const handleSwap = () => {
    setFromId(toId);
    setToId(fromId);
  };

  const handleTransferClick = () => {
    setError("");
    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      setError("Enter a valid amount");
      return;
    }
    if (fromId === toId || !fromId || !toId) {
      setError("Select different accounts");
      return;
    }
    if (fromAccount && parsed > Number(fromAccount.balance)) {
      setError("Insufficient balance");
      return;
    }
    setShowModal(true);
  };

  const handleConfirm = async () => {
    try {
      await transferMoney({
        variables: {
          transferInput: {
            fromAccountId: fromId,
            toAccountId: toId,
            amount: parseFloat(amount),
            transactionDate: new Date(txDate).toISOString(),
          },
        },
      });
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err: any) {
      setError(err.message || "Transfer failed");
      setShowModal(false);
    }
  };

  return (
    <>
      <Head>
        <title>Transfer | Chime</title>
        <meta name="description" content="Transfer money between accounts" />
      </Head>

      <TC.TransferContainer>
        <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "0.5rem" }}>
          Move Money
        </h2>

        <TC.AmountWrapper>
          <TC.DollarSign>$</TC.DollarSign>
          <TC.AmountField
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={e => {
              const val = e.target.value;
              if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
                setAmount(val);
                setError("");
              }
            }}
          />
        </TC.AmountWrapper>

        <TC.Row>
          <TC.SelectGroup>
            <TC.Label>From</TC.Label>
            <TC.Select
              value={fromId}
              onChange={e => setFromId(e.target.value)}
            >
              {accounts.map((a: any) => (
                <option key={a.id} value={a.id}>
                  {formatAccountLabel(a.accountType, a.balance)}
                </option>
              ))}
            </TC.Select>
          </TC.SelectGroup>

          <TC.SwapButton onClick={handleSwap} title="Swap accounts">
            ⇅
          </TC.SwapButton>

          <TC.SelectGroup>
            <TC.Label>To</TC.Label>
            <TC.Select
              value={toId}
              onChange={e => setToId(e.target.value)}
            >
              {accounts
                .filter((a: any) => a.id !== fromId)
                .map((a: any) => (
                  <option key={a.id} value={a.id}>
                    {formatAccountLabel(a.accountType, a.balance)}
                  </option>
                ))}
            </TC.Select>
          </TC.SelectGroup>
        </TC.Row>

        <TC.SelectGroup style={{ marginBottom: "1.5rem" }}>
          <TC.Label>Date & Time</TC.Label>
          <TC.Select
            as="input"
            type="datetime-local"
            value={txDate}
            onChange={(e: any) => setTxDate(e.target.value)}
          />
        </TC.SelectGroup>

        {error && <TC.ErrorMessage>{error}</TC.ErrorMessage>}

        <TC.TransferButton
          onClick={handleTransferClick}
          disabled={!amount || !fromId || !toId}
        >
          Transfer
        </TC.TransferButton>
      </TC.TransferContainer>

      {showModal && (
        <TC.Overlay onClick={() => setShowModal(false)}>
          <TC.Modal onClick={e => e.stopPropagation()}>
            {success ? (
              <>
                <TC.Title>Transfer Complete!</TC.Title>
                <TC.SuccessMessage>
                  ${parseFloat(amount || "0").toFixed(2)} transferred successfully.
                  Redirecting...
                </TC.SuccessMessage>
              </>
            ) : (
              <>
                <TC.Title>Double check everything</TC.Title>
                <TC.Detail>
                  <TC.DetailLabel>Amount</TC.DetailLabel>
                  <TC.DetailValue>
                    ${parseFloat(amount || "0").toFixed(2)}
                  </TC.DetailValue>
                </TC.Detail>
                <TC.Detail>
                  <TC.DetailLabel>From</TC.DetailLabel>
                  <TC.DetailValue>
                    {fromAccount?.accountType === "CHECKING"
                      ? "Chime Checking"
                      : "Savings"}
                  </TC.DetailValue>
                </TC.Detail>
                <TC.Detail>
                  <TC.DetailLabel>To</TC.DetailLabel>
                  <TC.DetailValue>
                    {toAccount?.accountType === "CHECKING"
                      ? "Chime Checking"
                      : "Savings"}
                  </TC.DetailValue>
                </TC.Detail>
                <TC.Detail>
                  <TC.DetailLabel>Availability</TC.DetailLabel>
                  <TC.DetailValue>Immediate</TC.DetailValue>
                </TC.Detail>
                <TC.ButtonGroup>
                  <TC.ConfirmButton
                    onClick={handleConfirm}
                    disabled={transferring}
                  >
                    {transferring
                      ? "Transferring..."
                      : `Transfer $${parseFloat(amount || "0").toFixed(2)}`}
                  </TC.ConfirmButton>
                  <TC.CancelButton onClick={() => setShowModal(false)}>
                    Cancel
                  </TC.CancelButton>
                </TC.ButtonGroup>
              </>
            )}
          </TC.Modal>
        </TC.Overlay>
      )}
    </>
  );
};

TransferPage.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default TransferPage;
