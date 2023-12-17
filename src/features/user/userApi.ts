import { User } from '@/interfaces/userInterface'
import type { RootState } from '@/store/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1/users',
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

interface UserResponse {
  user: User
}

export const userApi = createApi({
  baseQuery,
  reducerPath: 'userApi',
  endpoints: (builder) => ({
    getMe: builder.query<UserResponse, void>({
      query: () => '/me',
      transformResponse: (response: { data: UserResponse }) => response.data,
    }),
  }),
})

export const { useGetMeQuery } = userApi
