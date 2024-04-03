import SearchBox from './SearchBox'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  selectCreatorStoryFilter,
  updateCreatorStoryFilter,
} from '@/features/stories/creator/storyFilterSlide'
import StatusFilterBox from './StatusFilterBox/StatusFilterBox'
import useFilterStory from '@/hooks/useFilterStory'
import { StoriesQuery } from '@/types/storyType'
import SortFilterBox from './SortFilterBox'
import { useGetStoryQuery } from '@/hooks/useGetStoryQuery'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const StoryFilterBox = () => {
  const creatorStoryFilter = useAppSelector(selectCreatorStoryFilter)
  const filterStoryNavigate = useFilterStory()
  const storyOptions: StoriesQuery = useGetStoryQuery({ withType: false })
  const dispatch = useAppDispatch()

  const handleFetch = (options?: { [key in keyof StoriesQuery]?: any }) => {
    filterStoryNavigate({
      ...creatorStoryFilter,
      ...options,
    })
  }

  useEffect(() => {
    dispatch(updateCreatorStoryFilter(storyOptions))
  }, [])

  return (
    <div className="mt-4">
      <div className="w-1/2">
        <SearchBox searchKey={creatorStoryFilter.key} onFetch={handleFetch} />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-4 mt-3">
          <StatusFilterBox
            statusStory={creatorStoryFilter.isFull}
            onFetch={handleFetch}
          />
          <SortFilterBox
            onFetch={handleFetch}
            order={creatorStoryFilter.order}
          />
        </div>
        <Button variant="default" className="p-0">
          <Link to="/creator-center/stories/create" className="block py-2 px-4">
            Thêm
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default StoryFilterBox
