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
import AuthorFilterBox from './AuthorFilterBox'
import UserFilterBox from './UserFilterBox/UserFilterBox'
import SortFilterBox from './SortFilterBox'
import { useTranslation } from 'react-i18next'

const StoryFilterBox = () => {
  const storyFilter = useAppSelector(selectStoryFilter)

  const { t } = useTranslation(['home_page'])

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
          {t('filter_story.btnTitle')}
        </Button>
      </SheetTrigger>
      <SheetContent side={'right'} className="sm:max-w-[700px]">
        <SheetHeader>
          <SheetTitle>
            <span>{t('filter_story.title')}</span>
          </SheetTitle>
        </SheetHeader>

        {/* lọc thể loại */}
        <CategoryFilterBox
          categoryIn={storyFilter.categoryIn}
          categoryNotIn={storyFilter.categoryNotIn}
        />

        <div className="flex justify-between mt-6 flex-wrap">
          {/* lọc trạng thái */}
          <StatusFilterBox isFull={storyFilter.isFull} />

          {/* lọc tác giả */}
          <AuthorFilterBox authorId={storyFilter.authorId} />
        </div>
        <div className="flex justify-between mt-6 flex-wrap">
          {/* lọc user đăng bài */}
          <UserFilterBox userId={storyFilter.userId} />

          {/* sắp xếp theo */}
          <SortFilterBox order={storyFilter.order} />
        </div>
        <SheetFooter className="mt-8">
          <SheetClose asChild>
            <Button variant={'default'}>{t('filter_story.btnTitle')}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default StoryFilterBox
