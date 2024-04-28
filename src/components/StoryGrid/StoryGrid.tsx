import { cn } from '@/utils/utils'
import StorySkeleton from './StorySkeleton'
import { ReactNode } from 'react'

type StoryGridProp = {
  isLoad?: boolean
  className?: React.HTMLAttributes<HTMLDivElement>['className']
  children?: ReactNode
}

const StoryGrid = ({ isLoad = false, className, children }: StoryGridProp) => {
  return (
    <div
      className={cn(
        `grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`,
        className
      )}
    >
      {isLoad
        ? Array.from({ length: 20 }).map((val, index) => {
            return <StorySkeleton key={`${val}-${index}`} />
          })
        : children}
    </div>
  )
}

export default StoryGrid
