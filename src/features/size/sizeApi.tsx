import { RootState } from '@/store/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1/sizes',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

interface SizeResponse {
  _id: string
  size: string
}

interface SizeQuery {
  size: string
}

export const sizeApi = createApi({
  baseQuery,
  reducerPath: 'sizeApi',
  tagTypes: ['size'],
  endpoints: (builder) => ({
    createSize: builder.mutation<SizeResponse, SizeQuery>({
      query: (color) => ({
        url: '/',
        method: 'POST',
        body: color,
      }),
      transformResponse: (response: { data: SizeResponse }) => response.data,
      transformErrorResponse: (response: {
        status: number
        data: { message: string }
      }) => ({ status: response.status, message: response.data.message }),
      invalidatesTags: ['size'],
    }),
    getSizes: builder.query<SizeResponse[], null>({
      query: () => '/',
      transformResponse: (response: { data: SizeResponse[] }) => response.data,
      transformErrorResponse: (response: {
        status: number
        data: { message: string }
      }) => ({ status: response.status, message: response.data.message }),
      providesTags: ['size'],
    }),
  }),
})

export const { useCreateSizeMutation, useGetSizesQuery } = sizeApi
