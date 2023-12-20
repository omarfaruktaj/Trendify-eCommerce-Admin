import { RootState } from '@/store/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1/colors',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

interface ColorResponse {
  _id: string
  name: string
  colorCode: string
}
interface ColorQuery {
  name: string
  colorCode: string
}

export const colorApi = createApi({
  baseQuery,
  reducerPath: 'colorApi',
  tagTypes: ['color'],
  endpoints: (builder) => ({
    createColor: builder.mutation<ColorResponse, ColorQuery>({
      query: (color) => ({
        url: '/',
        method: 'POST',
        body: color,
      }),
      transformResponse: (response: { data: ColorResponse }) => response.data,
      transformErrorResponse: (response: {
        status: number
        data: { message: string }
      }) => ({ status: response.status, message: response.data.message }),
      invalidatesTags: ['color'],
    }),
    updateColor: builder.mutation<ColorResponse, ColorQuery>({
      query: (color) => ({
        url: '/',
        method: 'PATCH',
        body: color,
      }),
      transformResponse: (response: { data: ColorResponse }) => response.data,
      transformErrorResponse: (response: {
        status: number
        data: { message: string }
      }) => ({ status: response.status, message: response.data.message }),
      invalidatesTags: ['color'],
    }),
    getColor: builder.query<ColorResponse, string>({
      query: (id) => `/${id}`,
      transformResponse: (response: { data: ColorResponse }) => response.data,
      transformErrorResponse: (response: {
        status: number
        data: { message: string }
      }) => ({ status: response.status, message: response.data.message }),
      providesTags: ['color'],
    }),
    getColors: builder.query<ColorResponse[], null>({
      query: () => '/',
      transformResponse: (response: { data: ColorResponse[] }) => response.data,
      transformErrorResponse: (response: {
        status: number
        data: { message: string }
      }) => ({ status: response.status, message: response.data.message }),
      providesTags: ['color'],
    }),
  }),
})

export const {
  useCreateColorMutation,
  useGetColorQuery,
  useGetColorsQuery,
  useUpdateColorMutation,
} = colorApi
