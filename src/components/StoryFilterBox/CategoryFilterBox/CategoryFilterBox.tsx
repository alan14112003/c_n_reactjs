import { useEffect, useState } from 'react'
import CheckCategory, { ValueCategoryType } from './CheckCategory/CheckCategory'
import { Category } from '@/types/categoryType'
import CategoryServices, { CategoryKey } from '@/services/categoryServices'
import { useQuery } from '@tanstack/react-query'
import { Check, X } from 'lucide-react'

type CategoriesStatusType = {
  id: number
  status: ValueCategoryType
}

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

const CategoryFilterBox = () => {
  const [categoriesStatus, setCategoriesStatus] = useState<
    CategoriesStatusType[]
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
  })

  if (isError) {
    console.log(error)
  }

  const categories: Category[] = categoriesResponse?.data

  useEffect(() => {
    if (isSuccess) {
      setCategoriesStatus(
        categories.map((category) => ({ id: category.id, status: 0 }))
      )
    }
  }, [isSuccess])

  useEffect(() => {
    const checkStatusChange = categoriesStatus.some(
      (categoryStatus) => categoryStatus.status !== 0
    )

    if (checkStatusChange) {
      console.log('change: ', categoriesStatus)

      // storiesFilter.categoryIn = categoriesStatus
      //   .filter((categoryStatus) => categoryStatus.status === 1)
      //   .map((categoryStatus) => categoryStatus.id)

      // storiesFilter.categoryNotIn = categoriesStatus
      //   .filter((categoryStatus) => categoryStatus.status === -1)
      //   .map((categoryStatus) => categoryStatus.id)
    }
  }, [categoriesStatus])

  const changeCategoryStatus = (
    categoryId: number,
    value: ValueCategoryType
  ) => {
    const categoriesStatusNew = categoriesStatus.filter(
      (categoryStatus) => categoryStatus.id !== categoryId
    )

    setCategoriesStatus([
      ...categoriesStatusNew,
      { id: categoryId, status: value },
    ])
  }

  return (
    <>
      <h3 className="my-4 font-bold">Thể loại</h3>

      {INSTRUCTION_CATEGORIES.map((instructionsCategory) => (
        <div
          className="flex items-center mt-2"
          key={instructionsCategory.value}
        >
          <div
            className={`w-6 h-6 flex justify-center items-center mr-2 bg-gray-200 dark:bg-white`}
          >
            {instructionsCategory.value !== 0 &&
              (instructionsCategory.value === 1 ? (
                <Check color="#17e5e8" />
              ) : (
                <X color="#e81717" />
              ))}
          </div>
          <span className="select-none overflow-hidden w-full">
            {instructionsCategory.label}
          </span>
        </div>
      ))}

      <div className="flex gap-4 flex-wrap mt-8">
        {(isLoading || isPending) && <span>load</span>}
        {isSuccess &&
          categories.map((category) => {
            return (
              <CheckCategory
                key={category.id}
                onChange={(value) => {
                  changeCategoryStatus(category.id, value)
                }}
              >
                {category.name}
              </CheckCategory>
            )
          })}
      </div>
    </>
  )
}

export default CategoryFilterBox
