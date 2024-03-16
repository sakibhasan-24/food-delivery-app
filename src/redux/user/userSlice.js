import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    logInSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    logInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.currentUser = null;
    },
  },
});

export const { logInStart, logInSuccess, logInFailure } = userSlice.actions;
export default userSlice.reducer;
