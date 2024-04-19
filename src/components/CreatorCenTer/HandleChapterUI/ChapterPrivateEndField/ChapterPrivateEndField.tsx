import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn, getLocateDate } from '@/utils/utils'

import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { FC, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui/button'

type ChapterPrivateEndFieldProp = {
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

const ChapterPrivateEndField: FC<ChapterPrivateEndFieldProp> = ({ form }) => {
  useEffect(() => {
    if (typeof form.getValues('privateEnd') === 'string') {
      form.setValue('privateEnd', new Date(`${form.getValues('privateEnd')}`))
    }
  }, [form])

  return (
    <FormField
      control={form.control}
      name="privateEnd"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Ngày kết thúc(để trống nếu vĩnh viễn)</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full pl-3 text-left font-normal flex',
                  !field.value && 'text-muted-foreground'
                )}
              >
                {field.value ? (
                  format(field.value, 'PPP', {
                    locale: getLocateDate(),
                  })
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date: Date) => date < new Date()}
                initialFocus
                locale={getLocateDate()}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ChapterPrivateEndField
