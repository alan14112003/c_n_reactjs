import ChapterSortEnum from '@/constants/chapters/ChapterSortEnum'
import { ChapterKey } from '@/services/chapterServices'
import StoryServices, { StoryKey } from '@/services/storyServices'
import { ChapterResponse, ChaptersResponse } from '@/types/chapterType'
import { Story } from '@/types/storyType'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { id } from 'date-fns/locale'
import { FC, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
  CheckIcon,
  ChevronsUpDown,
  ChevronLeftCircle,
  ChevronRightCircle,
} from 'lucide-react'
import { cn, toTitleCase } from '@/utils/utils'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'
import SpeechContentBox from '../SpeechContentBox'
import AutoScrollBox from '../AutoScrollBox'

type ChapterNavigationProp = {
  chapter: ChapterResponse
}

const ChapterNavigation: FC<ChapterNavigationProp> = ({ chapter }) => {
  const [prevChapter, setPrevChapter] = useState<ChaptersResponse>()
  const [nextChapter, setNextChapter] = useState<ChaptersResponse>()
  const { t } = useTranslation(['cms'])
  const { slugId } = useParams()

  const [storySlug, storyId] = slugId!.split('.')

  const storyQuery = useQuery({
    queryKey: [StoryKey, 'get', id],
    queryFn: () => {
      return StoryServices.get(storySlug, storyId)
    },
  })

  const queryClient = useQueryClient()

  const chaptersQuery = useQuery({
    queryKey: [ChapterKey, storySlug, Number(storyId), ChapterSortEnum.LAST],
    queryFn: () => {
      return StoryServices.chapters({
        storySlug: storySlug,
        storyId: storyId,
        order: ChapterSortEnum.LAST,
      })
    },
  })

  const chapters: ChaptersResponse[] = chaptersQuery.data?.data

  const story: Story = storyQuery.data?.data

  useEffect(() => {
    if (chaptersQuery.isSuccess) {
      const currentIndex = chapters.findIndex(
        (chapterItem) => chapterItem.id === chapter.id
      )

      setPrevChapter(chapters[currentIndex + 1])

      setNextChapter(chapters[currentIndex - 1])
    }
  }, [chaptersQuery])

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [ChapterKey, storySlug, Number(storyId)],
    })
  }, [])

  return (
    <HelmetProvider>
      <Helmet>
        {storyQuery.isSuccess && (
          <title>
            {toTitleCase(
              `${story.name} - ${t('cms:chapters.number')} ${chapter.number}`
            )}
          </title>
        )}
      </Helmet>

      <div
        className={`mb-10 flex ${chapter.name && 'flex-col'} justify-center`}
      >
        <h1 className="text-2xl font-semibold pb-1 uppercase flex justify-center">
          {storyQuery.isSuccess && (
            <Link to={`/stories/${story.slug}.${story.id}`}>
              {storyQuery.isSuccess && story.name}
            </Link>
          )}
        </h1>
        <h2 className="text-lg flex justify-center items-center">
          {chapter.name ? (
            `${t('cms:chapters.number')} ${chapter.number} - ${chapter.name}`
          ) : (
            <span className="ml-1">
              - {t('cms:chapters.number')} {chapter.number}
            </span>
          )}
        </h2>
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-fit z-50 bg-black">
        <div className="w-full h-full flex flex-col items-center p-2">
          {storyQuery.isSuccess && (
            <div className="flex justify-center gap-4 items-center">
              {prevChapter ? (
                <Link
                  to={`/stories/${story.slug}.${story.id}/chapter-${prevChapter.id}`}
                >
                  <ChevronLeftCircle />
                </Link>
              ) : (
                ''
              )}

              {chaptersQuery.isSuccess && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size={'sm'}
                      role="combobox"
                      className={'w-[180px] justify-between font-normal'}
                    >
                      <span className="flex gap-1">
                        <span>{t('cms:chapters.number')}</span>
                        <span>
                          {
                            chapters.find(
                              (chapterItem) => chapterItem.id === chapter.id
                            )?.number
                          }
                        </span>
                      </span>

                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Nhập số chương" />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>

                        <CommandGroup>
                          {chapters.map((chapterItem) => (
                            <CommandItem
                              key={chapterItem.id}
                              asChild
                              value={`${chapterItem.number}`}
                            >
                              <Link
                                to={`/stories/${story.slug}.${story.id}/chapter-${chapterItem.id}`}
                                className="flex justify-between w-full h-full"
                              >
                                <span className="flex gap-1">
                                  <span>{t('cms:chapters.number')}</span>
                                  <span>{chapterItem.number}</span>
                                </span>
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    chapterItem.id === chapter.id
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </Link>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}

              {nextChapter ? (
                <Link
                  to={`/stories/${story.slug}.${story.id}/chapter-${nextChapter.id}`}
                >
                  <ChevronRightCircle />
                </Link>
              ) : (
                ''
              )}

              <AutoScrollBox />

              {chapter.type === StoryTypeEnum.WORD && <SpeechContentBox />}
            </div>
          )}
        </div>
      </div>
    </HelmetProvider>
  )
}

export default ChapterNavigation
