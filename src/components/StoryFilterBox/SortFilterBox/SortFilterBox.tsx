import { FC } from 'react'
import { useAppDispatch } from '@/app/hooks'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateStoryFilter } from '@/features/stories/storyFilterSlide'
import { useTranslation } from 'react-i18next'

type SortFilterBoxProp = {
  order?: string
}

const ORDER_LIST = {
  update: 'filter_story.order.update',
  views: 'filter_story.order.views',
  likes: 'filter_story.order.likes',
  chapters: 'filter_story.order.chapters',
  isFull: 'filter_story.order.isFull',
  all: 'filter_story.order.all',
}

type OrderKeyType = keyof typeof ORDER_LIST

const SortFilterBox: FC<SortFilterBoxProp> = ({ order }) => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation(['home_page'])

  return (
    <div className="flex items-center gap-6">
      <h3 className="font-bold">{t('filter_story.order.title')}: </h3>
      <Select
        value={order}
        onValueChange={(value) => {
          dispatch(
            updateStoryFilter({
              order: value,
            })
          )
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder={t<any, {}, null>(ORDER_LIST[order as OrderKeyType])}
          />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(ORDER_LIST).map((key) => {
            return (
              <SelectItem value={key} key={key}>
                {t<any, {}, null>(ORDER_LIST[key as OrderKeyType])}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SortFilterBox
