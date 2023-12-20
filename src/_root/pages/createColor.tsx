import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import ColorForm from '@/features/color/components/colorForm'

const CreateColor = () => {
  return (
    <div className='m-8'>
      <Heading
        title='Add color'
        description='Add a new Color'
      />
      <Separator />
      <ColorForm />
    </div>
  )
}

export default CreateColor
