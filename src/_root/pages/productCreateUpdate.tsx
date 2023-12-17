import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import ProductForm from '@/features/product/components/productForm'
import { useGetProductQuery } from '@/features/product/productApi'
import { useParams } from 'react-router-dom'

const ProductCreateUpdate = () => {
  const { productId } = useParams<{ productId?: string }>()
  const { data, isLoading } = useGetProductQuery(productId!, {
    skip: productId === 'new',
  })

  const headingTitle = productId === 'new' ? 'Create Product' : 'Edit Product'

  const headingDescription =
    productId === 'new' ? 'Create A New Product' : 'Update your product'

  if (isLoading) return <p>Loading...</p>

  return (
    <div className='m-8'>
      <Heading
        title={headingTitle}
        description={headingDescription}
      />
      <Separator />
      <ProductForm
        product={data}
        productId={productId}
      />
    </div>
  )
}

export default ProductCreateUpdate
