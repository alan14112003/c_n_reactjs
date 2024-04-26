import TimeAgo from '@/components/TimeAgo'
import NotificationTypeEnum from '@/constants/notifications/NotificationTypeEnum'
import { Notification, NotificationContent } from '@/types/notificationType'
import { FC, useEffect, useState } from 'react'
import NotifyFollow from './NotifyFollow'
import { cn } from '@/utils/utils'
import NotifyLike from './NotifyLike'
import NotifyCommentNew from './NotifyCommentNew'
import NotifyCommentReply from './NotifyCommentReply'

type NotificationItemProp = {
  notification: Notification
}

const NotificationItem: FC<NotificationItemProp> = ({ notification }) => {
  const [content, setContent] = useState<NotificationContent>()

  useEffect(() => {
    setContent(JSON.parse(notification.content))
  }, [])

  return (
    <div
      className={cn(
        'flex gap-4 w-full p-2 pr-9 pl-3 relative',
        notification.checked && 'text-foreground/70',
        !notification.checked &&
          `before:bg-[#3ea6ff] before:rounded-full 
          before:h-3 before:w-3 before:absolute before:right-2 before:top-1/2 before:-translate-y-1/2`
      )}
    >
      {content && (
        <>
          {content.type === NotificationTypeEnum.FOLLOW_STORY && (
            <NotifyFollow notification={notification} content={content}>
              <p className="flex gap-1">
                <TimeAgo time={notification.createdAt} />
              </p>
            </NotifyFollow>
          )}
          {content.type === NotificationTypeEnum.LIKE_STORY && (
            <NotifyLike notification={notification} content={content}>
              <p className="flex gap-1">
                <TimeAgo time={notification.createdAt} />
              </p>
            </NotifyLike>
          )}
          {content.type === NotificationTypeEnum.COMMENT_NEW && (
            <NotifyCommentNew notification={notification} content={content}>
              <p className="flex gap-1">
                <TimeAgo time={notification.createdAt} />
              </p>
            </NotifyCommentNew>
          )}
          {content.type === NotificationTypeEnum.COMMENT_REPLY && (
            <NotifyCommentReply notification={notification} content={content}>
              <p className="flex gap-1">
                <TimeAgo time={notification.createdAt} />
              </p>
            </NotifyCommentReply>
          )}
        </>
      )}
    </div>
  )
}

export default NotificationItem
