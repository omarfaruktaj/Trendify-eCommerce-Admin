import { LoginCredential, User } from '@/interfaces/userInterface'
import type { RootState } from '@/store/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//`${process.env.BASE_URL}/auth`

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1/auth',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
  credentials: 'include',
})

interface AuthenticationResponse {
  user: User
  accessToken: string
  refreshToken: string
}

interface ResetPasswordCredential {
  password: string
  token: string
}

export const authApi = createApi({
  baseQuery,
  reducerPath: 'authApi',
  endpoints: (builder) => ({
    login: builder.mutation<AuthenticationResponse, LoginCredential>({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email, password },
      }),
      transformResponse: (response: { data: AuthenticationResponse }) =>
        response.data,
      // transformErrorResponse: (response: { status: string | number }) =>
      //   response.status,
    }),
    refreshAccessToken: builder.mutation<AuthenticationResponse, string | null>(
      {
        query: (refreshToken) => ({
          url: '/refresh-token',
          method: 'POST',
          body: {
            refreshToken,
          },
        }),
        transformResponse: (response: { data: AuthenticationResponse }) =>
          response.data,
      }
    ),
    forgotPassword: builder.mutation<string, string>({
      query: (email) => ({
        url: 'forgot-password',
        method: 'POST',
        body: {
          email,
        },
      }),
      transformResponse: (response: { message: string }) => response.message,
    }),

    resetPassword: builder.mutation<
      AuthenticationResponse,
      ResetPasswordCredential
    >({
      query: ({ password, token }) => ({
        url: `reset-password/${token}`,
        method: 'PATCH',
        body: {
          password,
        },
      }),
      transformResponse: (response: { data: AuthenticationResponse }) =>
        response.data,
    }),
  }),
})

export const {
  useLoginMutation,
  useRefreshAccessTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi
