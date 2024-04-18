import { Bell } from 'lucide-react'
import ModeToggle from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import UserActionBox from '@/components/UserActionBox'
import SearchBox from '@/components/HomePage/StoryFilterBox/SearchBox'

const Header = () => {
  return (
    <header className="fixed h-16 top-0 pt-2 p-4 left-0 right-0 container z-50 bg-background">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-10">
          <h1>Logo</h1>
          <ModeToggle />
          <SearchBox />
        </div>
        <div className="flex justify-between items-center gap-4">
          <Button size="icon" variant="outline" className="rounded-full p-2">
            <Bell />
          </Button>
          <UserActionBox />
        </div>
      </div>
    </header>
  )
}

export default Header
