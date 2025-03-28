import CategoriesList from '@/components/CategoriesList'
import Image from '@/components/Image'
import TimeAgo from '@/components/TimeAgo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import StoryStatusEnum from '@/constants/stories/StoryStatusEnum'
import FollowStoryServices, {
  FollowStoryKey,
} from '@/services/followStoryServices'
import { StoryKey } from '@/services/storyServices'

import { StoriesResponse } from '@/types/storyType'
import { alertErrorAxios } from '@/utils/alert'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Eye, Heart, HeartOff, ThumbsUp } from 'lucide-react'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type StoryItemProp = {
  story: StoriesResponse
  favorite?: boolean
}

const StoryItem: FC<StoryItemProp> = memo(({ story, favorite }) => {
  const { t } = useTranslation(['cms'])

  const followStoryMutation = useMutation({
    mutationFn: () => FollowStoryServices.update(story.id),
  })

  const queryClient = useQueryClient()

  const handleUnfollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    try {
      await followStoryMutation.mutateAsync()

      queryClient.refetchQueries({
        queryKey: [FollowStoryKey, story.id],
      })

      queryClient.invalidateQueries({
        queryKey: [StoryKey, 'follow'],
      })
    } catch (error) {
      alertErrorAxios(error, t)
    }
  }

  return (
    <Card className="">
      <Link to={`/stories/${story.slug}.${story.id}`}>
        <CardContent className="relative h-[220px] border-b">
          {favorite && (
            <Button
              variant={'outline'}
              size={'icon'}
              className="absolute top-1 right-1 z-10 rounded-full"
              onClick={handleUnfollow}
            >
              <HeartOff />
            </Button>
          )}
          <Badge variant="success" className="absolute top-3 left-2">
            <TimeAgo time={story.updatedAt.toString()} />
          </Badge>
          <Image
            src={story.avatar ? JSON.parse(story.avatar).url : ''}
            alt={`for ${story.name}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-secondary/50 px-3 flex justify-between">
            {story.viewCount !== 0 && (
              <div className="flex items-center gap-1">
                <Eye size={20} />
                {story.viewCount}
              </div>
            )}

            {story.likeCount !== 0 && (
              <div className="flex items-center gap-1">
                <ThumbsUp size={20} />
                {story.likeCount}
              </div>
            )}

            {story.followCount !== 0 && (
              <div className="flex items-center gap-1">
                <Heart size={20} />
                {story.followCount}
              </div>
            )}
          </div>
        </CardContent>
      </Link>
      <HoverCard openDelay={400}>
        <HoverCardTrigger asChild>
          <CardHeader className="p-3">
            <Link to={`/stories/${story.slug}.${story.id}`}>
              <CardTitle className="capitalize">{story.name}</CardTitle>
            </Link>
            <CardDescription>
              {t('chapters.number')} {story.lastChapter?.number}
            </CardDescription>
          </CardHeader>
        </HoverCardTrigger>
        <HoverCardContent side="right">
          <h3 className="font-semibold leading-none tracking-tight capitalize">
            {story.name}
          </h3>
          <p className="mt-2">
            <span className="mr-1">{t('cms:stories.status.title')}:</span>
            {t<any, {}, null>(StoryStatusEnum.getNameByValue(story.isFull))}
          </p>
          <div className="my-3">
            <CategoriesList categories={story.Categories} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: story.descriptions }} />
        </HoverCardContent>
      </HoverCard>
    </Card>
  )
})

export default StoryItem
