import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import ColorList from '@/features/color/components/colorList'
import { Separator } from '@radix-ui/react-separator'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const Colors = () => {
  return (
    <div className='m-4'>
      <div className='flex justify-between items-center'>
        <Heading
          title='Colors'
          description='All Colors'
        />
        <Link to='/colors/create'>
          <Button variant='outline'>
            <Plus width='20' />
            Add New
          </Button>
        </Link>
      </div>
      <Separator />
      <ColorList />
    </div>
  )
}

export default Colors
