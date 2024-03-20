import { StoriesResponse } from '@/types/storyType'
import StoryItem from './StoryItem'
import Pagination from '../Pagination'
import { useQuery } from '@tanstack/react-query'
import storyServices, { StoryKey } from '@/services/storyServices'
import { Loader2Icon } from 'lucide-react'

const StoryGrid = () => {
  const storyOptions = {
    perPage: 2,
    page: 2,
  }

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
    console.log(data)
  }

  const storiesResponse: StoriesResponse = response?.data
  return (
    <>
      {(isLoading || isPending) && <Loader2Icon />}
      {isSuccess && (
        <>
          <div className="grid gap-4 grid-cols-5">
            {storiesResponse.data.map((story) => (
              <StoryItem key={story.id} story={story} />
            ))}
          </div>
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

export default StoryGrid
