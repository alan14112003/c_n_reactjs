import { useAppDispatch } from '@/app/hooks'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateStoryFilter } from '@/features/stories/storyFilterSlide'
import AuthorServices, { AuthorKey } from '@/services/authorServices'
import { AuthorResponse } from '@/types/authorType'
import { useQuery } from '@tanstack/react-query'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

type AuthorFilterBoxProp = {
  authorId?: number
}

const AuthorFilterBox: FC<AuthorFilterBoxProp> = memo(({ authorId }) => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation(['home_page'])

  const {
    data: authorsResponse,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: [AuthorKey],
    queryFn: AuthorServices.all,
    gcTime: 86400000,
  })

  if (isError) {
    console.log(error)
  }

  const authors: AuthorResponse[] = authorsResponse?.data
  return (
    <>
      {isSuccess && (
        <div className="flex items-center gap-6">
          <h3 className="font-bold">
            {t('home_page:filter_story.author.title')}:{' '}
          </h3>
          <Select
            value={authorId ? authorId.toString() : 'all'}
            onValueChange={(value) => {
              dispatch(
                updateStoryFilter({
                  authorId: value !== 'all' ? Number(value) : undefined,
                })
              )
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={
                  authorId &&
                  authors.find((author) => author.id === authorId)?.name
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'all'}>
                {t('filter_story.filter_all')}
              </SelectItem>
              {authors.map((author) => {
                return (
                  <SelectItem value={author.id.toString()} key={author.id}>
                    {author.name}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  )
})

export default AuthorFilterBox
