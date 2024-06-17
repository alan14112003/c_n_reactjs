import { NoImage } from '@/assets/images'
import Image from '@/components/Image'
import NotificationTypeEnum from '@/constants/notifications/NotificationTypeEnum'
import { Notification, NotificationContent } from '@/types/notificationType'
import { FC, ReactNode } from 'react'

type NotifyCommentReplyProp = {
  notification: Notification
  content: NotificationContent
  children: ReactNode
}

const NotifyCommentReply: FC<NotifyCommentReplyProp> = ({
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
          <span className="font-bold">{content.userName}</span>
          <span className="ml-1">
            {NotificationTypeEnum.getNameByValue(content.type)}
          </span>
          <span className="font-bold capitalize ml-1">
            {content.story.name}
          </span>
        </p>
        {children}
      </div>
    </>
  )
}

export default NotifyCommentReply
