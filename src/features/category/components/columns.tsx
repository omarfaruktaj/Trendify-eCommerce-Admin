import { ColumnDef } from '@tanstack/react-table'
import Category from '@/interfaces/categoryInterface'
import RowAction from './rowAction'

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: '_id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const image: { url: string } = row.getValue('image') as { url: string }

      return (
        <img
          className='w-10 h-10 rounded-full'
          src={image.url}
          alt='category image'
        />
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const categoryId = row.getValue('_id') as string

      return (
        <div>
          <RowAction categoryId={categoryId} />
        </div>
      )
    },
  },
]
