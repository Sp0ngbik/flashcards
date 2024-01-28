import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  initialState: {
    isAuthenticated: false,
  },
  name: 'auth',
  reducers: {
    loggedIn: state => {
      state.isAuthenticated = true
    },
    loggedOut: state => {
      state.isAuthenticated = false
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
  },
})

export const { loggedIn, loggedOut, setAuthenticated } = authSlice.actions
export const authReducer = authSlice.reducer
