import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@/Services";

const initialState: Omit<Transaction, 'id' | 'amount' | 'note'> = {
    currency: 'VND',
    type: 'out',
    category: 'Shopping',
    transactionDateTime: new Date().toISOString(),
}

const slice = createSlice({
    name: 'newTransaction',
    initialState,
    reducers: {
        setCurrency: (state, action: PayloadAction<string>) => {
            state.currency = action.payload
        },
        setType: (state, action: PayloadAction<string>) => {
            state.type = action.payload
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload
        },
        setTransactionDateTime: (state, action: PayloadAction<string>) => {
            state.transactionDateTime = action.payload
        },
        resetNewTransaction: (state, action) => {
            state = initialState
        },
    },
});

export const { setCurrency, setType, setCategory, setTransactionDateTime, resetNewTransaction } = slice.actions

export const newTransactionReducers = slice.reducer