import { AdminComponents as AC } from "@components/pages";

import type { NextPageWithLayout } from "@types";

import { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";

import { useUser } from "@hooks";
import { DashboardLayout } from "@components/composition";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql"
).replace("/graphql", "");

const MY_ACCOUNTS = gql`
  query MyAccounts {
    myAccounts {
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
      frontImageUrl
      backImageUrl
    }
  }
`;

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $createTransactionInput: CreateTransactionInput!
  ) {
    createTransaction(createTransactionInput: $createTransactionInput) {
      id
      amount
      merchantName
      description
      transactionDate
    }
  }
`;

const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $updateTransactionInput: UpdateTransactionInput!
  ) {
    updateTransaction(updateTransactionInput: $updateTransactionInput) {
      id
      amount
      merchantName
      description
    }
  }
`;

const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`;

const REMOVE_TRANSACTION_IMAGES = gql`
  mutation RemoveTransactionImages($id: ID!) {
    removeTransactionImages(id: $id) {
      id
      frontImageUrl
      backImageUrl
    }
  }
`;

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(amount));

const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const toLocalDatetime = (d: Date): string => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

interface TransactionItem {
  id: string;
  transactionType: string;
  amount: number;
  merchantName?: string;
  description?: string;
  status: string;
  transactionDate: string;
  frontImageUrl?: string;
  backImageUrl?: string;
}

const AdminPage: NextPageWithLayout = () => {
  const { push: navigate } = useRouter();
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);

  // Create form state
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newSign, setNewSign] = useState<"+" | "-">("-");
  const [newDate, setNewDate] = useState(toLocalDatetime(new Date()));
  const [depositAmount, setDepositAmount] = useState("");
  const [depositDate, setDepositDate] = useState(toLocalDatetime(new Date()));
  const [interestApy, setInterestApy] = useState("");
  const [interestDate, setInterestDate] = useState(toLocalDatetime(new Date()));

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");

  // Check image modal state
  const [selectedTx, setSelectedTx] = useState<TransactionItem | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasToken = mounted && !!localStorage.getItem("accessToken");

  const { data: accountsData } = useQuery(MY_ACCOUNTS, {
    skip: !hasToken,
  });

  const accounts = accountsData?.myAccounts ?? [];
  const checkingAccount = accounts.find(
    (a: any) => a.accountType === "CHECKING"
  );
  const savingsAccount = accounts.find(
    (a: any) => a.accountType === "SAVINGS"
  );

  const refetchConfig = [
    { query: MY_ACCOUNTS },
    {
      query: TRANSACTIONS,
      variables: { accountId: checkingAccount?.id },
    },
    ...(savingsAccount?.id
      ? [{ query: TRANSACTIONS, variables: { accountId: savingsAccount.id } }]
      : []),
  ];

  const { data: txData } = useQuery(TRANSACTIONS, {
    skip: !checkingAccount?.id,
    variables: { accountId: checkingAccount?.id },
  });

  const { data: savingsTxData } = useQuery(TRANSACTIONS, {
    skip: !savingsAccount?.id,
    variables: { accountId: savingsAccount?.id },
  });

  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: refetchConfig,
  });

  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: refetchConfig,
  });

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: refetchConfig,
  });

  const [removeTransactionImages] = useMutation(REMOVE_TRANSACTION_IMAGES, {
    refetchQueries: refetchConfig,
  });

  useEffect(() => {
    if (mounted && !hasToken) {
      navigate("/users/log-in");
    }
  }, [mounted, hasToken, navigate]);

  if (!mounted || !hasToken) return null;

  const transactions: TransactionItem[] = txData?.transactions ?? [];
  const savingsTransactions: TransactionItem[] = savingsTxData?.transactions ?? [];

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(depositAmount);
    if (isNaN(amt) || amt <= 0 || !checkingAccount) return;

    await createTransaction({
      variables: {
        createTransactionInput: {
          accountId: checkingAccount.id,
          transactionType: "DIRECT_DEPOSIT",
          amount: amt,
          merchantName: "Direct Deposit",
          description: "Direct Deposit",
          transactionDate: new Date(depositDate).toISOString(),
        },
      },
    });
    setDepositAmount("");
    setDepositDate(toLocalDatetime(new Date()));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const raw = parseFloat(newAmount);
    if (isNaN(raw) || raw <= 0 || !newName.trim() || !checkingAccount) return;

    const amt = newSign === "-" ? -raw : raw;
    const type = amt >= 0 ? "DIRECT_DEPOSIT" : "PURCHASE";

    await createTransaction({
      variables: {
        createTransactionInput: {
          accountId: checkingAccount.id,
          transactionType: type,
          amount: amt,
          merchantName: newName.trim(),
          description: newName.trim(),
          transactionDate: new Date(newDate).toISOString(),
        },
      },
    });
    setNewName("");
    setNewAmount("");
    setNewSign("-");
    setNewDate(toLocalDatetime(new Date()));
  };

  const handleStartEdit = (tx: TransactionItem) => {
    setEditingId(tx.id);
    setEditName(tx.merchantName || tx.description || "");
    setEditAmount(String(tx.amount));
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    const amt = parseFloat(editAmount);
    if (isNaN(amt)) return;

    await updateTransaction({
      variables: {
        updateTransactionInput: {
          id: editingId,
          merchantName: editName.trim(),
          description: editName.trim(),
          amount: amt,
        },
      },
    });
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this transaction? Balance will be reversed.")) return;
    await deleteTransaction({ variables: { id } });
  };

  const handleRemovePhotos = async () => {
    if (!selectedTx) return;
    if (!confirm("Remove check photos from this deposit?")) return;
    await removeTransactionImages({ variables: { id: selectedTx.id } });
    setSelectedTx(null);
  };

  const handleDeleteDeposit = async () => {
    if (!selectedTx) return;
    if (!confirm("Delete this deposit? Balance will be reversed.")) return;
    await deleteTransaction({ variables: { id: selectedTx.id } });
    setSelectedTx(null);
  };

  const computedInterest =
    interestApy && savingsAccount
      ? (
          (parseFloat(interestApy) / 100 / 12) *
          Number(savingsAccount.balance)
        ).toFixed(2)
      : "";

  const handleInterest = async (e: React.FormEvent) => {
    e.preventDefault();
    const apy = parseFloat(interestApy);
    if (isNaN(apy) || apy <= 0 || !savingsAccount) return;

    const monthlyInterest = parseFloat(
      ((apy / 100 / 12) * Number(savingsAccount.balance)).toFixed(2)
    );

    await createTransaction({
      variables: {
        createTransactionInput: {
          accountId: savingsAccount.id,
          transactionType: "DIRECT_DEPOSIT",
          amount: monthlyInterest,
          merchantName: "Savings Interest",
          description: `Monthly interest at ${apy}% APY`,
          transactionDate: new Date(interestDate).toISOString(),
        },
      },
    });
    setInterestApy("");
    setInterestDate(toLocalDatetime(new Date()));
  };

  const hasImages = (tx: TransactionItem) =>
    !!(tx.frontImageUrl || tx.backImageUrl);

  return (
    <AC.AdminContainer>
      <Head>
        <title>Admin | Chime</title>
        <meta name="description" content="Admin Panel" />
      </Head>

      <h2 style={{ color: "#fff", marginBottom: "1.5rem" }}>Admin Panel</h2>

      <div style={{ display: "flex", gap: "1rem" }}>
        {checkingAccount && (
          <AC.BalanceCard style={{ flex: 1 }}>
            <div className="label">Checking Balance</div>
            <div className="balance">
              {formatCurrency(checkingAccount.balance)}
            </div>
          </AC.BalanceCard>
        )}

        {savingsAccount && (
          <AC.BalanceCard style={{ flex: 1 }}>
            <div className="label">Savings Balance</div>
            <div className="balance">
              {formatCurrency(savingsAccount.balance)}
            </div>
          </AC.BalanceCard>
        )}
      </div>

      <AC.SectionTitle>Quick Deposit</AC.SectionTitle>
      <AC.FormRow onSubmit={handleDeposit}>
        <AC.InputGroup>
          <AC.InputLabel>Amount</AC.InputLabel>
          <AC.Input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="100.00"
            value={depositAmount}
            onChange={e => setDepositAmount(e.target.value)}
          />
        </AC.InputGroup>
        <AC.InputGroup>
          <AC.InputLabel>Date & Time</AC.InputLabel>
          <AC.Input
            type="datetime-local"
            value={depositDate}
            onChange={e => setDepositDate(e.target.value)}
          />
        </AC.InputGroup>
        <AC.SubmitButton type="submit" disabled={!depositAmount}>
          Deposit to Checking
        </AC.SubmitButton>
      </AC.FormRow>

      <AC.SectionTitle>Savings Interest</AC.SectionTitle>
      <AC.FormRow onSubmit={handleInterest}>
        <AC.InputGroup>
          <AC.InputLabel>APY %</AC.InputLabel>
          <AC.Input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="4.50"
            value={interestApy}
            onChange={e => setInterestApy(e.target.value)}
          />
        </AC.InputGroup>
        <AC.InputGroup>
          <AC.InputLabel>Monthly Interest</AC.InputLabel>
          <AC.Input
            type="text"
            readOnly
            value={computedInterest ? `$${computedInterest}` : ""}
            placeholder="$0.00"
          />
        </AC.InputGroup>
        <AC.InputGroup>
          <AC.InputLabel>Date & Time</AC.InputLabel>
          <AC.Input
            type="datetime-local"
            value={interestDate}
            onChange={e => setInterestDate(e.target.value)}
          />
        </AC.InputGroup>
        <AC.SubmitButton
          type="submit"
          disabled={!interestApy || !savingsAccount}
        >
          Add Interest to Savings
        </AC.SubmitButton>
      </AC.FormRow>

      <AC.SectionTitle>Checking Transactions</AC.SectionTitle>

      <AC.FormRow onSubmit={handleCreate}>
        <AC.InputGroup>
          <AC.InputLabel>Name</AC.InputLabel>
          <AC.Input
            type="text"
            placeholder="Merchant name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
        </AC.InputGroup>
        <AC.InputGroup style={{ maxWidth: "5rem" }}>
          <AC.InputLabel>+/&minus;</AC.InputLabel>
          <AC.Input
            as="select"
            value={newSign}
            onChange={(e: any) => setNewSign(e.target.value)}
          >
            <option value="-">&minus;</option>
            <option value="+">+</option>
          </AC.Input>
        </AC.InputGroup>
        <AC.InputGroup>
          <AC.InputLabel>Amount</AC.InputLabel>
          <AC.Input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="25.00"
            value={newAmount}
            onChange={e => setNewAmount(e.target.value)}
          />
        </AC.InputGroup>
        <AC.InputGroup>
          <AC.InputLabel>Date & Time</AC.InputLabel>
          <AC.Input
            type="datetime-local"
            value={newDate}
            onChange={e => setNewDate(e.target.value)}
          />
        </AC.InputGroup>
        <AC.SubmitButton type="submit" disabled={!newName || !newAmount}>
          Create
        </AC.SubmitButton>
      </AC.FormRow>

      <AC.Table>
        <AC.TableHeader>
          <div>Name</div>
          <div>Amount</div>
          <div>Date</div>
          <div>Actions</div>
        </AC.TableHeader>

        {transactions.length === 0 ? (
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              color: "#808080",
            }}
          >
            No transactions yet
          </div>
        ) : (
          transactions.map(tx => (
            <AC.TableRow
              key={tx.id}
              onClick={() => {
                if (hasImages(tx)) setSelectedTx(tx);
              }}
              style={{
                cursor: hasImages(tx) ? "pointer" : "default",
              }}
            >
              <AC.Cell>
                {editingId === tx.id ? (
                  <AC.InlineInput
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    onClick={e => e.stopPropagation()}
                  />
                ) : (
                  <>
                    {tx.merchantName || tx.description || tx.transactionType}
                    {hasImages(tx) && (
                      <AC.ImageBadge>check</AC.ImageBadge>
                    )}
                  </>
                )}
              </AC.Cell>
              <AC.Cell $positive={tx.amount > 0}>
                {editingId === tx.id ? (
                  <AC.InlineInput
                    type="number"
                    step="0.01"
                    value={editAmount}
                    onChange={e => setEditAmount(e.target.value)}
                    onClick={e => e.stopPropagation()}
                  />
                ) : (
                  <>
                    {tx.amount > 0 ? "+" : "-"}
                    {formatCurrency(tx.amount)}
                  </>
                )}
              </AC.Cell>
              <AC.Cell className="date">
                {formatDate(tx.transactionDate)}
              </AC.Cell>
              <AC.Actions onClick={e => e.stopPropagation()}>
                {editingId === tx.id ? (
                  <>
                    <AC.ActionButton onClick={handleSaveEdit}>
                      Save
                    </AC.ActionButton>
                    <AC.ActionButton onClick={() => setEditingId(null)}>
                      Cancel
                    </AC.ActionButton>
                  </>
                ) : (
                  <>
                    <AC.ActionButton onClick={() => handleStartEdit(tx)}>
                      Edit
                    </AC.ActionButton>
                    <AC.ActionButton
                      $danger
                      onClick={() => handleDelete(tx.id)}
                    >
                      Delete
                    </AC.ActionButton>
                  </>
                )}
              </AC.Actions>
            </AC.TableRow>
          ))
        )}
      </AC.Table>

      <AC.SectionTitle>Savings Transactions</AC.SectionTitle>

      <AC.Table>
        <AC.TableHeader>
          <div>Name</div>
          <div>Amount</div>
          <div>Date</div>
          <div>Actions</div>
        </AC.TableHeader>

        {savingsTransactions.length === 0 ? (
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              color: "#808080",
            }}
          >
            No savings transactions yet
          </div>
        ) : (
          savingsTransactions.map(tx => (
            <AC.TableRow
              key={tx.id}
              onClick={() => {
                if (hasImages(tx)) setSelectedTx(tx);
              }}
              style={{
                cursor: hasImages(tx) ? "pointer" : "default",
              }}
            >
              <AC.Cell>
                {editingId === tx.id ? (
                  <AC.InlineInput
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    onClick={e => e.stopPropagation()}
                  />
                ) : (
                  <>
                    {tx.merchantName || tx.description || tx.transactionType}
                    {hasImages(tx) && (
                      <AC.ImageBadge>check</AC.ImageBadge>
                    )}
                  </>
                )}
              </AC.Cell>
              <AC.Cell $positive={tx.amount > 0}>
                {editingId === tx.id ? (
                  <AC.InlineInput
                    type="number"
                    step="0.01"
                    value={editAmount}
                    onChange={e => setEditAmount(e.target.value)}
                    onClick={e => e.stopPropagation()}
                  />
                ) : (
                  <>
                    {tx.amount > 0 ? "+" : "-"}
                    {formatCurrency(tx.amount)}
                  </>
                )}
              </AC.Cell>
              <AC.Cell className="date">
                {formatDate(tx.transactionDate)}
              </AC.Cell>
              <AC.Actions onClick={e => e.stopPropagation()}>
                {editingId === tx.id ? (
                  <>
                    <AC.ActionButton onClick={handleSaveEdit}>
                      Save
                    </AC.ActionButton>
                    <AC.ActionButton onClick={() => setEditingId(null)}>
                      Cancel
                    </AC.ActionButton>
                  </>
                ) : (
                  <>
                    <AC.ActionButton onClick={() => handleStartEdit(tx)}>
                      Edit
                    </AC.ActionButton>
                    <AC.ActionButton
                      $danger
                      onClick={() => handleDelete(tx.id)}
                    >
                      Delete
                    </AC.ActionButton>
                  </>
                )}
              </AC.Actions>
            </AC.TableRow>
          ))
        )}
      </AC.Table>

      {selectedTx && (
        <AC.Overlay onClick={() => setSelectedTx(null)}>
          <AC.ModalBox onClick={e => e.stopPropagation()}>
            <AC.ModalTitle>
              Check Deposit &mdash;{" "}
              {selectedTx.merchantName || "Mobile Check Deposit"}
            </AC.ModalTitle>
            <AC.ModalSubtitle>
              {formatCurrency(selectedTx.amount)} on{" "}
              {formatDate(selectedTx.transactionDate)}
            </AC.ModalSubtitle>

            <AC.ImageRow>
              {selectedTx.frontImageUrl && (
                <AC.ImageCard>
                  <div className="label">Front of Check</div>
                  <img
                    src={`${API_BASE_URL}${selectedTx.frontImageUrl}`}
                    alt="Front of check"
                  />
                </AC.ImageCard>
              )}
              {selectedTx.backImageUrl && (
                <AC.ImageCard>
                  <div className="label">Back of Check</div>
                  <img
                    src={`${API_BASE_URL}${selectedTx.backImageUrl}`}
                    alt="Back of check"
                  />
                </AC.ImageCard>
              )}
            </AC.ImageRow>

            <AC.ModalActions>
              <AC.ModalCloseButton onClick={() => setSelectedTx(null)}>
                Close
              </AC.ModalCloseButton>
              <AC.RemovePhotosButton onClick={handleRemovePhotos}>
                Remove Photos
              </AC.RemovePhotosButton>
              <AC.ModalDeleteButton onClick={handleDeleteDeposit}>
                Delete Deposit
              </AC.ModalDeleteButton>
            </AC.ModalActions>
          </AC.ModalBox>
        </AC.Overlay>
      )}
    </AC.AdminContainer>
  );
};

AdminPage.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AdminPage;
