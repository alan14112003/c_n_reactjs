import { StoriesResponse } from '@/types/storyType'
import StoryItem from './StoryItem'
import { cn } from '@/utils/utils'
import StorySkeleton from './StorySkeleton'

type StoryGridProp = {
  stories: StoriesResponse[]
  isLoad?: boolean
  className?: React.HTMLAttributes<HTMLDivElement>['className']
}

const StoryGrid = ({ stories, isLoad = false, className }: StoryGridProp) => {
  return (
    <div
      className={cn(
        `grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5`,
        className
      )}
    >
      {isLoad
        ? Array.from({ length: 20 }).map((val, index) => {
            return <StorySkeleton key={`${val}-${index}`} />
          })
        : stories.map((story) => <StoryItem key={story.id} story={story} />)}
    </div>
  )
}

export default StoryGrid
