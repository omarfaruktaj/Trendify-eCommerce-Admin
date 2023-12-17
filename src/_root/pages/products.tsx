import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import ProductList from '@/features/product/components/productList'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const Products = () => {
  return (
    <div className='m-4'>
      <div className='flex justify-between items-center'>
        <Heading
          title='Products'
          description='All Products'
        />
        <Link to='/products/create/new'>
          <Button variant='outline'>
            <Plus width='20' />
            Add New
          </Button>
        </Link>
      </div>
      <Separator />
      <ProductList />
    </div>
  )
}

export default Products
