import { Command, CommandItem, CommandList } from '@/components/ui/command'
import { CREATOR_ROUTES_NAVIGATE } from '@/constants/routes/RoutesNavigate'
import { checkActiveRoute } from '@/utils/utils'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Aside = () => {
  const { t } = useTranslation(['cms'])
  return (
    <div className="w-[300px] border shadow-md pt-6 p-2 h-full">
      <Command>
        <CommandList>
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
