import { useEffect } from 'react'
import { Outlet, useNavigate, useParams, useLocation } from 'react-router-dom'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

import { authenticate } from '@/features/auth/authSlice'
import { useGetMeQuery } from '@/features/user/userApi'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRefreshAccessTokenMutation } from '@/features/auth/authApi'

const isFetchBaseQueryError = (
  error: FetchBaseQueryError | SerializedError
): error is FetchBaseQueryError => 'status' in error

const AppLayout = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const params = useParams()
  const location = useLocation()

  const { data, error, isLoading } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem('accessToken'),
  })

  const [refreshAccessToken, { isLoading: isRefreshing }] =
    useRefreshAccessTokenMutation()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (!accessToken || !refreshToken) {
      if (Object.keys(params).length !== 0) {
        return navigate(location.pathname)
      }
      return navigate('/auth/login')
    }
    if (data)
      dispatch(authenticate({ user: data.user, accessToken, refreshToken }))
  }, [data, dispatch, navigate])

  const refreshToken = useAppSelector((state) => state.auth.refreshToken)

  useEffect(() => {
    if (error) {
      if (isFetchBaseQueryError(error)) {
        if (error.status === 401) {
          console.log(error)
          const refresh = async () => {
            try {
              const result = await refreshAccessToken(refreshToken).unwrap()
              console.log(result)
              dispatch(
                authenticate({
                  user: result.user,
                  accessToken: result.accessToken,
                  refreshToken: result.refreshToken,
                })
              )

              localStorage.setItem('accessToken', result.accessToken)
              localStorage.setItem('refreshToken', result.refreshToken)
            } catch (error) {
              localStorage.clear()

              navigate('/auth/login')
            }
          }
          refresh()
        } else if (error.status === 500) {
          localStorage.clear()
          console.log('I am here')
          navigate('/auth/login')
        }
      }
    }
  }, [refreshToken, dispatch, error, navigate, refreshAccessToken])

  if (isLoading || isRefreshing) return <p>Loading...</p>

  return (
    <div className='bg-gray-100'>
      <Outlet />
    </div>
  )
}

export default AppLayout
