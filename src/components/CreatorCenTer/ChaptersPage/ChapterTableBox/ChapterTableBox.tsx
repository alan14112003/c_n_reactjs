import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import TableHeaderBox from './TableHeaderBox'
import { ChapterQuery, ChaptersResponse } from '@/types/chapterType'
import { FC, memo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ChapterServices, { ChapterKey } from '@/services/chapterServices'
import storyServices from '@/services/storyServices'
import { useTranslation } from 'react-i18next'
import { ScrollArea } from '@/components/ui/scroll-area'
import ChapterAccessEnum from '@/constants/chapters/ChapterAccessEnum'
import ChapterStatusEnum from '@/constants/chapters/ChapterStatusEnum'
import ChapterSortEnum from '@/constants/chapters/ChapterSortEnum'
import { Button } from '@/components/ui/button'
import { BookUp, BookX, SquarePen } from 'lucide-react'
import { alertErrorAxios } from '@/utils/alert'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

type ChapterTableBoxProp = {
  sortKey: ChapterSortEnum
  id: string
  slug: string
}

const ChapterTableBox: FC<ChapterTableBoxProp> = memo(
  ({ id, slug, sortKey }) => {
    const { t } = useTranslation(['cms', 'response_code'])

    const [isAlertChapterList, setIsAlertChapterList] = useState<{
      [key: number]: boolean
    }>({})

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
    const chapters: ChaptersResponse[] = chaptersResponse?.data

    const queryClient = useQueryClient()
    const publicChaptersMutation = useMutation({
      mutationFn: ChapterServices.public,
    })

    const deleteChaptersMutation = useMutation({
      mutationFn: ChapterServices.delete,
    })

    const handlePublicChapter = async (chapterId: number) => {
      try {
        await publicChaptersMutation.mutateAsync([chapterId])
        queryClient.refetchQueries({
          queryKey: [ChapterKey, 'auth'],
        })
        toast.success('Chương đã được công khai ')
      } catch (error) {
        alertErrorAxios(error, t)
      }
    }

    const handleDeleteChapter = async (chapterId: number) => {
      try {
        await deleteChaptersMutation.mutateAsync(chapterId)
        queryClient.refetchQueries({
          queryKey: [ChapterKey, 'auth'],
        })
        toast.success('Đã xóa chương')
      } catch (error) {
        alertErrorAxios(error, t)
      }
    }

    return (
      <ScrollArea className="h-[27rem] rounded-md border">
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
                      <TableCell>
                        <div className="flex">
                          <Link
                            className="ml-2"
                            to={`/creator-center/chapters/${slug}.${id}/update/${chapter.id}`}
                          >
                            <TooltipProvider delayDuration={400}>
                              <Tooltip>
                                <TooltipTrigger>
                                  <SquarePen size={20} />
                                </TooltipTrigger>
                                <TooltipContent side={'bottom'}>
                                  update
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Link>

                          {chapter.access === ChapterAccessEnum.PRIVATE && (
                            <>
                              <TooltipProvider delayDuration={400}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      className="ml-2 w-fit h-fit"
                                      variant={'ghost'}
                                      size={'icon'}
                                      onClick={() => {
                                        handlePublicChapter(chapter.id)
                                      }}
                                    >
                                      <BookUp size={20} />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side={'bottom'}>
                                    {t('stories.access.public')}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider delayDuration={400}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      className="ml-2 w-fit h-fit"
                                      variant={'ghost'}
                                      size={'icon'}
                                      onClick={() => {
                                        setIsAlertChapterList({
                                          ...isAlertChapterList,
                                          [chapter.id]: true,
                                        })
                                      }}
                                    >
                                      <BookX size={20} />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side={'bottom'}>
                                    Xóa
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <AlertDialog
                                open={isAlertChapterList[chapter.id]}
                              >
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Xác nhận xóa chương
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Bạn có muốn xóa chương truyện "
                                      {chapter.name}" không
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel
                                      onClick={() => {
                                        setIsAlertChapterList({
                                          ...isAlertChapterList,
                                          [chapter.id]: false,
                                        })
                                      }}
                                    >
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => {
                                        handleDeleteChapter(chapter.id)
                                        setIsAlertChapterList({
                                          ...isAlertChapterList,
                                          [chapter.id]: false,
                                        })
                                      }}
                                    >
                                      Continue
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </>
                          )}
                        </div>
                      </TableCell>
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
