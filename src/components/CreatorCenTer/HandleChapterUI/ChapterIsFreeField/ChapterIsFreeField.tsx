import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ChapterStatusEnum from '@/constants/chapters/ChapterStatusEnum'
import { useTranslation } from 'react-i18next'

type ChapterIsFreeFieldProp = {
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
  setIsFree: (isFree: boolean) => void
}

const ChapterIsFreeField: FC<ChapterIsFreeFieldProp> = ({
  form,
  setIsFree,
}) => {
  const { t } = useTranslation(['cms'])
  return (
    <FormField
      control={form.control}
      name="isFree"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Loại</FormLabel>
          <Select
            onValueChange={(value) => {
              const isFreeVal = value === 'true'
              form.setValue('isFree', isFreeVal)
              setIsFree(isFreeVal)
            }}
            value={`${field.value}`}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={t<any, {}, null>(
                  ChapterStatusEnum.allNames()[`${ChapterStatusEnum.IS_FREE}`]
                )}
              />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(ChapterStatusEnum.allNames()).map(
                (chapterStatusKey) => (
                  <SelectItem value={chapterStatusKey} key={chapterStatusKey}>
                    {t<any, {}, null>(
                      ChapterStatusEnum.allNames()[chapterStatusKey]
                    )}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ChapterIsFreeField
