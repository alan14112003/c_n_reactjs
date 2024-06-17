import ModeToggle from '@/components/ModeToggle'
import UserActionBox from '@/components/UserActionBox'
import SearchBox from '@/components/HomePage/StoryFilterBox/SearchBox'
import NotificationsBox from '@/components/NotificationsBox'
import { Link } from 'react-router-dom'
import { LogoZZImage } from '@/assets/images'

const Header = () => {
  return (
    <header className="fixed h-16 top-0 pt-2 p-4 left-0 right-0 container z-50 bg-background">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-10">
          <Link to={'/'}>
            <img className="w-32" src={LogoZZImage} alt="logo trang web" />
          </Link>
          <ModeToggle />
          <SearchBox />
        </div>
        <div className="flex justify-between items-center gap-4">
          <NotificationsBox />
          <UserActionBox />
        </div>
      </div>
    </header>
  )
}

export default Header
