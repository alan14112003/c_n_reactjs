import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import TableHeaderBox from './TableHeaderBox'
import { ChapterQuery, ChapterResponse } from '@/types/chapterType'
import { FC, memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChapterKey } from '@/services/chapterServices'
import storyServices from '@/services/storyServices'
import { useTranslation } from 'react-i18next'
import { ScrollArea } from '@/components/ui/scroll-area'
import ChapterAccessEnum from '@/constants/chapters/ChapterAccessEnum'
import ChapterStatusEnum from '@/constants/chapters/ChapterStatusEnum'
import ChapterSortEnum from '@/constants/chapters/ChapterSortEnum'

type ChapterTableBoxProp = {
  sortKey: ChapterSortEnum
  id: string
  slug: string
}

const ChapterTableBox: FC<ChapterTableBoxProp> = memo(
  ({ id, slug, sortKey }) => {
    const { t } = useTranslation(['cms'])

    const storyOptions: ChapterQuery = {
      order: sortKey,
      storyId: id,
      storySlug: slug,
    }

    const {
      data: chaptersResponse,
      isLoading,
      isPending,
      isSuccess,
    } = useQuery({
      queryKey: [ChapterKey, 'auth', storyOptions],
      queryFn: () => {
        return storyServices.chaptersByAuth(storyOptions)
      },
    })
    const chapters: ChapterResponse[] = chaptersResponse?.data

    return (
      <ScrollArea className="h-full rounded-md border">
        <Table>
          <TableHeaderBox />
          {(isLoading || isPending) && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5}> load...</TableCell>
              </TableRow>
            </TableBody>
          )}
          {isSuccess && (
            <>
              <TableBody>
                {chapters.map((chapter) => {
                  const privateEnd = new Date(chapter.privateEnd ?? '')
                  return (
                    <TableRow key={chapter.id}>
                      <TableCell className="font-medium">
                        {t('cms:chapters.number')} {chapter.number}
                      </TableCell>
                      <TableCell className="font-medium">
                        {chapter.name}
                      </TableCell>
                      <TableCell>
                        <span className="flex flex-col">
                          {t<any, {}, string>(
                            ChapterStatusEnum.getNameByValue(chapter.isFree)
                          )}
                          <span className="flex flex-col">
                            {chapter.price && (
                              <span>
                                {chapter.price} {t('cms:chapters.coin')}
                              </span>
                            )}
                            {chapter.privateEnd && (
                              <span>
                                {t('cms:chapters.paid_end')}:{' '}
                                {`${privateEnd.getDate()}/${privateEnd.getMonth()}/${privateEnd.getFullYear()}`}
                              </span>
                            )}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell>
                        {t<any, {}, string>(
                          ChapterAccessEnum.getNameByValue(chapter.access)
                        )}
                      </TableCell>
                      <TableCell>Paid</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
              <TableCaption></TableCaption>
            </>
          )}
        </Table>
      </ScrollArea>
    )
  }
)

export default ChapterTableBox
