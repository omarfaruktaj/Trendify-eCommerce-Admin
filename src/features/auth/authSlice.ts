import { User } from '@/interfaces/userInterface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  accessToken: string
  refreshToken: string
}
interface AuthenticateActionPayload {
  user: User
  accessToken: string
  refreshToken: string
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: '',
  refreshToken: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<AuthenticateActionPayload>) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
  },
})

export const { authenticate } = authSlice.actions
export default authSlice.reducer
