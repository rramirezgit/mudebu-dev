'use client';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthSliceState } from './types';

const initialState: AuthSliceState = {
  redirect: '/dashboard',
};

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setRedirect(state, action: PayloadAction<string>) {
      state.redirect = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRedirect } = AuthSlice.actions;

export default AuthSlice.reducer;
