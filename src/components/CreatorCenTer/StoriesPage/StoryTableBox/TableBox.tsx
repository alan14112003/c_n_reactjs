import { useAppDispatch, useAppSelector } from '@/app/hooks'
import Pagination from '@/components/Pagination'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
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

const StoryTableBox = () => {
  const storyFilter = useAppSelector(selectCreatorStoryFilter)
  const dispatch = useAppDispatch()

  const filterStoryNavigate = useFilterStory()

  const storyOptions: StoriesQuery = useGetStoryQuery()

  const {
    data: response,
    isLoading,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: [StoryKey, storyOptions, 'auth'],
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
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
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
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
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
