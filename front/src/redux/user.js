import { createSlice } from "@reduxjs/toolkit";
export const loggedSlice = createSlice({
  name: "Logged",
  initialState: false,
  reducers: {
    logged: (state, action) => {
      return {
        user: action.payload.user,
        success: action.payload.success,
      };
    },
    loggedFail: (state, action) => {
      return {
        user: null,
        success: action.payload.success,
        message: action.payload.message
      };
    },
  },
});

export const { logged,loggedFail } = loggedSlice.actions;
