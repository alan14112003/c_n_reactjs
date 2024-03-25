import { StoriesQuery } from '@/types/storyType'
import useQueryParams from './useQueryParams'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'

export const useGetStoryQuery = (): StoriesQuery => {
  const queryParam = useQueryParams()
  let isFull = null

  if (queryParam.isFull && queryParam.isFull !== 'null') {
    isFull = queryParam.isFull === 'true'
  }

  return {
    perPage: 2,
    page: queryParam.page ? +queryParam.page : 1,
    isFull: isFull,
    key: queryParam.key ?? '',
    type: queryParam.type ? +queryParam.type : StoryTypeEnum.WORD,
    authorId: queryParam.authorId ? +queryParam.authorId : undefined,
    categoryIn: queryParam.categoryIn ?? '',
    categoryNotIn: queryParam.categoryNotIn ?? '',
    order: queryParam.order ?? 'update',
    userId: queryParam.userId ? +queryParam.userId : undefined,
  }
}
