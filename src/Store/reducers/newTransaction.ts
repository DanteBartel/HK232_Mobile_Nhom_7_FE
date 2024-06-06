import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@/Services";

const initialState: Omit<Transaction, '_id' | 'amount' | 'note' | 'category' | 'type'> = {
    currency: 'VND',
    transactionDateTime: new Date().toISOString(),
}

const slice = createSlice({
    name: 'newTransaction',
    initialState,
    reducers: {
        setCurrency: (state, action: PayloadAction<string>) => {
            state.currency = action.payload
        },
        setTransactionDateTime: (state, action: PayloadAction<string>) => {
            state.transactionDateTime = action.payload
        },
        resetNewTransaction: (state, action) => {
            state = initialState
        },
    },
});

export const { setCurrency, setTransactionDateTime, resetNewTransaction } = slice.actions

export const newTransactionReducers = slice.reducer