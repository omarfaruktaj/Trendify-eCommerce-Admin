import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useResetPasswordMutation } from '../authApi'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '@/store/hooks'
import { authenticate } from '../authSlice'
import { useState } from 'react'
import { EyeIcon, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
const formSchema = z.object({
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,}/,
      'Password must be at least 8 characters with at least 1 lowercase, 1 uppercase, 1 digit, and 1 special character.'
    ),
})
const ResetPasswordFrom = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation()
  const { token } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  })
  if (!token) return
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const result = await resetPassword({
        password: value.password,
        token,
      }).unwrap()
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
      navigate('/')
    } catch (error) {
      toast.error(error.message)
      navigate('/auth/login')
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          className='space-y-6'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name='password'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className='relative'>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type={isShowPassword ? 'text' : 'password'}
                      placeholder='Enter a new password.'
                      {...field}
                    />
                  </FormControl>
                  <div
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    className='absolute top-1/2 transform -translate-x-1/2 right-1 m-0 cursor-pointer p-1'
                    style={{ transform: 'translateY(-50%)' }}
                  >
                    {isShowPassword ? (
                      <EyeOff
                        color='gray'
                        size='20'
                      />
                    ) : (
                      <EyeIcon
                        color='gray'
                        size='20'
                      />
                    )}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className='w-full'
            type='submit'
            variant='default'
            disabled={isLoading}
          >
            Reset password
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ResetPasswordFrom
