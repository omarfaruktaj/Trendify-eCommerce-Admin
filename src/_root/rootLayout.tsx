import { useAppSelector } from '@/store/hooks'
import { Outlet, useNavigate } from 'react-router-dom'
import LeftBar from '@/components/common/leftBar'
import TopBar from '@/components/common/topBar'
import { useEffect } from 'react'

const RootLayout = () => {
  const navigate = useNavigate()

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  if (!isAuthenticated) navigate('/auth/login')

  // useEffect(() => {

  // }, [navigate, isAuthenticated])

  return (
    <>
      <div className='fixed w-full h-[64px] md:pl-56 inset-y-0 z-50'>
        <TopBar />
      </div>
      <div className='hidden md:flex flex-col  fixed inset-y-0 w-56 h-screen'>
        <LeftBar />
      </div>
      <div className='md:pl-56 pt-[64px]'>
        <Outlet />
      </div>
    </>
  )
}

export default RootLayout
