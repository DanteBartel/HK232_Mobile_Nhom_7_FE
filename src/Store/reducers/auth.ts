import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    userLogin: (state, { payload: { token } }) => {
      if (typeof token !== "undefined") {
        state.token = token;
      }
    },
    userLogout: (state, { payload: {} }) => {
      if (!state.token) {
        state.token = null;
      }
    },
  },
});

export const { userLogin, userLogout } = slice.actions;

export const authReducer = slice.reducer;
