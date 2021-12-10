import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from './services/api';


interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
  }
  
  type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

  interface TransactionProviderProps {
      children: ReactNode;
  }

  interface TransactionsContextData {
      transactions: Transaction[];
      createTransaction: (transaction: TransactionInput) => Promise<void>
  }

export const TransactionContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
)

export function TransactionProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransaction] = useState<Transaction[]>([]);

    useEffect(() => {
      api
        .get("/transactions")
        .then((response) => setTransaction(response.data.transactions));
    }, []);

    async function createTransaction(transactionsInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionsInput,
            createdAt: new Date()
        })
        const { transaction } = response.data

        setTransaction([
            ...transactions,
            transaction
        ])
    }

    return(
        <TransactionContext.Provider value={{transactions ,createTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}