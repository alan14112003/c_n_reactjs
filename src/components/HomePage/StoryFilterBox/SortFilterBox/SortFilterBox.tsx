import { FC, memo } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { updateStoryFilter } from '@/features/stories/storyFilterSlide'
import { useTranslation } from 'react-i18next'
import SortFilterBoxUI from '@/components/FilterBoxUI/SortFilterBoxUI'

type SortFilterBoxProp = {
  order?: string
}

const SortFilterBox: FC<SortFilterBoxProp> = memo(({ order }) => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation(['home_page'])

  const handleValueChange = (value: string) => {
    dispatch(updateStoryFilter({ order: value }))
  }

  return (
    <SortFilterBoxUI
      order={order}
      onValueChange={handleValueChange}
      translate={t<any, {}, string>}
    />
  )
})

export default SortFilterBox
