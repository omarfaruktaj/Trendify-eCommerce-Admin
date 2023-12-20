import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '../categoryApi'
import Category from '@/interfaces/categoryInterface'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import ImageUpload from '@/components/ui/uploadImage'
import { useNavigate } from 'react-router-dom'

interface CategoryFormProps {
  category?: Category
  categoryId?: string
}

const formSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  description: z.string().min(11, 'Description is required.'),
  image: z.array(z.string()),
})

const CategoryForm = ({ category }: CategoryFormProps) => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation()
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation()

  const navigate = useNavigate()
  const defaultValues = {
    name: category?.name || '',
    description: category?.description || '',
    image: (category && [category?.image.url]) || [],
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    formData.set('name', value.name)
    formData.set('description', value.description)
    formData.append('image', value.image[0])
    if (category) {
      try {
        const data = await updateCategory({
          category: formData,
          id: category._id,
        })

        if (
          'error' in data &&
          data.error &&
          'message' in data.error &&
          data.error.message
        ) {
          toast.error(data.error.message)
        } else {
          toast.success('Successfully updated.')
          navigate('/categories')
        }
      } catch (err) {
        console.log(err)
        const errorWithStatus = err as { message: string }
        toast.error(errorWithStatus.message)
      }
    } else {
      try {
        const data = await createCategory(formData)

        if (
          'error' in data &&
          data.error &&
          'message' in data.error &&
          data.error.message
        ) {
          toast.error(data.error.message)
        } else {
          toast.success('Successfully created.')
          navigate('/categories')
        }
      } catch (err) {
        console.log(err)
        const errorWithMessage = err as { message: string }

        toast.error(errorWithMessage.message)
      }
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
            disabled={isLoading || isUpdating}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    onChange={(image) =>
                      field.onChange([...field.value, image])
                    }
                    onRemove={() => field.onChange('')}
                    disabled={field.value.length >= 1}
                    values={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            disabled={isLoading || isUpdating}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter Category name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            disabled={isLoading || isUpdating}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter Category description'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading || isUpdating}
            type='submit'
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CategoryForm
