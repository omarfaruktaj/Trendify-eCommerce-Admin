import { Product } from '@/interfaces/productInterface'
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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import chroma from 'chroma-js'

import ReactSelect, { StylesConfig } from 'react-select'
import { Button } from '@/components/ui/button'

interface ProductFormProps {
  product?: Product
  productId?: string
}
interface ColourOption {
  value: string
  label: string
  color: string
}

const colourOptions: readonly ColourOption[] = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
  { value: 'blue', label: 'Blue', color: '#0052CC' },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630' },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
]

const formSchema = z.object({
  name: z.string().min(20),
  slug: z.string().min(2),
  description: z.string().min(20),
  images: z.any(),
  colors: z.array(
    z
      .object({
        value: z.string(),
        label: z.string(),
        color: z.string(),
      })
      .optional()
  ),

  sizes: z.array(
    z.object({
      size: z.string().optional(),
    })
  ),
  price: z.number(),
  priceDiscount: z.number(),
  category: z.string().min(2),
  quantity: z.number(),
})

const ProductForm = ({ product }: ProductFormProps) => {
  const colourStyles: StylesConfig<ColourOption, true> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color)
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      }
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color)
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      }
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  }
  // console.log(onSelect)

  const productColors = product?.colors.map((curr) => ({
    value: curr.name,
    label: curr.name.toUpperCase(),
    color: curr.colorCode,
  }))

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product
      ? {
          name: product.name,
          slug: product.slug,
          description: product.description,
          images: product.images,
          colors: productColors,
          sizes: product.sizes,
          price: product.price,
          priceDiscount: product.priceDiscount,
          category: product.category,
          quantity: product.quantity,
        }
      : {
          name: '',
          slug: '',
          description: '',
          images: '',
          colors: null,
          sizes: null,
          price: 0,
          priceDiscount: 0,
          category: '',
          quantity: 0,
        },
  })

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    console.log(value)
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug:</FormLabel>
                <FormControl>
                  <Input {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description:</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='colors'
            render={({ field }) => (
              <FormItem>
                <FormLabel>colors:</FormLabel>
                <FormControl>
                  <ReactSelect
                    closeMenuOnSelect={false}
                    isMulti
                    options={colourOptions}
                    styles={colourStyles}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='sizes'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sizes:</FormLabel>
                <FormControl>
                  <Input {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price:</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category:</FormLabel>
                <FormControl>
                  <Input {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='images'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images:</FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    multiple
                    {...field}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='priceDiscount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>PriceDiscount:</FormLabel>
                <FormControl>
                  <Input {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='quantity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity:</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default ProductForm
