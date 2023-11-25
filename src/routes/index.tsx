import AuthLayout from '@/_auth/authLayout'
import Login from '@/_auth/pages/login'
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
        ],
      },
    ],
  },
])

export default router
