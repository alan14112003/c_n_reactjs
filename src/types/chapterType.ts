import ChapterSortEnum from '@/constants/chapters/ChapterSortEnum'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'

export interface ChapterQuery {
  storySlug: string
  storyId: string
  order: ChapterSortEnum
}

export interface ChapterResponse {
  id: number
  number: number
  name: string
  isFree: boolean
  privateEnd: null | Date
  price: null | number
  access: number
  type: StoryTypeEnum
  StoryId: number
}
