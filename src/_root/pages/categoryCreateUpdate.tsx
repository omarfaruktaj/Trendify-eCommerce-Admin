import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useGetCategoryQuery } from '@/features/category/categoryApi'
import CategoryForm from '@/features/category/components/categoryForm'
import { useParams } from 'react-router-dom'

const CategoryCreateUpdate = () => {
  const { categoryId } = useParams<{ categoryId?: string }>()
  const { data, isLoading } = useGetCategoryQuery(categoryId!, {
    skip: categoryId === 'new',
  })

  const headingTitle =
    categoryId === 'new' ? 'Create Category' : 'Edit Category'

  const headingDescription =
    categoryId === 'new' ? 'Create A New Category' : 'Update your Category'

  if (isLoading) return <p>Loading...</p>

  return (
    <div className='m-8'>
      <Heading
        title={headingTitle}
        description={headingDescription}
      />
      <Separator />
      <CategoryForm
        category={data}
        categoryId={categoryId}
      />
    </div>
  )
}

export default CategoryCreateUpdate
