import { Story } from '@/types/storyType'
import { FC } from 'react'
import CategoriesList from '@/components/CategoriesList'
import Image from '@/components/Image'
import { Button } from '@/components/ui/button'
import UserPublicBox from '@/components/UserPublicBox'
import StoryStatusEnum from '@/constants/stories/StoryStatusEnum'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'
import { Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import LikeStoryServices, { LikeStoryKey } from '@/services/likeStoryServices'
import FollowStoryServices, {
  FollowStoryKey,
} from '@/services/followStoryServices'
import { alertErrorAxios } from '@/utils/alert'
import { NoImage } from '@/assets/images'

type StoryInfoProp = {
  story: Story
}

const StoryInfo: FC<StoryInfoProp> = ({ story }) => {
  const { t } = useTranslation(['cms', 'story_page', 'response_code'])

  const { data: likeStoryResponse } = useQuery({
    queryKey: [LikeStoryKey, story.id],
    queryFn: () => LikeStoryServices.get(story.id),
  })

  const { data: followStoryResponse } = useQuery({
    queryKey: [FollowStoryKey, story.id],
    queryFn: () => FollowStoryServices.get(story.id),
  })

  const likeStoryMutation = useMutation({
    mutationFn: () => LikeStoryServices.update(story.id),
  })

  const followStoryMutation = useMutation({
    mutationFn: () => FollowStoryServices.update(story.id),
  })

  const queryClient = useQueryClient()

  const handleLikeStory = async () => {
    try {
      await likeStoryMutation.mutateAsync()

      queryClient.invalidateQueries({
        queryKey: [LikeStoryKey, story.id],
      })
    } catch (error) {
      alertErrorAxios(error, t)
    }
  }

  const handleFollowStory = async () => {
    try {
      await followStoryMutation.mutateAsync()

      queryClient.invalidateQueries({
        queryKey: [FollowStoryKey, story.id],
      })
    } catch (error) {
      alertErrorAxios(error, t)
    }
  }

  return (
    <div className="flex gap-10">
      <div className="w-[190px] h-[250px] shadow-slate-700 shadow-md rounded-sm">
        <Image
          src={story.avatar ? JSON.parse(story.avatar).url : NoImage}
          alt={`for ${story.name}`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="">
        <h2 className="text-2xl font-semibold pb-3 uppercase">{story.name}</h2>
        <div className="flex gap-24">
          <div className="">
            <table>
              <tbody>
                <tr>
                  <td className="min-w-28 font-semibold">
                    {t('cms:stories.type.title')}
                  </td>
                  <td className="ml-4">
                    {t<any, {}, null>(StoryTypeEnum.getNameByValue(story.type))}
                  </td>
                </tr>
                <tr>
                  <td className=" font-semibold">
                    {t('cms:stories.status.title')}
                  </td>
                  <td className="ml-4">
                    {t<any, {}, null>(
                      StoryStatusEnum.getNameByValue(story.isFull)
                    )}
                  </td>
                </tr>
                <tr>
                  <td className=" font-semibold">{t('cms:authors.title')}</td>
                  <td className="ml-4">{story.Author.name}</td>
                </tr>
                <tr>
                  <td className=" font-semibold">{t('cms:stories.views')}</td>
                  <td className="ml-4">{story.viewCount}</td>
                </tr>
                <tr>
                  <td className=" font-semibold">{t('cms:stories.likes')}</td>
                  <td className="ml-4">{story.likeCount}</td>
                </tr>
                <tr>
                  <td className=" font-semibold">{t('cms:stories.follows')}</td>
                  <td className="ml-4">{story.followCount}</td>
                </tr>
              </tbody>
            </table>
            <div className="my-4">
              <UserPublicBox user={story.User} />
            </div>

            <div className="mb-4">
              <CategoriesList categories={story.Categories} />
            </div>
            <div className="flex gap-4">
              <Button onClick={handleLikeStory}>
                {t<any, {}, null>(
                  `story_page:buttons.like.${likeStoryResponse?.data === null}`
                )}
              </Button>
              <Button onClick={handleFollowStory}>
                {t<any, {}, null>(
                  `story_page:buttons.follow.${
                    followStoryResponse?.data === null
                  }`
                )}
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="">
              <h4 className="font-bold text-md uppercase flex gap-1 items-center">
                <Info size={17} />
                {t('cms:stories.descriptions')}
              </h4>
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: story.descriptions }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoryInfo
