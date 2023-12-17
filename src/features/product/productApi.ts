import { Product } from '@/interfaces/productInterface'
import { RootState } from '@/store/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1/products',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
  },
})

// interface getProductsQueryArg{
//     keyword: string

// }

interface UpdateProductQueryArg {
  product: Product
  id: string
}

export const productApi = createApi({
  baseQuery,
  reducerPath: 'productApi',
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], string>({
      query: (queries) => `/?query=${queries}`,
      transformResponse: (response: { data: Product[] }) => response.data,
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `/:${id}`,
      transformResponse: (response: { data: Product }) => response.data,
    }),
    createProduct: builder.mutation<Product, Product>({
      query: (product) => ({
        url: '/',
        method: 'POST',
        body: product,
      }),
      transformResponse: (response: { data: Product }) => response.data,
    }),
    updateProduct: builder.mutation<Product, UpdateProductQueryArg>({
      query: ({ id, product }) => ({
        url: `/:${id}`,
        method: 'PATCH',
        body: product,
      }),
      transformResponse: (response: { data: Product }) => response.data,
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productApi
