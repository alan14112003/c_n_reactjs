import { NoImage } from '@/assets/images'
import Image from '@/components/Image'
import NotificationTypeEnum from '@/constants/notifications/NotificationTypeEnum'
import { Notification, NotificationContent } from '@/types/notificationType'
import { FC, ReactNode } from 'react'

type NotifyBankInProp = {
  notification: Notification
  content: NotificationContent
  children: ReactNode
}

const NotifyBankIn: FC<NotifyBankInProp> = ({
  notification,
  content,
  children,
}) => {
  return (
    <>
      <div className="min-w-12 w-12 h-12 rounded-full overflow-hidden">
        <Image
          className="w-full h-full"
          src={
            notification.avatar ? JSON.parse(notification.avatar).url : NoImage
          }
          alt={notification.content}
        />
      </div>
      <div className="text-base">
        <p>
          <span>{NotificationTypeEnum.getNameByValue(content.type)}</span>
          <span className="ml-1">{content.transactionHistory.money * 2}</span>
        </p>
        {children}
      </div>
    </>
  )
}

export default NotifyBankIn
