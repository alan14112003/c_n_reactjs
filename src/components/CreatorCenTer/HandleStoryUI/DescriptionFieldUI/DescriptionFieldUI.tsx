import { FC, memo } from 'react'
import { UseFormReturn } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import ReactQuill from 'react-quill'

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
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                ['blockquote', 'link', 'formula'],

                [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
                [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                [{ direction: 'rtl' }], // text direction

                [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
                [{ header: [1, 2, 3, 4, 5, 6, false] }],

                [{ font: [] }],
                [{ align: [] }],
                [{ color: [] }, { background: [] }], // dropdown with defaults from theme

                ['clean'], // remove formatting button
              ],
            }}
          />

          <FormMessage />
        </FormItem>
      )}
    />
  )
})

export default DescriptionFieldUI
