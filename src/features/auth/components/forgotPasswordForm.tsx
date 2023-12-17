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
import { useForgotPasswordMutation } from '../authApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const formSchema = z.object({
  email: z.string().email('Invalid email. Please enter a valid email'),
})

const ForgotPasswordForm = () => {
  const navigate = useNavigate()
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const result = await forgotPassword(value.email).unwrap()
      form.reset()
      navigate(`/auth/${value.email}`)
      toast.success(result)
    } catch (error) {
      console.error('Forgot password request failed:', error)
    }
  }

  useEffect(() => {
    if (error) {
      if ('status' in error && error.status === 400) {
        toast.error(
          'No user found with this email. Please enter a valid email.',
          { duration: 2000 }
        )
      } else {
        console.error('Forgot password request failed:', error)
        toast.error('An unexpected error occurred. Please try again later.')
      }
    }
  }, [error])

  return (
    <div>
      <Form {...form}>
        <form
          className='space-y-8'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your email'
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
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
            Recover password
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ForgotPasswordForm
