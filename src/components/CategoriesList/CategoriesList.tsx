import { Category } from '@/types/categoryType'
import { FC, memo } from 'react'
import CategoryItem from './CategoryItem'

type CategoriesListProp = {
  categories: Category[]
}

const CategoriesList: FC<CategoriesListProp> = memo(({ categories }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
})

export default CategoriesList
