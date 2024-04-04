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
import storyServices, { StoryKey } from '@/services/storyServices'
import { StoriesQuery, StoriesResponse } from '@/types/storyType'
import { useQuery } from '@tanstack/react-query'
import TableHeaderBox from './TableHeaderBox'
import StoryAccessEnum from '@/constants/stories/StoryAccessEnum'
import { useTranslation } from 'react-i18next'
import StoryStatusEnum from '@/constants/stories/StoryStatusEnum'

const StoryTableBox = () => {
  const { t } = useTranslation(['cms'])
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
      return storyServices.allByAuth(storyOptions)
    },
  })

  const onPageChange = (page: number) => {
    dispatch(
      updateCreatorStoryFilter({
        page: page,
      })
    )
    filterStoryNavigate({ ...storyFilter, page: page })
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
                <TableCell>Paid</TableCell>
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
