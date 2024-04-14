import ChapterTableBox from '@/components/CreatorCenTer/ChaptersPage/ChapterTableBox'
import { Button } from '@/components/ui/button'
import storyServices, { StoryKey } from '@/services/storyServices'
import { StoriesResponse } from '@/types/storyType'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ChapterSortEnum from '@/constants/chapters/ChapterSortEnum'
import { useTranslation } from 'react-i18next'
import useQueryParams from '@/hooks/useQueryParams'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { toTitleCase } from '@/utils/utils'

const ChaptersPage = () => {
  const { t } = useTranslation(['cms', 'creator_chapters_page'])
  const { slugId } = useParams()
  const [slug, id] = slugId!.split('.')

  const queryParams = useQueryParams()
  const sortKey = (queryParams.sort ?? ChapterSortEnum.LAST) as ChapterSortEnum
  const navigate = useNavigate()

  const { data: storyResponse, isSuccess } = useQuery({
    queryKey: [StoryKey, 'auth', 'get', id],
    queryFn: () => {
      return storyServices.getByAuth(slug, id)
    },
  })

  const story: StoriesResponse = storyResponse?.data

  return (
    <HelmetProvider>
      {/* title */}
      <Helmet>
        {isSuccess && (
          <title>
            {toTitleCase(t('creator_chapters_page:page_title') + story.name)}
          </title>
        )}
      </Helmet>
      <div>
        <div className="mb-6 flex justify-between">
          <h2 className="text-2xl font-bold">
            {isSuccess && t('creator_chapters_page:page_title') + story.name}
          </h2>
          <Button variant="default" className="p-0">
            <Link
              to={`/creator-center/chapters/${slugId}/create`}
              className="block py-2 px-4"
            >
              {t('creator_chapters_page:add_btn')}
            </Link>
          </Button>
        </div>
        <div className="">
          <div className="flex justify-end">
            <Select
              onValueChange={(value) => {
                navigate(`?sort=${value}`)
              }}
              value={sortKey}
            >
              <SelectTrigger className="mb-3 w-32">
                <SelectValue
                  placeholder={ChapterSortEnum.allNames()[sortKey]}
                />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(ChapterSortEnum.allNames()).map(
                  (chapterSortKey) => (
                    <SelectItem value={chapterSortKey} key={chapterSortKey}>
                      {t<any, {}, null>(
                        ChapterSortEnum.allNames()[chapterSortKey]
                      )}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <ChapterTableBox id={id} slug={slug} sortKey={sortKey} />
        </div>
      </div>
    </HelmetProvider>
  )
}

export default ChaptersPage
