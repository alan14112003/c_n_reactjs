import { useNavigate } from 'react-router-dom'
import { UserRound } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { resetAuth, selectAuth } from '@/features/auth/authSlice'
import { resetAuthLS } from '@/utils/authLS'
import { useTranslation } from 'react-i18next'
import { languages } from '@/utils/i18n'
import { useState } from 'react'

const UserActionBox = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const auth = useAppSelector(selectAuth)
  console.log('re-render')
  const [openDropdown, setOpenDropdown] = useState(false)

  const { t, i18n } = useTranslation('cms')
  const handleLogOut = () => {
    dispatch(resetAuth())
    resetAuthLS()
    navigate('/login')
  }

  return (
    <DropdownMenu
      open={openDropdown}
      onOpenChange={() => setOpenDropdown(false)}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onMouseEnter={() => setOpenDropdown(true)}
          className="rounded-full"
        >
          <UserRound />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        onMouseLeave={() => setOpenDropdown(false)}
        onMouseEnter={() => setOpenDropdown(true)}
      >
        <DropdownMenuLabel>
          <span className="font-bold flex items-center gap-2">
            <span className="border rounded-full p-1  flex items-center justify-center">
              <UserRound className=" w-5 h-5" />
            </span>
            {auth.user.fullName}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {t(`header.user_action_box.profile`)}
          </DropdownMenuItem>
          <DropdownMenuItem>
            {t(`header.user_action_box.get_coins`)}
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {languages[i18n.language]}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {Object.keys(languages).map((lang) => (
                  <DropdownMenuItem
                    onClick={() => i18n.changeLanguage(lang)}
                    key={lang}
                    disabled={i18n.resolvedLanguage === lang}
                  >
                    {languages[lang]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            {t(`header.user_action_box.settings`)}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>
          {t(`header.user_action_box.logout`)}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserActionBox
