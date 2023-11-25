import LoginForm from '@/features/auth/components/loginForm'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='p-8  bg-white rounded-lg border w-full max-w-md '>
      <p className='text-center text-2xl font-semibold p-2'>
        Login your account.
      </p>
      <LoginForm />
      <Link
        to='/forgot-password'
        className='font-semibold p-1 block mt-2 underline '
      >
        Forgot password?
      </Link>
    </div>
  )
}

export default Login
