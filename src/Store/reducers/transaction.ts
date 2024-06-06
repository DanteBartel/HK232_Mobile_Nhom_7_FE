import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@/Services";

interface TransactionState {
    byId: Record<string, Transaction>;
    allIds: string[];
}

const initialState: TransactionState = {
    byId: {},
    allIds: [],
}

const slice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            const newTransaction = action.payload
            const id = newTransaction._id
            state.byId[id] =  newTransaction
            state.allIds.push(id)
        },
        addTransactions: (state, action: PayloadAction<Transaction[]>) => {
            const transactions = action.payload
            transactions.forEach(transaction => {
                let newTransaction = transaction
                let id = newTransaction._id
                state.byId[id] = newTransaction
                state.allIds.push(id)
            })
        },
        removeTransaction: (state, action: PayloadAction<string>) => {
            const id = action.payload
            delete state.byId[id]
            state.allIds = state.allIds.filter(transactionId => transactionId !== id)
        },
        editTransaction: (state, action: PayloadAction<Transaction>) => {
            const { _id, ...changes } = action.payload;
            if (state.byId[_id]) {
                state.byId[_id] = { ...state.byId[_id], ...changes };
            }
        },
        resetTransactions: () => initialState,
    },
});

export const { addTransaction, addTransactions, removeTransaction, editTransaction, resetTransactions } = slice.actions;

export const transactionReducers = slice.reducer;