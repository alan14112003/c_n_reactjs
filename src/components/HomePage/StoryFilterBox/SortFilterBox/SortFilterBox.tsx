import { FC, memo } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { updateStoryFilter } from '@/features/stories/storyFilterSlide'
import { useTranslation } from 'react-i18next'
import SortFilterBoxUI from '@/components/FilterBoxUI/SortFilterBoxUI/SortFilterBoxUi'

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

const SortFilterBox: FC<SortFilterBoxProp> = memo(({ order }) => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation(['home_page'])

  const handleValueChange = (value: string) => {
    dispatch(updateStoryFilter({ order: value }))
  }

  return (
    <SortFilterBoxUI
      order={order ?? ORDER_LIST.update}
      ORDER_LIST={ORDER_LIST}
      onValueChange={handleValueChange}
      translate={t<any, {}, string>}
    />
  )
})

export default SortFilterBox
