import { StoriesQuery, StoriesPaginate } from '@/types/storyType'
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

  const storyOptions: StoriesQuery = useGetStoryQuery({ withType: true })

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

  const StoriesPaginate: StoriesPaginate = response?.data
  return (
    <>
      {(isLoading || isPending) && (
        <StoryGrid stories={StoriesPaginate?.data} isLoad={true} />
      )}
      {isSuccess && (
        <>
          <StoryGrid stories={StoriesPaginate.data} />
          <div>
            <Pagination
              total={StoriesPaginate.total}
              pageSize={StoriesPaginate.perPage}
              currentPage={StoriesPaginate.curPage}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </>
  )
}

export default StoryListBox
