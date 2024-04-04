import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'

export type ChapterOrderType = 'asc' | 'desc'
export interface ChapterQuery {
  storySlug: string
  storyId: string
  order: ChapterOrderType
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
