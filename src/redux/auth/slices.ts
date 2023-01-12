import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export const selectAuth = (state) => state.authState.token;
export default loginSlice.reducer;
