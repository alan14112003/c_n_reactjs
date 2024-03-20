import StoryFilterBox from '@/components/StoryFilterBox'
import StoryGrid from '@/components/StoryGrid'
import { Button } from '@/components/ui/button'

const HomePage = () => {
  return (
    <div>
      <div className="flex justify-center gap-4">
        <Button variant="outline">Truyện tranh</Button>
        <Button variant="outline">Truyện chữ</Button>
      </div>

      <StoryFilterBox />
      <StoryGrid />
    </div>
  )
}

export default HomePage
