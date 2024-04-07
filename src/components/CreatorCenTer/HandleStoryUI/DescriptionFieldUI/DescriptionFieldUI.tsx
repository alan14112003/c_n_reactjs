import { FC, memo } from 'react'
import { UseFormReturn } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import ReactQuill from 'react-quill'
import textEditorModules from '@/config/textEditorModules'

type DescriptionFieldUIProp = {
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

const DescriptionFieldUI: FC<DescriptionFieldUIProp> = memo(({ form }) => {
  return (
    <FormField
      control={form.control}
      name="descriptions"
      render={({ field }) => (
        <FormItem className="mt-8">
          <FormLabel>Description</FormLabel>
          <ReactQuill
            theme="snow"
            value={field.value}
            onChange={field.onChange}
            modules={textEditorModules}
          />

          <FormMessage />
        </FormItem>
      )}
    />
  )
})

export default DescriptionFieldUI
