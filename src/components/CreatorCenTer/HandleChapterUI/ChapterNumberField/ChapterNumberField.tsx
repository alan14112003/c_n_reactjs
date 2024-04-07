import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'

type ChapterNumberFieldProp = {
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

const ChapterNumberField: FC<ChapterNumberFieldProp> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="number"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Chương số</FormLabel>
          <Input
            type="number"
            placeholder="Chương số"
            {...field}
            onChange={(e) => {
              form.setValue('number', Number(e.target.value))
            }}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ChapterNumberField
