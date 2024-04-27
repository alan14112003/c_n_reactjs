import { Command, CommandItem, CommandList } from '@/components/ui/command'
import { ROOT_ROUTES_NAVIGATE } from '@/constants/routes/RoutesNavigate'
import { checkActiveRoute } from '@/utils/utils'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const SideBar = () => {
  const { t } = useTranslation(['cms'])

  return (
    <aside className="fixed top-0 bottom-0 left-0 h-fit z-50 pt-32">
      <Command>
        <CommandList>
          {ROOT_ROUTES_NAVIGATE.map((routeNavigate) => {
            let isActive = checkActiveRoute(
              routeNavigate.link,
              routeNavigate.isIndex
            )
            return (
              <TooltipProvider key={routeNavigate.link}>
                <Tooltip>
                  <CommandItem ignoreAriaSelectedStyles asChild>
                    <TooltipTrigger asChild>
                      <Link
                        to={routeNavigate.link}
                        className={`cursor-pointer hover:bg-secondary h-12 w-12 flex justify-center ${
                          isActive ? 'text-primary' : ''
                        }`}
                      >
                        {routeNavigate.icon}
                      </Link>
                    </TooltipTrigger>
                  </CommandItem>
                  <TooltipContent side="right">
                    {t<any, {}, string>(routeNavigate.name)}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </CommandList>
      </Command>
    </aside>
  )
}

export default SideBar
