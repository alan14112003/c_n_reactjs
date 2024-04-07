import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import textEditorModules from '@/config/textEditorModules'
import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'
import ReactQuill from 'react-quill'

type ChapterContentTextFieldProp = {
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

const ChapterContentTextField: FC<ChapterContentTextFieldProp> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem className="mt-8">
          <FormLabel>Nội dung</FormLabel>
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
}

export default ChapterContentTextField
