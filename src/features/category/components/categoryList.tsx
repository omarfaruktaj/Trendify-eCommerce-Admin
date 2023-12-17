import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { useGetCategoriesQuery } from '../categoryApi'

const CategoryList = () => {
  const { data, error, isLoading } = useGetCategoriesQuery(null)

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>No category Found.</p>

  return (
    <div className='my-6'>
      {data ? (
        <DataTable
          columns={columns}
          data={data && data}
        />
      ) : (
        <p>No category found.</p>
      )}
    </div>
  )
}

export default CategoryList
