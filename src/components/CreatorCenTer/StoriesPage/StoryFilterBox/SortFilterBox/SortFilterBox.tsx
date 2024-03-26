import { useAppDispatch } from '@/app/hooks'
import SortFilterBoxUI from '@/components/FilterBoxUI/SortFilterBoxUI'
import { updateCreatorStoryFilter } from '@/features/stories/creator/storyFilterSlide'
import { StoriesQuery } from '@/types/storyType'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

type SortFilterBoxProp = {
  order?: string
  onFetch: (option: { [key in keyof StoriesQuery]?: any }) => void
}

const SortFilterBox: FC<SortFilterBoxProp> = memo(({ order, onFetch }) => {
  const { t } = useTranslation('creator_stories_page')
  const dispatch = useAppDispatch()

  return (
    <SortFilterBoxUI
      translate={t<any, {}, string>}
      onValueChange={(order) => {
        dispatch(
          updateCreatorStoryFilter({
            order: order,
          })
        )
        onFetch({
          order: order,
        })
      }}
      order={order}
    />
  )
})

export default SortFilterBox
