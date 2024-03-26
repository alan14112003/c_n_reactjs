import StoryFilterBox from '@/components/CreatorCenTer/StoriesPage/StoryFilterBox'
import { useTranslation } from 'react-i18next'

const StoriesPage = () => {
  const { t } = useTranslation('creator_stories_page')
  return (
    <div>
      <h2 className="text-2xl font-bold">Quản lý truyện của bạn</h2>
      <StoryFilterBox />
    </div>
  )
}

export default StoriesPage
