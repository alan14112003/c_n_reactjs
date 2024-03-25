// SortFilterBoxUI.jsx
import { FC } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SortFilterBoxUIProps = {
  order: string
  ORDER_LIST: { [key: string]: string }
  onValueChange: (value: string) => void
  translate: (key: any) => string
}

const SortFilterBoxUI: FC<SortFilterBoxUIProps> = ({
  order,
  ORDER_LIST,
  onValueChange,
  translate,
}) => {
  return (
    <div className="flex items-center gap-6">
      <h3 className="font-bold">{translate('filter_story.order.title')}: </h3>
      <Select value={order} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={translate(ORDER_LIST[order])} />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(ORDER_LIST).map((key) => (
            <SelectItem value={key} key={key}>
              {translate(ORDER_LIST[key])}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SortFilterBoxUI
