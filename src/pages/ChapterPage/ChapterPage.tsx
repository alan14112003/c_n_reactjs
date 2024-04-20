import { useAppSelector } from '@/app/hooks'
import ChapterContentText from '@/components/ChapterPage/ChapterContentText'
import ChapterNavigation from '@/components/ChapterPage/ChapterNavigation'
import PurchaseAlert from '@/components/PurchaseAlert'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'
import { selectAuth } from '@/features/auth/authSlice'
import ChapterServices, { ChapterKey } from '@/services/chapterServices'
import { ChapterResponse } from '@/types/chapterType'
import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
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

  const authSelector = useAppSelector(selectAuth)

  if (isError) {
    if (isAxiosError(error)) {
      const responseData = error.response?.data
      if (responseData?.code === 'chapter.need_purchase') {
        if (authSelector.user.accountBalance >= responseData?.price) {
          return (
            <PurchaseAlert chapterId={chapterId} price={responseData.price} />
          )
        } else {
          console.log('thiếu tiền')
        }
      }
    }
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
