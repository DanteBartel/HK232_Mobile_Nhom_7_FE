import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "input",
  initialState: { inputValue: '' },
  reducers: {
    setInputValue: (state, action) => {
        state.inputValue = action.payload
    },
  },
});

export const { setInputValue } = slice.actions;

export const inputReducers = slice.reducer;
