import { FC } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type StatusFilterBoxUIProp = {
  statusStory: string
  onStatusChange: (value: string) => void
  STATUS_STORY: { [key: string]: { label: string; value: boolean | null } }
  translate: (key: string) => string // giả định bạn sẽ truyền hàm dịch từ container
}

export const StatusFilterBoxUI: FC<StatusFilterBoxUIProp> = ({
  statusStory,
  onStatusChange,
  STATUS_STORY,
  translate,
}) => (
  <div className="flex items-center gap-6">
    <h3 className="font-bold">{translate('filter_story.status.title')}: </h3>
    <Select value={statusStory} onValueChange={onStatusChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={translate(STATUS_STORY[statusStory].label)} />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(STATUS_STORY).map((statusStoryKey) => {
          return (
            <SelectItem value={statusStoryKey} key={statusStoryKey}>
              {translate(STATUS_STORY[statusStoryKey].label)}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  </div>
)
