import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import CategoryServices, { CategoryKey } from '@/services/categoryServices'
import { Category } from '@/types/categoryType'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useQuery } from '@tanstack/react-query'
import { FC, memo } from 'react'
import { UseFormReturn } from 'react-hook-form'

type CategoriesFieldUIProp = {
  form: UseFormReturn<
    {
      name: string
      descriptions: string
      avatar: {
        url: string
        public_id: string
      }
      type: number
      AuthorId: number
      categories: number[]
    },
    any,
    undefined
  >
}

const CategoriesFieldUI: FC<CategoriesFieldUIProp> = memo(({ form }) => {
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
  })

  if (isError) {
    console.log(error)
  }

  const categories: Category[] = categoriesResponse?.data

  const handleChangeCategories = (checked: CheckedState, id: number) => {
    const prevCategories = form.getValues('categories') ?? []

    if (checked) {
      prevCategories.push(id)
    } else {
      prevCategories.splice(prevCategories.indexOf(id), 1)
    }
    form.setValue('categories', prevCategories)
  }

  return (
    <FormField
      control={form.control}
      name="categories"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <FormLabel>Thể loại</FormLabel>
              </AccordionTrigger>
              <AccordionContent>
                {(isLoading || isPending) && <span>load</span>}
                {isSuccess && (
                  <div className="flex items-center gap-4 flex-wrap">
                    {categories.map((category) => {
                      return (
                        <div
                          className="flex items-center space-x-2"
                          key={category.id}
                        >
                          <Checkbox
                            id={`category-${category.id}`}
                            onCheckedChange={(checked) =>
                              handleChangeCategories(checked, category.id)
                            }
                            checked={field.value?.includes(category.id)}
                            className="rounded"
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category.name}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <FormMessage />
        </FormItem>
      )}
    />
  )
})

export default CategoriesFieldUI
