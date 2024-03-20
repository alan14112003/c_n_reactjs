import { useEffect, useRef, useState } from 'react'
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
import { StoriesQuery } from '@/types/storyType'
import CategoryFilterBox from './CategoryFilterBox'

const StoryFilterBox = () => {
  const [storiesFilter, setStoriesFilter] = useState<StoriesQuery>({
    page: 1,
    perPage: 10,
    key: '',
  })

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

        <CategoryFilterBox />
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
