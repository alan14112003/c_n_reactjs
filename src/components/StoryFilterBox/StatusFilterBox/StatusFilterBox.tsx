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

const STATUS_STORY = {
  null: {
    label: 'Tất cả',
    value: null,
  },
  false: {
    label: 'Đang tiến hành',
    value: false,
  },
  true: {
    label: 'Hoàn thành',
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

  const [statusStory, setStatusStory] = useState(`${isFull}`)
  return (
    <div className="flex items-center gap-6">
      <h3 className="font-bold">Trạng thái: </h3>
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
            placeholder={STATUS_STORY[statusStory as StatusKeyType].value}
          />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(STATUS_STORY).map((statusStoryKey) => {
            const key = statusStoryKey as StatusKeyType
            return (
              <SelectItem value={statusStoryKey} key={statusStoryKey}>
                {STATUS_STORY[key].label}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
})

export default StatusFilterBox
