import ChapterTableBox from '@/components/CreatorCenTer/ChaptersPage/ChapterTableBox'
import { Button } from '@/components/ui/button'
import storyServices, { StoryKey } from '@/services/storyServices'
import { StoriesList } from '@/types/storyType'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

const ChaptersPage = () => {
  const { slugId } = useParams()
  const [slug, id] = slugId!.split('.')

  const {
    data: storyResponse,
    isLoading: storiesLoad,
    isPending: storiesPen,
    isSuccess: storiesSuc,
  } = useQuery({
    queryKey: [StoryKey, 'auth'],
    queryFn: () => {
      return storyServices.getByAuth(slug, id)
    },
  })

  const story: StoriesList = storyResponse?.data

  return (
    <div>
      <div className="">
        Danh sách chương truyện: {storiesSuc && story.name}
      </div>
      <div className="mt-4 mb-6">
        <Button variant="default" className="p-0">
          <Link
            to={`/creator-center/chapters/${slugId}/create`}
            className="block py-2 px-4"
          >
            Thêm
          </Link>
        </Button>
      </div>
      <div className="">
        <ChapterTableBox id={id} slug={slug} />
      </div>
    </div>
  )
}

export default ChaptersPage
