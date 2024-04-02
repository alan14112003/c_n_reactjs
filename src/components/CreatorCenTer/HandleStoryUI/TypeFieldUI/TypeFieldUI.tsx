import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'
import { FC, memo } from 'react'
import { UseFormReturn } from 'react-hook-form'

type TypeFieldUIProp = {
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

const TypeFieldUI: FC<TypeFieldUIProp> = memo(({ form }) => {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="w-1/3">
          <FormLabel>Type</FormLabel>
          <Select
            onValueChange={(value) => {
              form.setValue('type', Number(value))
            }}
            value={`${field.value ?? StoryTypeEnum.WORD}`}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={StoryTypeEnum.allNames()[StoryTypeEnum.WORD]}
              />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(StoryTypeEnum.allNames()).map((StoryTypeKey) => (
                <SelectItem value={StoryTypeKey} key={StoryTypeKey}>
                  {StoryTypeEnum.allNames()[Number(StoryTypeKey)]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
})

export default TypeFieldUI
