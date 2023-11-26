import AuthLayout from '@/_auth/authLayout'
import CheckEmail from '@/_auth/pages/checkEmail'
import ForgotPassword from '@/_auth/pages/forgotPassword'
import Login from '@/_auth/pages/login'
import ResetPassword from '@/_auth/pages/resetPassword'
import Dashboard from '@/_root/pages/dashboard'
import RootLayout from '@/_root/rootLayout'
import AppLayout from '@/appLayout'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          {
            path: '/',
            element: <Dashboard />,
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
