import StoryServices, { StoryKey } from '@/services/storyServices'
import { Story } from '@/types/storyType'
import { useQuery } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StoryInfo from '@/components/StoryPage/StoryInfo'
import ChaptersList from '@/components/StoryPage/ChaptersList'

const StoryPage = () => {
  const { t } = useTranslation(['cms', 'story_page'])
  const { slugId } = useParams()
  const [slug, id] = slugId!.split('.')

  const { data: storyResponse, isSuccess } = useQuery({
    queryKey: [StoryKey, 'get', id],
    queryFn: () => {
      return StoryServices.get(slug, id)
    },
  })

  const story: Story = storyResponse?.data
  return (
    <HelmetProvider>
      <Helmet>{isSuccess && <title>{story.name}</title>}</Helmet>

      {isSuccess && (
        <div className="mb-6">
          <StoryInfo story={story} />
          <Tabs defaultValue="chapters">
            <TabsList>
              <TabsTrigger value="chapters">
                {t('story_page:tabs.chapters')}
              </TabsTrigger>
              <TabsTrigger value="comments">
                {t('story_page:tabs.comments')}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chapters">
              <ChaptersList story={story} />
            </TabsContent>
            <TabsContent value="comments">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      )}
    </HelmetProvider>
  )
}

export default StoryPage
