import { useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthLayout = () => {
  const navigate = useNavigate()

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) return navigate('/')
  }, [isAuthenticated, navigate])

  return (
    <div>
      <div className='h-screen flex items-center justify-center bg-gray-100'>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
