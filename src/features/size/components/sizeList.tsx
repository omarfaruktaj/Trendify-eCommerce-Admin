import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { useGetSizesQuery } from '../sizeApi'

const SizeList = () => {
  const { data, error, isLoading } = useGetSizesQuery(null)

  console.log(data, error)

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>No Size Found.</p>

  return (
    <div className='my-6'>
      {data ? (
        <DataTable
          columns={columns}
          data={data && data}
        />
      ) : (
        <p>No size found.</p>
      )}
    </div>
  )
}

export default SizeList
