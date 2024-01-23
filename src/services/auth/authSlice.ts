import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  initialState: {
    isAuthenticated: false,
  },
  name: 'auth',
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
  },
})

export const { setAuthenticated } = authSlice.actions
export const authReducer = authSlice.reducer
