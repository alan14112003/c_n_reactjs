import { FC } from 'react'
import { useAppDispatch } from '@/app/hooks'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateStoryFilter } from '@/features/stories/storyFilterSlide'

type SortFilterBoxProp = {
  order?: string
}

const ORDER_LIST = {
  update: 'Ngày cập nhật',
  views: 'Lượt xem',
  likes: 'Lượt thích',
  chapters: 'Số lượng chương',
  isFull: 'Đã hoàn',
  all: 'Tất cả',
}

type OrderKeyType = keyof typeof ORDER_LIST

const SortFilterBox: FC<SortFilterBoxProp> = ({ order }) => {
  const dispatch = useAppDispatch()

  return (
    <div className="flex items-center gap-6">
      <h3 className="font-bold">Sắp xếp theo: </h3>
      <Select
        value={order}
        onValueChange={(value) => {
          dispatch(
            updateStoryFilter({
              order: value,
            })
          )
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={ORDER_LIST[order as OrderKeyType]} />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(ORDER_LIST).map((key) => {
            return (
              <SelectItem value={key} key={key}>
                {ORDER_LIST[key as OrderKeyType]}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SortFilterBox
