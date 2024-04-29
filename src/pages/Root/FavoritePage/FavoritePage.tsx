import StoryListBox from '@/components/FavoritePage/StoryListBox'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const FavoritePage = () => {
  const { t } = useTranslation(['cms'])
  return (
    <HelmetProvider>
      <Helmet>
        <title>{t('cms:root_navigation.favorite')}</title>
      </Helmet>

      <h1 className="text-2xl font-bold">
        {t('cms:root_navigation.favorite')}
      </h1>
      <div className="mt-6">
        <StoryListBox />
      </div>
    </HelmetProvider>
  )
}

export default FavoritePage
