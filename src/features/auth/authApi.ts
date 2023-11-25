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

interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
}

interface refreshAccessTokenResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export const authApi = createApi({
  baseQuery,
  reducerPath: 'authApi',
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredential>({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email, password },
      }),
      transformResponse: (response: { data: LoginResponse }) => response.data,
      // transformErrorResponse: (response: { status: string | number }) =>
      //   response.status,
    }),
    refreshAccessToken: builder.mutation<refreshAccessTokenResponse, string>({
      query: (refreshToken) => ({
        url: '/refresh-token',
        methods: 'POST',
        body: {
          refreshToken,
        },
      }),
      transformResponse: (response: { data: refreshAccessTokenResponse }) =>
        response.data,
    }),
  }),
})

export const { useLoginMutation, useRefreshAccessTokenMutation } = authApi
