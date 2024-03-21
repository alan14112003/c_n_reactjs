import { FC, memo, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAppDispatch } from '@/app/hooks'
import { updateStoryFilter } from '@/features/stories/storyFilterSlide'
import { useTranslation } from 'react-i18next'

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

  const [statusStory, setStatusStory] = useState(`${isFull}`)
  return (
    <div className="flex items-center gap-6">
      <h3 className="font-bold">{t('filter_story.status.title')}: </h3>
      <Select
        value={statusStory}
        onValueChange={(value) => {
          setStatusStory(value as StatusKeyType)
          dispatch(
            updateStoryFilter({
              isFull: STATUS_STORY[value as StatusKeyType].value,
            })
          )
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder={t<any, {}, null>(
              STATUS_STORY[statusStory as StatusKeyType].value
            )}
          />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(STATUS_STORY).map((statusStoryKey) => {
            const key = statusStoryKey as StatusKeyType
            return (
              <SelectItem value={statusStoryKey} key={statusStoryKey}>
                {t<any, {}, null>(STATUS_STORY[key].label)}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
})

export default StatusFilterBox
