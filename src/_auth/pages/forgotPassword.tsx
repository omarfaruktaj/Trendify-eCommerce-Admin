import ForgotPasswordForm from '@/features/auth/components/forgotPasswordForm'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <div className='p-8  bg-white rounded-lg border w-full max-w-md '>
      <p className='text-center text-2xl font-semibold p-2'>Forgot password.</p>
      <ForgotPasswordForm />
      <Link
        to='/auth/login'
        className='font-semibold p-1 block mt-2 underline '
      >
        Already have an account? Login
      </Link>
    </div>
  )
}

export default ForgotPassword
