import { Product } from '@/interfaces/productInterface'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'priceDiscount',
    header: 'Price Discount',
  },
  {
    accessorKey: 'sold',
    header: 'Sold',
  },
]
