import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'

type ChapterPriceFieldProp = {
  form: UseFormReturn<
    {
      number: number
      type: number
      content: string
      name?: string
      isFree: boolean
      StoryId: number
      privateEnd?: Date
      price?: number
    },
    any,
    undefined
  >
}

const ChapterPriceField: FC<ChapterPriceFieldProp> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Xu</FormLabel>
          <Input
            placeholder="Xu"
            type="number"
            {...field}
            onChange={(e) => {
              form.setValue('price', Number(e.target.value))
            }}
            required
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ChapterPriceField
