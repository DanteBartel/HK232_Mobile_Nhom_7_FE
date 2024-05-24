import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "navigation",
    initialState: { hasSeenWelcome: false },
    reducers: {
        setHasSeenWelcome: (state, { payload: { hasSeenWelcome } }) => {
            state.hasSeenWelcome = hasSeenWelcome
        },
    },
})

export const { setHasSeenWelcome } = slice.actions;

export const navigationReducers = slice.reducer;