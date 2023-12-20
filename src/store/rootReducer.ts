import { authApi } from '@/features/auth/authApi'
import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import { userApi } from '@/features/user/userApi'
import { productApi } from '@/features/product/productApi'
import { categoryApi } from '@/features/category/categoryApi'
import { colorApi } from '@/features/color/colorApi'
import { sizeApi } from '@/features/size/sizeApi'

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [colorApi.reducerPath]: colorApi.reducer,
  [sizeApi.reducerPath]: sizeApi.reducer,
})

export default rootReducer
