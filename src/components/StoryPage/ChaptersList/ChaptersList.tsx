import ChapterSortEnum from '@/constants/chapters/ChapterSortEnum'
import { ChapterKey } from '@/services/chapterServices'
import StoryServices from '@/services/storyServices'
import { ChaptersResponse } from '@/types/chapterType'
import { Story } from '@/types/storyType'
import { useQuery } from '@tanstack/react-query'
import { CircleDollarSign } from 'lucide-react'
import { FC, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type ChaptersListProp = {
  story: Story
}

const ChaptersList: FC<ChaptersListProp> = memo(({ story }) => {
  const { t } = useTranslation(['cms'])

  const [chapterSort, setChapterSort] = useState(ChapterSortEnum.LAST)

  const { data: chaptersResponse, isSuccess } = useQuery({
    queryKey: [ChapterKey, story.slug, story.id, chapterSort],
    queryFn: () => {
      return StoryServices.chapters({
        storySlug: story.slug,
        storyId: `${story.id}`,
        order: chapterSort,
      })
    },
  })

  const chapters: ChaptersResponse[] = chaptersResponse?.data

  return (
    <>
      <div className="flex justify-end">
        <Select
          onValueChange={(value) => {
            setChapterSort(value as ChapterSortEnum)
            console.log('change', value)
          }}
          value={chapterSort}
        >
          <SelectTrigger className="mb-3 w-32">
            <SelectValue
              placeholder={ChapterSortEnum.allNames()[chapterSort]}
            />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(ChapterSortEnum.allNames()).map((chapterSortKey) => (
              <SelectItem value={chapterSortKey} key={chapterSortKey}>
                {t<any, {}, null>(ChapterSortEnum.allNames()[chapterSortKey])}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="border p-4 rounded-sm h-[500px] overflow-y-auto">
        {isSuccess &&
          chapters.map((chapter) => (
            <Link
              to={'/'}
              key={chapter.id}
              className={` p-2 px-4 border rounded-sm mt-2
                  cursor-pointer flex justify-between
                  hover:bg-secondary
                  ${chapter.seen && 'text-foreground/70'}
               `}
            >
              <span className="flex gap-4">
                <span>
                  {t('cms:chapters.number')} {chapter.number}
                </span>
                {chapter.name && (
                  <>
                    <span>-</span>
                    <span>{chapter.name}</span>
                  </>
                )}
              </span>
              <span>
                {!chapter.isFree && (
                  <span className="flex gap-1 items-center">
                    <span>{chapter.price}</span>
                    <span>
                      <CircleDollarSign size={20} />
                    </span>
                  </span>
                )}
              </span>
            </Link>
          ))}
      </div>
    </>
  )
})

export default ChaptersList
