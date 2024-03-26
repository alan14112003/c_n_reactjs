import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { CREATOR_ROUTES_NAVIGATE } from '@/constants/routes/RoutesNavigate'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

const checkActiveRoute = (route: string, isIndex?: boolean) => {
  const location = useLocation()
  if (!isIndex) {
    return location.pathname.includes(route)
  }
  return location.pathname + location.hash === route
}

const Aside = () => {
  const { t } = useTranslation(['cms'])
  return (
    <div
      className="w-[300px] border shadow-md pt-6 p-2"
      style={{
        height: 'calc(100vh - 4rem)',
      }}
    >
      <Command>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {CREATOR_ROUTES_NAVIGATE.map((routeNavigate) => {
            let isActive = checkActiveRoute(
              routeNavigate.link,
              routeNavigate.isIndex
            )
            return (
              <CommandItem
                key={routeNavigate.link}
                ignoreAriaSelectedStyles
                asChild
              >
                <Link
                  to={routeNavigate.link}
                  className={`cursor-pointer hover:bg-primary/20 h-16 block ${
                    isActive ? 'bg-primary/50' : ''
                  }`}
                >
                  {routeNavigate.icon}
                  <span className="ml-3">
                    {t<any, {}, string>(routeNavigate.name)}
                  </span>
                </Link>
              </CommandItem>
            )
          })}
        </CommandList>
      </Command>
    </div>
  )
}

export default Aside
