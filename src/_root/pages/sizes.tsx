import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import SizeList from '@/features/size/components/sizeList'
import { Separator } from '@radix-ui/react-separator'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const Sizes = () => {
  return (
    <div className='m-4'>
      <div className='flex justify-between items-center'>
        <Heading
          title='Sizes'
          description='All Sizes'
        />
        <Link to='/sizes/create'>
          <Button variant='outline'>
            <Plus width='20' />
            Add New
          </Button>
        </Link>
      </div>
      <Separator />
      <SizeList />
    </div>
  )
}

export default Sizes
