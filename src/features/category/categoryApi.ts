import Category from '@/interfaces/categoryInterface'
import type { RootState } from '@/store/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface UpdateCategoryQueryArg {
  category: FormData
  id: string
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1/categories',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
  credentials: 'include',
})

export const categoryApi = createApi({
  baseQuery,
  reducerPath: 'categoryApi',
  tagTypes: ['category'],
  endpoints: (builder) => ({
    createCategory: builder.mutation<Category, FormData>({
      query: (category) => ({
        url: '/',
        method: 'POST',
        body: category,
      }),
      transformResponse: (response: { data: Category }) => response.data,
      transformErrorResponse: (response: {
        data: { message: string }
        status: number
      }) => ({ message: response.data.message, status: response.status }),
      invalidatesTags: ['category'],
    }),
    getCategories: builder.query<Category[], null>({
      query: () => '/',
      transformResponse: (response: { data: Category[] }) => response.data,
      transformErrorResponse: (response: {
        data: { message: string }
        status: number
      }) => ({ message: response.data.message, status: response.status }),
      providesTags: ['category'],
    }),
    getCategory: builder.query<Category, string>({
      query: (id) => `/${id}`,
      transformResponse: (response: { data: Category }) => response.data,
      transformErrorResponse: (response: {
        data: { message: string }
        status: number
      }) => ({ message: response.data.message, status: response.status }),
      providesTags: ['category'],
    }),
    updateCategory: builder.mutation<Category, UpdateCategoryQueryArg>({
      query: ({ id, category }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: category,
      }),
      transformResponse: (response: { data: Category }) => response.data,
      transformErrorResponse: (response: {
        data: { message: string }
        status: number
      }) => ({ message: response.data.message, status: response.status }),
      invalidatesTags: ['category'],
    }),
    deleteCategory: builder.mutation<Category, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: Category }) => response.data,

      transformErrorResponse: (response: {
        data: { message: string }
        status: number
      }) => ({ message: response.data.message, status: response.status }),
      invalidatesTags: ['category'],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} = categoryApi
