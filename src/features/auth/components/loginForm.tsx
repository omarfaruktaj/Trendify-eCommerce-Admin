import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useState } from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOff } from 'lucide-react'
import { useLoginMutation } from '../authApi'
import { useAppDispatch } from '@/store/hooks'
import { authenticate } from '../authSlice'
import { toast as hotToast } from 'react-hot-toast'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
  email: z.string().email('Invalid email. Please enter a valid email.'),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,}/,
      'Invalid password, Please enter a valid password.'
    ),
})

const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const result = await login(value).unwrap()

      navigate('/')
      dispatch(
        authenticate({
          user: result.user,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        })
      )
      console.log(result.accessToken, result.refreshToken)
      localStorage.setItem('accessToken', result.accessToken)
      localStorage.setItem('refreshToken', result.refreshToken)
      form.reset()
      hotToast.success('Successfully login.')
    } catch (error) {
      form.reset()
      toast({
        title: 'Error when login.',
        description: 'Please try again',
      })
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder='Enter your email.'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <div className='relative'>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type={isShowPassword ? 'text' : 'password'}
                      placeholder='Enter your password.'
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
          ></FormField>
          <Button
            disabled={isLoading}
            type='submit'
            variant='default'
            className='w-full'
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm
