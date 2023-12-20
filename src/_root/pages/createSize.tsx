import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import SizeForm from '@/features/size/components/sizeForm'

const CreateSize = () => {
  return (
    <div className='m-8'>
      <Heading
        title='Add Size'
        description='Add a new Size'
      />
      <Separator />
      <SizeForm />
    </div>
  )
}

export default CreateSize
