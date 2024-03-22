import StoryFilterBox from '@/components/HomePage/StoryFilterBox'
import StoryListBox from '@/components/HomePage/StoryListBox/StoryListBox'

const HomePage = () => {
  return (
    <div className="container">
      <StoryFilterBox />
      <div className="mt-10">
        <StoryListBox />
      </div>
    </div>
  )
}

export default HomePage
