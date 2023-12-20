import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { useGetColorsQuery } from '../colorApi'

const ColorList = () => {
  const { data, error, isLoading } = useGetColorsQuery(null)

  console.log(data, error)

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

export default ColorList
