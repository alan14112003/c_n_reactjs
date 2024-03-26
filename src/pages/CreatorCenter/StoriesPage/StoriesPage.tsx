import StoryFilterBox from '@/components/CreatorCenTer/StoriesPage/StoryFilterBox'
import { toTitleCase } from '@/utils/utils'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const StoriesPage = () => {
  const { t } = useTranslation(['creator_stories_page'])
  return (
    <>
      {/* title */}
      <Helmet>
        <title>{toTitleCase(t('page_title'))}</title>
      </Helmet>
      <div>
        <h2 className="text-2xl font-bold">{t('page_title')}</h2>
        <StoryFilterBox />
      </div>
    </>
  )
}

export default StoriesPage
