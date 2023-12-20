import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { useCreateColorMutation } from '../colorApi'

const formSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  colorCode: z.string().min(2, 'Color code is required.'),
})

const ColorForm = () => {
  const [createColor, { isLoading }] = useCreateColorMutation()

  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      colorCode: '',
    },
  })

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const data = await createColor(value)

      if (
        'error' in data &&
        data.error &&
        'message' in data.error &&
        data.error.message
      ) {
        toast.error(data.error.message)
      } else {
        toast.success('Successfully created.')
        navigate('/colors')
      }
    } catch (err) {
      console.log(err)
      const errorWithMessage = err as { message: string }

      toast.error(errorWithMessage.message)
    }
  }

  return (
    <div className='my-8'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          <FormField
            control={form.control}
            name='name'
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter color name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='colorCode'
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color code</FormLabel>
                <FormControl>
                  <Input
                    type='color'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isLoading}
            type='submit'
          >
            create
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ColorForm
