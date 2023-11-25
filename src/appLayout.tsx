import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

import { authenticate } from '@/features/auth/authSlice'
import { useGetMeQuery } from '@/features/user/userApi'
import { useAppDispatch } from '@/store/hooks'
import { useRefreshAccessTokenMutation } from '@/features/auth/authApi'

const isFetchBaseQueryError = (
  error: FetchBaseQueryError | SerializedError
): error is FetchBaseQueryError => 'status' in error

const AppLayout = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { data, error, isLoading } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem('accessToken'),
  })
  const [refreshAccessToken, { isLoading: isRefreshing }] =
    useRefreshAccessTokenMutation()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (!accessToken || !refreshToken) {
      return navigate('/auth/login')
    }

    if (data)
      dispatch(authenticate({ user: data.user, accessToken, refreshToken }))
    if (error) {
      if (isFetchBaseQueryError(error)) {
        if (error.status === 401) {
          const refresh = async () => {
            try {
              const result = await refreshAccessToken(refreshToken).unwrap()

              dispatch(
                authenticate({
                  user: result.user,
                  accessToken: result.accessToken,
                  refreshToken: result.refreshToken,
                })
              )
            } catch (error) {
              localStorage.clear()
              return navigate('/auth/login')
            }
          }
          refresh()
        } else if (error.status === 500) {
          localStorage.clear()
          return navigate('/auth/login')
        }
      }
    }
  }, [data, dispatch, error, navigate, refreshAccessToken])

  if (isLoading || isRefreshing) return <p>Loading...</p>

  return (
    <div className='bg-gray-100'>
      <Outlet />
    </div>
  )
}

export default AppLayout
