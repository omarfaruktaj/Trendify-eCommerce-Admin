import { ColumnDef } from '@tanstack/react-table'
import Size from '@/interfaces/sizeInterface'

export const columns: ColumnDef<Size>[] = [
  {
    accessorKey: '_id',
    header: 'Id',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
]
