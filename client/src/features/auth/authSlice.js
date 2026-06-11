import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  profile: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user || null;
      state.profile = action.payload.profile || null;
      state.isLoading = false;
      state.error = null;
    },

    clearCredentials: (state) => {
      state.user = null;
      state.profile = null;
      state.isLoading = false;
      state.error = null;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setCredentials,
  clearCredentials,
  setLoading,
  setError,
} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectProfile = (state) => state.auth.profile;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => Boolean(state.auth.user);

export default authSlice.reducer;