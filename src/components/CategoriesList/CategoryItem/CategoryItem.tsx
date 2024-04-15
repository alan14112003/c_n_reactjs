import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  selectStoryFilter,
  updateStoryFilter,
} from '@/features/stories/storyFilterSlide'
import { Category } from '@/types/categoryType'
import { FC, memo } from 'react'
import { Link } from 'react-router-dom'

type CategoryItemProp = {
  category: Category
}

const CategoryItem: FC<CategoryItemProp> = memo(({ category }) => {
  const storyFilter = useAppSelector(selectStoryFilter)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(
      updateStoryFilter({
        categoryIn: `${category.id}`,
        page: 1,
      })
    )
  }

  return (
    <Link
      className="border border-primary rounded px-2 py-0.5"
      onClick={handleClick}
      to={`/?categoryIn=${category.id}&type=${storyFilter.type}`}
    >
      {category.name}
    </Link>
  )
})

export default CategoryItem
