import { useAppDispatch, useAppSelector } from '@/app/hooks'
import Pagination from '@/components/Pagination'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import {
  selectCreatorStoryFilter,
  updateCreatorStoryFilter,
} from '@/features/stories/creator/storyFilterSlide'
import useFilterStory from '@/hooks/useFilterStory'
import { useGetStoryQuery } from '@/hooks/useGetStoryQuery'
import { StoriesQuery, StoriesResponse } from '@/types/storyType'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import TableHeaderBox from './TableHeaderBox'
import StoryAccessEnum from '@/constants/stories/StoryAccessEnum'
import { useTranslation } from 'react-i18next'
import StoryStatusEnum from '@/constants/stories/StoryStatusEnum'
import { Link } from 'react-router-dom'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { BookUp, ScrollText, SquarePen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import StoryServices, { StoryKey } from '@/services/storyServices'
import { alertErrorAxios } from '@/utils/alert'
import { toast } from 'react-toastify'

const StoryTableBox = () => {
  const { t } = useTranslation(['cms', 'response_code'])
  const storyFilter = useAppSelector(selectCreatorStoryFilter)
  const dispatch = useAppDispatch()

  const filterStoryNavigate = useFilterStory()

  const storyOptions: StoriesQuery = useGetStoryQuery({ withType: false })

  const {
    data: response,
    isLoading,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: [StoryKey, 'auth', storyOptions],
    queryFn: () => {
      return StoryServices.allByAuth(storyOptions)
    },
  })

  const queryClient = useQueryClient()

  const publicStoryMutation = useMutation({
    mutationFn: StoryServices.public,
  })

  const onPageChange = (page: number) => {
    dispatch(
      updateCreatorStoryFilter({
        page: page,
      })
    )
    filterStoryNavigate({ ...storyFilter, page: page })
  }

  const handlePublicStory = async (storyId: number) => {
    try {
      await publicStoryMutation.mutateAsync(storyId)
      queryClient.refetchQueries({
        queryKey: [StoryKey, 'auth'],
      })

      toast.success('Truyện đã được công khai ')
    } catch (error) {
      alertErrorAxios(error, t)
    }
  }

  const storiesResponse: StoriesResponse = response?.data
  return (
    <Table>
      <TableHeaderBox />
      {(isLoading || isPending) && (
        <TableBody>
          <TableRow>
            <TableCell colSpan={4}> load...</TableCell>
          </TableRow>
        </TableBody>
      )}
      {isSuccess && (
        <>
          <TableBody>
            {storiesResponse.data.map((story) => (
              <TableRow key={story.id}>
                <TableCell className="font-medium">{story.name}</TableCell>
                <TableCell>
                  <div className="flex">
                    <Link
                      to={`/creator-center/chapters/${story.slug}.${story.id}`}
                    >
                      <TooltipProvider delayDuration={400}>
                        <Tooltip>
                          <TooltipTrigger>
                            <ScrollText size={20} />
                          </TooltipTrigger>
                          <TooltipContent side={'bottom'}>
                            chapters
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Link>

                    <Link
                      className="ml-2"
                      to={`/creator-center/stories/${story.slug}.${story.id}/update`}
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

                    {story.access === StoryAccessEnum.PRIVATE && (
                      <TooltipProvider delayDuration={400}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              className="ml-2 w-fit h-fit"
                              variant={'ghost'}
                              size={'icon'}
                              onClick={() => {
                                handlePublicStory(story.id)
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
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {t<any, {}, string>(
                    StoryStatusEnum.getNameByValue(story.isFull)
                  )}
                </TableCell>
                <TableCell>
                  {t<any, {}, string>(
                    StoryAccessEnum.getNameByValue(story.access)
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>
            <Pagination
              total={storiesResponse.total}
              pageSize={storiesResponse.perPage}
              currentPage={storiesResponse.curPage}
              onPageChange={onPageChange}
            />
          </TableCaption>
        </>
      )}
    </Table>
  )
}

export default StoryTableBox
