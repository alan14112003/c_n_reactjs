import TimeAgo from '@/components/TimeAgo'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { StoriesList } from '@/types/storyType'

type StoryItemProp = {
  story: StoriesList
}

const StoryItem = ({ story }: StoryItemProp) => {
  return (
    <Card>
      <CardContent className="relative">
        <Badge variant="success" className="absolute top-3 left-2">
          <TimeAgo time={story.updatedAt.toString()} />
        </Badge>
        {story.avatar}
      </CardContent>
      <CardHeader>
        <CardTitle>{story.name}</CardTitle>
        <CardDescription>{story.lastChapter}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export default StoryItem
