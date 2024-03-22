import { StoriesQuery, StoriesResponse } from '@/types/storyType'
import { useQuery } from '@tanstack/react-query'
import storyServices, { StoryKey } from '@/services/storyServices'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  selectStoryFilter,
  updateStoryFilter,
} from '@/features/stories/storyFilterSlide'
import useFilterStory from '@/hooks/useFilterStory'
import { useGetStoryQuery } from '@/hooks/useGetStoryQuery'
import StoryGrid from '@/components/StoryGrid'
import Pagination from '@/components/Pagination'

const StoryListBox = () => {
  const storyFilter = useAppSelector(selectStoryFilter)
  const dispatch = useAppDispatch()

  const filterStoryNavigate = useFilterStory()

  const storyOptions: StoriesQuery = useGetStoryQuery()

  const {
    data: response,
    isLoading,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: [StoryKey, storyOptions],
    queryFn: () => {
      return storyServices.all(storyOptions)
    },
  })

  const onPageChange = (data: number) => {
    dispatch(
      updateStoryFilter({
        page: data,
      })
    )
    filterStoryNavigate({ ...storyFilter, page: data })
  }

  const storiesResponse: StoriesResponse = response?.data
  return (
    <>
      {(isLoading || isPending) && (
        <StoryGrid stories={storiesResponse?.data} isLoad={true} />
      )}
      {isSuccess && (
        <>
          <StoryGrid stories={storiesResponse.data} />
          <div>
            {Pagination({
              total: storiesResponse.total,
              pageSize: storiesResponse.perPage,
              currentPage: storiesResponse.curPage,
              onPageChange: onPageChange,
            })}
          </div>
        </>
      )}
    </>
  )
}

export default StoryListBox
