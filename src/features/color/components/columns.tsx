import { ColumnDef } from '@tanstack/react-table'
import RowAction from './rowAction'
import Color from '@/interfaces/colorInterface'

export const columns: ColumnDef<Color>[] = [
  {
    accessorKey: '_id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'colorCode',
    header: 'Color',
    cell: ({ row }) => {
      const colorCode = row.getValue('colorCode') as string

      return (
        <div
          className='h-11 w-11 rounded-full '
          style={{ backgroundColor: `${colorCode}` }}
        />
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const colorId = row.getValue('_id') as string
      const colorCode = row.getValue('colorCode') as string

      return (
        <div>
          <RowAction
            colorId={colorId}
            colorCode={colorCode}
          />
        </div>
      )
    },
  },
]
