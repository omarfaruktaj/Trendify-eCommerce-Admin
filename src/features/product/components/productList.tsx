import { DataTable } from '@/components/ui/data-table'
import { useGetProductsQuery } from '../productApi'
import { columns } from './columns'

const ProductList = () => {
  const { data, isLoading, error } = useGetProductsQuery('')

  if (isLoading) <p>Loading...</p>

  if (error) <p>No Product Found</p>

  return (
    <div className='my-6'>
      {data ? (
        <DataTable
          columns={columns}
          data={data && data}
        />
      ) : (
        <p>No Product found</p>
      )}
    </div>
  )
}

export default ProductList
