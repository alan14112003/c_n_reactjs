import { StoriesQuery } from '@/types/storyType'
import useQueryParams from './useQueryParams'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'

export const useGetStoryQuery = (): StoriesQuery => {
  const queryParam = useQueryParams()
  return {
    perPage: 2,
    page: queryParam.page ? +queryParam.page : 1,
    isFull:
      queryParam.isFull && queryParam.isFull !== 'null'
        ? Boolean(queryParam.isFull)
        : null,
    key: queryParam.key ?? '',
    type: queryParam.type ? +queryParam.type : StoryTypeEnum.WORD,
    authorId: queryParam.authorId ? +queryParam.authorId : undefined,
    categoryIn: queryParam.categoryIn ?? '',
    categoryNotIn: queryParam.categoryNotIn ?? '',
    order: queryParam.order ?? 'update',
    userId: queryParam.userId ? +queryParam.userId : undefined,
  }
}
