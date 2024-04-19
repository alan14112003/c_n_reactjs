import ChapterContentText from '@/components/ChapterPage/ChapterContentText'
import ChapterNavigation from '@/components/ChapterPage/ChapterNavigation'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'
import ChapterServices, { ChapterKey } from '@/services/chapterServices'
import { ChapterResponse } from '@/types/chapterType'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const ChapterPage = () => {
  const { chapterId: chapterIdString } = useParams()
  const [_, chapterId] = chapterIdString!.split('-')

  const {
    data: chapterResponse,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: [ChapterKey, 'get', chapterId],
    queryFn: () => {
      return ChapterServices.get(chapterId)
    },
  })

  if (isError) {
    console.log(error)
  }

  const chapter: ChapterResponse = chapterResponse?.data

  return (
    <div>
      {isSuccess && (
        <>
          <ChapterNavigation chapter={chapter} />
          {chapter.type === StoryTypeEnum.WORD && (
            <ChapterContentText content={chapter.content} />
          )}
        </>
      )}
    </div>
  )
}

export default ChapterPage
