import AuthLayout from '@/_auth/authLayout'
import CheckEmail from '@/_auth/pages/checkEmail'
import ForgotPassword from '@/_auth/pages/forgotPassword'
import Login from '@/_auth/pages/login'
import ResetPassword from '@/_auth/pages/resetPassword'
import Dashboard from '@/_root/pages/dashboard'
import ProductCreateUpdate from '@/_root/pages/productCreateUpdate'
import Products from '@/_root/pages/products'
import RootLayout from '@/_root/rootLayout'
import AppLayout from '@/appLayout'
import ErrorBoundary from '@/errorBoundary'
import { createBrowserRouter } from 'react-router-dom'
import Categories from './_root/pages/categories'
import CategoryCreateUpdate from './_root/pages/categoryCreateUpdate'
import Colors from './_root/pages/colors'
import CreateColor from './_root/pages/createColor'
import Sizes from './_root/pages/sizes'
import CreateSize from './_root/pages/createSize'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          {
            path: '/',
            element: <Dashboard />,
          },
          {
            path: '/products',
            element: <Products />,
          },
          {
            path: '/products/:productId',
            element: <ProductCreateUpdate />,
          },
          {
            path: '/categories',
            element: <Categories />,
          },
          {
            path: '/categories/:categoryId',
            element: <CategoryCreateUpdate />,
          },
          {
            path: '/colors',
            element: <Colors />,
          },
          {
            path: '/colors/create',
            element: <CreateColor />,
          },
          {
            path: '/sizes',
            element: <Sizes />,
          },
          {
            path: '/sizes/create',
            element: <CreateSize />,
          },
        ],
      },
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />,
          },
          {
            path: ':email',
            element: <CheckEmail />,
          },
          {
            path: 'reset-password/:token',
            element: <ResetPassword />,
          },
        ],
      },
    ],
  },
])

export default router
