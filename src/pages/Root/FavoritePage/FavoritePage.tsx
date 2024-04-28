import StoryListBox from '@/components/FavoritePage/StoryListBox'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const FavoritePage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>FavoritePage</title>
      </Helmet>

      <h1>FavoritePage</h1>
      <div className="mt-6">
        <StoryListBox />
      </div>
    </HelmetProvider>
  )
}

export default FavoritePage
