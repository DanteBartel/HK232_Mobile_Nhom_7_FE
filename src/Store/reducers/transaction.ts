import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@/Services";

interface TransactionState {
    byId: Record<number, Transaction>;
    allIds: number[];
}

const initialState: TransactionState = {
    byId: {},
    allIds: [],
}

const slice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id'>>) => {
            const id = Date.now();
            const newTransaction = { ...action.payload, id };
            state.byId[id] =  newTransaction;
            state.allIds.push(id);
        },
        removeTransaction: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            delete state.byId[id];
            state.allIds = state.allIds.filter(transactionId => transactionId !== id);
        },
        editTransaction: (state, action: PayloadAction<Transaction>) => {
            const { id, ...changes } = action.payload;
            if (state.byId[id]) {
                state.byId[id] = { ...state.byId[id], ...changes };
            }
        },
    },
});

export const { addTransaction, removeTransaction, editTransaction } = slice.actions;

export const transactionReducers = slice.reducer;