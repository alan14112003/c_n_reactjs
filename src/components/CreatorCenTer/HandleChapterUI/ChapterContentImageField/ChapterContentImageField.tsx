import { ChapterImageUpload } from '@/components/FileUploads'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'

type ChapterContentImageFieldProp = {
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

const ChapterContentImageField: FC<ChapterContentImageFieldProp> = ({
  form,
}) => {
  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem className="mt-8">
          <FormLabel>Nội dung</FormLabel>

          <ChapterImageUpload
            onUpload={(data) => {
              form.setValue('content', JSON.stringify(data))
            }}
            onDelete={() => {
              form.resetField('content')
            }}
            chapterImageUpload={field.value && JSON.parse(field.value)}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ChapterContentImageField
