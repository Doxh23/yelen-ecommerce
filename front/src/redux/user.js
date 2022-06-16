import { createSlice } from "@reduxjs/toolkit";
export const loggedSlice = createSlice({
  name: "Logged",
  initialState: false,
  reducers: {
    logged: (state, action) => {
      state = action.payload;
    },
  },
});

export const { logged } = loggedSlice.actions;
