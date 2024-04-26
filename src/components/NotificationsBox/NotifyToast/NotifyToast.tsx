import NotificationItem from '@/components/NotificationsBox/NotificationItem'
import { Notification } from '@/types/notificationType'
import { FC } from 'react'

type NotifyToastProp = {
  notification: Notification
}

const NotifyToast: FC<NotifyToastProp> = ({ notification }) => (
  <div className="w-[400px]">
    <NotificationItem notification={notification} />
  </div>
)

export default NotifyToast
