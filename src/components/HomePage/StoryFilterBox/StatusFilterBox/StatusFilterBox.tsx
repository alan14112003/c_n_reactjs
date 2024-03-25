import { FC, memo } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { updateStoryFilter } from '@/features/stories/storyFilterSlide'
import { useTranslation } from 'react-i18next'
import { StatusFilterBoxUI } from '@/components/FilterBoxUI/StatusFilterBoxUI/StatusFilterBoxUI'

const STATUS_STORY = {
  null: {
    label: 'filter_story.filter_all',
    value: null,
  },
  false: {
    label: 'filter_story.status.false',
    value: false,
  },
  true: {
    label: 'filter_story.status.true',
    value: true,
  },
}

type StatusKeyType = keyof typeof STATUS_STORY
type StatusFilterBoxProp = {
  isFull: boolean | null
}

const StatusFilterBox: FC<StatusFilterBoxProp> = memo(({ isFull }) => {
  console.log('re render stat')
  const dispatch = useAppDispatch()

  const { t } = useTranslation(['home_page'])

  const handleStatusChange = (value: string) => {
    dispatch(
      updateStoryFilter({
        isFull: STATUS_STORY[value as StatusKeyType].value,
      })
    )
  }
  return (
    <StatusFilterBoxUI
      STATUS_STORY={STATUS_STORY}
      onStatusChange={handleStatusChange}
      statusStory={`${isFull}`}
      translate={t<any, {}, string>}
    />
  )
})

export default StatusFilterBox
