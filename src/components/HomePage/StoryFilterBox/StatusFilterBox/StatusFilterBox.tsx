import { FC, memo } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { updateStoryFilter } from '@/features/stories/storyFilterSlide'
import { useTranslation } from 'react-i18next'
import StatusFilterBoxUI from '@/components/FilterBoxUI/StatusFilterBoxUI'

type StatusFilterBoxProp = {
  isFull: boolean | null
}

const StatusFilterBox: FC<StatusFilterBoxProp> = memo(({ isFull }) => {
  console.log('re render stat')
  const dispatch = useAppDispatch()

  const { t } = useTranslation(['home_page'])

  const handleStatusChange = (value: boolean | null) => {
    dispatch(
      updateStoryFilter({
        isFull: value,
      })
    )
  }
  return (
    <StatusFilterBoxUI
      onStatusChange={handleStatusChange}
      statusStory={`${isFull}`}
      translate={t<any, {}, string>}
    />
  )
})

export default StatusFilterBox
