import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { authApi } from '@/features/auth/authApi'
import { userApi } from '@/features/user/userApi'
import { productApi } from '@/features/product/productApi'
import { categoryApi } from '@/features/category/categoryApi'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      productApi.middleware,
      categoryApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
