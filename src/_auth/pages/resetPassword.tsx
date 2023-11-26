import ResetPasswordFrom from '@/features/auth/components/resetPasswordForm'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
  return (
    <div className='p-8  bg-white rounded-lg border w-full max-w-md '>
      <p className='text-center text-2xl font-semibold p-2'>Reset password.</p>
      <ResetPasswordFrom />
      <Link
        to='/auth/login'
        className='font-semibold p-1 block mt-2 underline '
      >
        Know your password? Login
      </Link>
    </div>
  )
}

export default ResetPassword
