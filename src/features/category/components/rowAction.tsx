import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'
import { useDeleteCategoryMutation } from '../categoryApi'
import toast from 'react-hot-toast'
import ConfirmationDialog from '@/components/ui/confirmationDialog'
import { useState } from 'react'

const RowAction = ({ categoryId }: { categoryId: string }) => {
  const [showModel, setIsShowModel] = useState<boolean>(false)
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation()

  const navigate = useNavigate()

  const handleDelete = async () => {
    try {
      const data = await deleteCategory(categoryId)
      if (
        'error' in data &&
        data.error &&
        'message' in data.error &&
        data.error.message
      ) {
        toast.error(data.error.message)
      } else {
        toast.success('Successfully deleted.')
      }
      setIsShowModel(false)
    } catch (err) {
      console.log(err)
      setIsShowModel(false)
    }
  }

  return (
    <div>
      <ConfirmationDialog
        title='Are you sure?'
        description='This action cannot be undone.'
        isOpen={showModel}
        onClose={() => setIsShowModel(false)}
      >
        <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
          <Button
            disabled={isLoading}
            variant='outline'
            onClick={() => setIsShowModel(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            variant='destructive'
            onClick={handleDelete}
          >
            Continue
          </Button>
        </div>
      </ConfirmationDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='h-8 w-8 p-0'
          >
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsShowModel(true)}>
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate(`/categories/${categoryId}`)}
          >
            Update Category
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default RowAction
