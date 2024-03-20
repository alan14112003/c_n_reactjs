import { FC, memo, useEffect, useState } from 'react'
import CheckCategory from './CheckCategory/CheckCategory'
import {
  CategoriesStatus,
  Category,
  ValueCategoryStatus,
} from '@/types/categoryType'
import CategoryServices, { CategoryKey } from '@/services/categoryServices'
import { useQuery } from '@tanstack/react-query'
import { useAppDispatch } from '@/app/hooks'
import { updateStoryFilter } from '@/features/stories/storyFilterSlide'
import CheckBox from './CheckBox'

const INSTRUCTION_CATEGORIES = [
  { value: 1, label: 'Tìm trong những thể loại này' },
  {
    value: -1,
    label: 'Loại trừ những thể loại này',
  },
  {
    value: 0,
    label: 'Có thể thuộc hoặc không thuộc thể loại này',
  },
]

type CategoryFilterBoxProp = {
  categoryIn?: number[]
  categoryNotIn?: number[]
}

const CategoryFilterBox: FC<CategoryFilterBoxProp> = memo(
  ({ categoryIn, categoryNotIn }) => {
    const [categoriesStatus, setCategoriesStatus] = useState<
      CategoriesStatus[]
    >([])

    const {
      data: categoriesResponse,
      isLoading,
      isPending,
      isSuccess,
      isError,
      error,
    } = useQuery({
      queryKey: [CategoryKey],
      queryFn: CategoryServices.all,
      gcTime: 86400000,
      refetchOnMount: false,
    })

    if (isError) {
      console.log(error)
    }

    const categories: Category[] = categoriesResponse?.data

    const dispatch = useAppDispatch()

    console.log('re render cate')
    useEffect(() => {
      if (isSuccess) {
        setCategoriesStatus(
          categories.map((category) => {
            let statusCategory: ValueCategoryStatus = 0
            if (categoryIn?.includes(category.id)) {
              statusCategory = 1
            } else if (categoryNotIn?.includes(category.id)) {
              statusCategory = -1
            }
            return {
              id: category.id,
              status: statusCategory,
              name: category.name,
            }
          })
        )
      }
    }, [categories, categoryIn, categoryNotIn])

    const changeCategoryStatus = (category: CategoriesStatus) => {
      const categoriesStatusNew = categoriesStatus.filter(
        (categoryStatus) => categoryStatus.id !== category.id
      )
      categoriesStatusNew.push(category)

      console.log('change: ', categoriesStatusNew)

      const categoryInNew = categoriesStatusNew
        .filter((categoryStatus) => categoryStatus.status === 1)
        .map((categoryStatus) => categoryStatus.id)

      const categoryNotInNew = categoriesStatusNew
        .filter((categoryStatus) => categoryStatus.status === -1)
        .map((categoryStatus) => categoryStatus.id)

      dispatch(
        updateStoryFilter({
          categoryIn: categoryInNew,
          categoryNotIn: categoryNotInNew,
        })
      )
    }

    return (
      <>
        <h3 className="my-4 font-bold">Thể loại</h3>

        {INSTRUCTION_CATEGORIES.map((instructionsCategory) => (
          <div
            className="flex items-center mt-2"
            key={instructionsCategory.value}
          >
            <CheckBox
              value={instructionsCategory.value}
              label={instructionsCategory.label}
            />
          </div>
        ))}

        <div className="flex gap-4 flex-wrap mt-8">
          {(isLoading || isPending) && <span>load</span>}
          {isSuccess &&
            categoriesStatus.map((category) => {
              return (
                <CheckCategory
                  category={category}
                  key={category.id}
                  onChange={changeCategoryStatus}
                >
                  {category.name}
                </CheckCategory>
              )
            })}
        </div>
      </>
    )
  }
)

export default CategoryFilterBox
