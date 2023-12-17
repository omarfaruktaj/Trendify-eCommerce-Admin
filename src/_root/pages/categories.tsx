import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import CategoryList from '@/features/category/components/categoryList'
import { Separator } from '@radix-ui/react-separator'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const Categories = () => {
  return (
    <div className='m-4'>
      <div className='flex justify-between items-center'>
        <Heading
          title='Categories'
          description='All Categories'
        />
        <Link to='/categories/new'>
          <Button variant='outline'>
            <Plus width='20' />
            Add New
          </Button>
        </Link>
      </div>
      <Separator />
      <CategoryList />
    </div>
  )
}

export default Categories
