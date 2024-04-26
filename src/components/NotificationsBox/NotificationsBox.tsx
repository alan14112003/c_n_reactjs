import NotificationServices, {
  NotificationKey,
} from '@/services/notificationServices'
import { NotificationPaginate } from '@/types/notificationType'
import { useQuery } from '@tanstack/react-query'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Bell } from 'lucide-react'
import NotificationItem from './NotificationItem'

const NotificationsBox = () => {
  const { isSuccess, data: notificationResponse } = useQuery({
    queryKey: [NotificationKey],
    queryFn: NotificationServices.all,
  })

  const notifications: NotificationPaginate = notificationResponse?.data

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-full p-2">
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[400px]" align="end" alignOffset={-20}>
        {isSuccess &&
          notifications.data.map((notification) => (
            <DropdownMenuItem key={notification.id}>
              <NotificationItem notification={notification} />
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotificationsBox
