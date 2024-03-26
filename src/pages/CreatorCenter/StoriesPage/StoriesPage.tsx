import StoryFilterBox from '@/components/CreatorCenTer/StoriesPage/StoryFilterBox'
import StoryTableBox from '@/components/CreatorCenTer/StoriesPage/StoryTableBox'
import { toTitleCase } from '@/utils/utils'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const StoriesPage = () => {
  const { t } = useTranslation(['creator_stories_page'])
  return (
    <HelmetProvider>
      {/* title */}
      <Helmet>
        <title>{toTitleCase(t('page_title'))}</title>
      </Helmet>
      <div>
        <h2 className="text-2xl font-bold">{t('page_title')}</h2>
        <StoryFilterBox />
        <div className="mt-6">
          <StoryTableBox />
        </div>
      </div>
    </HelmetProvider>
  )
}

export default StoriesPage
