import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Trash, UploadCloud } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

interface ImageUploadProps {
  onChange: (value: string) => void
  onRemove: (value: string) => void
  disabled?: boolean
  values: string[]
}

const ImageUpload = ({
  onChange,
  onRemove,
  disabled,
  values,
}: ImageUploadProps) => {
  // const [images, setImages] = useState<string[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          // setImages((prevImages) => [...prevImages, reader.result as string])
          onChange(reader.result as string)
        }
      }

      reader.readAsDataURL(file)
    })
  }

  const handleRemove = (value: string) => {
    // setImages((images) => images.filter((images) => images !== value))
    onRemove(value)
  }

  return (
    <div>
      <div className='mb-4 flex items-center gap-4'>
        {values.length > 0 &&
          values.map((image, index) => (
            <div
              key={index}
              className=' relative w-[200px] h-[200px] rounded-md overflow-hidden '
            >
              <div className='z-10 absolute top-2 right-2'>
                <Button
                  variant='destructive'
                  size='icon'
                  onClick={() => handleRemove(image)}
                >
                  <Trash className='h-4 w-4' />
                </Button>
              </div>
              <img
                src={image}
                alt='image preview'
                className=' object-fill'
              />
            </div>
          ))}
      </div>

      <input
        onChange={handleChange}
        type='file'
        accept='image/*'
        multiple
        id='images'
        className='hidden'
        disabled={disabled}
      />
      <label
        htmlFor='images'
        className={cn('cursor-pointer ', disabled && 'cursor-not-allowed')}
      >
        <div className=' flex items-center justify-center h-14 w-[200px] text-foreground bg-gray-200 dark:bg-gray-800 rounded-md'>
          <UploadCloud width='50' />
          Select Image
        </div>
      </label>
    </div>
  )
}

export default ImageUpload
