import { useEffect, useRef } from 'react'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import CategoryFilterBox from './CategoryFilterBox'
import StatusFilterBox from './StatusFilterBox'
import { useAppSelector } from '@/app/hooks'
import { selectStoryFilter } from '@/features/stories/storyFilterSlide'

const StoryFilterBox = () => {
  const storyFilter = useAppSelector(selectStoryFilter)

  // thao tác liên quan đến sheet
  // openSheetRef để lấy referent đến button open sheet
  const openSheetRef = useRef<HTMLButtonElement>(null)

  // hàm xử lý xự kiện ctrl + p
  const handleUserKeyPress = (e: KeyboardEvent) => {
    e.preventDefault()
    if (e.ctrlKey && e.key === 'p') {
      openSheetRef.current?.click()
    }
  }
  // hàm này để set sự kiện windown on keydown
  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress)

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [handleUserKeyPress])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" ref={openSheetRef}>
          lọc
        </Button>
      </SheetTrigger>
      <SheetContent side={'right'}>
        <SheetHeader>
          <SheetTitle>Lọc truyện nâng cao</SheetTitle>
        </SheetHeader>

        {/* lọc thể loại */}
        <CategoryFilterBox
          categoryIn={storyFilter.categoryIn}
          categoryNotIn={storyFilter.categoryNotIn}
        />

        {/* lọc trạng thái */}
        <StatusFilterBox isFull={storyFilter.isFull} />

        <SheetFooter>
          <SheetClose asChild>
            <Button>Lọc truyện</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default StoryFilterBox
