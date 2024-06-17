import { Bell } from 'lucide-react'
import ModeToggle from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import UserActionBox from '@/components/UserActionBox'
import { LogoZZImage } from '@/assets/images'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="h-16 p-2 border-b fixed left-0 right-0 top-0 bg-background z-50">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-10">
          <Link to={'/'}>
            <img className="w-32" src={LogoZZImage} alt="logo trang web" />
          </Link>
          <ModeToggle />
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
