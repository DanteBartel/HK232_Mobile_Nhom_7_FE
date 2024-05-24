import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    accessToken: string | null
}

const initialState: AuthState = {
    accessToken: null
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
        },
        clearAccessToken(state) {
            state.accessToken = null;
        }
    },
});

export const { setAccessToken, clearAccessToken } = slice.actions;

export const authReducers = slice.reducer;