import { useAppDispatch } from '@/app/hooks'
import StatusFilterBoxUI from '@/components/FilterBoxUI/StatusFilterBoxUI'
import { updateCreatorStoryFilter } from '@/features/stories/creator/storyFilterSlide'
import { StoriesQuery } from '@/types/storyType'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

type StatusFilterBoxProp = {
  statusStory: boolean | null
  onFetch: (option: { [key in keyof StoriesQuery]?: any }) => void
}

const StatusFilterBox: FC<StatusFilterBoxProp> = memo(
  ({ statusStory, onFetch }) => {
    const { t } = useTranslation('creator_stories_page')
    const dispatch = useAppDispatch()

    return (
      <StatusFilterBoxUI
        translate={t<any, {}, string>}
        statusStory={`${statusStory}`}
        onStatusChange={(status) => {
          dispatch(
            updateCreatorStoryFilter({
              isFull: status,
            })
          )
          onFetch({
            isFull: status,
          })
        }}
      />
    )
  }
)

export default StatusFilterBox
