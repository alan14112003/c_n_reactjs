import NotificationServices, {
  NotificationKey,
} from '@/services/notificationServices'
import { Notification, NotificationPaginate } from '@/types/notificationType'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Bell } from 'lucide-react'
import NotificationItem from './NotificationItem'
import { useEffect } from 'react'
import { socket } from '@/utils/socket'
import NotificationEvent from '@/constants/events/NotificationEvent'
import { toast } from 'react-toastify'
import NotifyToast from './NotifyToast'

const NotificationsBox = () => {
  const { isSuccess, data: notificationResponse } = useQuery({
    queryKey: [NotificationKey],
    queryFn: NotificationServices.all,
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    const handleNotificationEventNew = (notification: Notification) => {
      toast(<NotifyToast notification={notification} />, {
        className: 'w-fit',
      })
      queryClient.refetchQueries({
        queryKey: [NotificationKey],
      })
    }

    socket.on(NotificationEvent.NEW, handleNotificationEventNew)

    return () => {
      socket.off(NotificationEvent.NEW, handleNotificationEventNew)
    }
  }, [])

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
