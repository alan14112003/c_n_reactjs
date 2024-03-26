import { useAppDispatch } from '@/app/hooks'
import SearchBoxUI from '@/components/SearchBoxUI'
import { updateCreatorStoryFilter } from '@/features/stories/creator/storyFilterSlide'
import { FC, memo, useEffect } from 'react'

type SearchBoxProp = {
  searchKey: string
  onFetch: () => void
}

const SearchBox: FC<SearchBoxProp> = memo(({ searchKey, onFetch }) => {
  const dispatch = useAppDispatch()
  // Sử dụng useEffect để xử lý debouncing
  useEffect(() => {
    // Đặt một timeout để chờ 1 giây sau khi người dùng ngừng nhập
    const timeoutId = setTimeout(() => {
      onFetch()
    }, 1500) // Chờ 1000ms = 1 giây

    // Dùng clean-up function để hủy timeout nếu component được unmount hoặc nếu searchKey thay đổi trước khi timeout kết thúc
    return () => clearTimeout(timeoutId)
  }, [searchKey]) // Dependency array chứa inputValue để useEffect được gọi mỗi khi giá trị thay đổi

  const handleChange = (value: string) => {
    dispatch(
      updateCreatorStoryFilter({
        key: value,
      })
    )
  }
  return <SearchBoxUI searchKey={searchKey} onChange={handleChange} />
})

export default SearchBox
