import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'

type ChapterNameFieldProp = {
  form: UseFormReturn<
    {
      number: number
      type: number
      content: string
      name: string
      isFree: boolean
      StoryId: number
      privateEnd?: Date
      price?: number
    },
    any,
    undefined
  >
}

const ChapterNameField: FC<ChapterNameFieldProp> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tên</FormLabel>
          <Input placeholder="tên" {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ChapterNameField
