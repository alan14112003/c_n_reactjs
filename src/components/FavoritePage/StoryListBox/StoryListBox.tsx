import { StoriesPaginate, FollowStoriesQuery } from '@/types/storyType'
import { useQuery } from '@tanstack/react-query'
import storyServices, { StoryKey } from '@/services/storyServices'
import StoryGrid from '@/components/StoryGrid'
import Pagination from '@/components/Pagination'
import useQueryParams from '@/hooks/useQueryParams'
import { useNavigate } from 'react-router-dom'
import StoryItem from '@/components/StoryGrid/StoryItem'

const StoryListBox = () => {
  const navigate = useNavigate()

  const storyOptions: FollowStoriesQuery = useQueryParams()

  const {
    data: response,
    isLoading,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: [StoryKey, 'follow', storyOptions],
    queryFn: () => {
      return storyServices.follow(storyOptions)
    },
  })

  const onPageChange = (data: number) => {
    navigate(`/favorite?page=${data}`)
  }

  const StoriesPaginate: StoriesPaginate = response?.data
  return (
    <>
      {(isLoading || isPending) && <StoryGrid isLoad />}
      {isSuccess && (
        <>
          <StoryGrid>
            {StoriesPaginate.data.map((story) => (
              <StoryItem key={story.id} story={story} favorite />
            ))}
          </StoryGrid>
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
