import StoryFilterBox from '@/components/StoryFilterBox'
import StoryGrid from '@/components/StoryGrid'

const HomePage = () => {
  return (
    <div className="container relative">
      <StoryFilterBox />
      <StoryGrid />
    </div>
  )
}

export default HomePage
