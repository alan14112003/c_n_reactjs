import { useAppDispatch } from '@/app/hooks'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateStoryFilter } from '@/features/stories/storyFilterSlide'
import UserServices, { UserKey } from '@/services/userServices'
import { UserPublic } from '@/types/userType'
import { useQuery } from '@tanstack/react-query'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

type UserFilterBoxProp = {
  userId?: number
}

const UserFilterBox: FC<UserFilterBoxProp> = memo(({ userId }) => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation(['home_page'])

  const {
    data: usersResponse,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: [UserKey],
    queryFn: UserServices.all,
    gcTime: 86400000,
  })

  if (isError) {
    console.log(error)
  }

  const authors: UserPublic[] = usersResponse?.data
  return (
    <>
      {isSuccess && (
        <div className="flex items-center gap-6">
          <h3 className="font-bold">{t('filter_story.user.title')}: </h3>
          <Select
            value={userId ? userId.toString() : 'all'}
            onValueChange={(value) => {
              dispatch(
                updateStoryFilter({
                  userId: value !== 'all' ? Number(value) : undefined,
                })
              )
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={
                  userId &&
                  authors.find((author) => author.id === userId)?.fullName
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
                    {author.fullName}
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

export default UserFilterBox
