import TimeAgo from '@/components/TimeAgo'
import NotificationTypeEnum from '@/constants/notifications/NotificationTypeEnum'
import { Notification, NotificationContent } from '@/types/notificationType'
import { FC, useEffect, useState } from 'react'
import NotifyFollow from './NotifyFollow'
import { cn } from '@/utils/utils'
import NotifyLike from './NotifyLike'
import NotifyCommentNew from './NotifyCommentNew'
import NotifyCommentReply from './NotifyCommentReply'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationServices, {
  NotificationKey,
} from '@/services/notificationServices'
import { alertErrorAxios } from '@/utils/alert'
import { useTranslation } from 'react-i18next'
import NotifyBankIn from './NotifyBankIn'

type NotificationItemProp = {
  notification: Notification
}

const NotificationItem: FC<NotificationItemProp> = ({ notification }) => {
  const { t } = useTranslation(['response_code'])
  const [content, setContent] = useState<NotificationContent>()

  useEffect(() => {
    setContent(JSON.parse(notification.content))
  }, [])

  const checkedNotifyMutation = useMutation({
    mutationFn: NotificationServices.checked,
  })

  const queryClient = useQueryClient()

  const handleCheckedNotify = async () => {
    try {
      await checkedNotifyMutation.mutateAsync(notification.id)

      queryClient.invalidateQueries({
        queryKey: [NotificationKey],
      })
    } catch (error) {
      alertErrorAxios(error, t)
    }
  }

  return (
    <div
      className={cn(
        'flex gap-4 w-full p-2 pr-9 pl-3 relative',
        notification.checked && 'text-foreground/70',
        !notification.checked &&
          `before:bg-[#3ea6ff] before:rounded-full 
          before:h-3 before:w-3 before:absolute before:right-2 before:top-1/2 before:-translate-y-1/2`
      )}
      role="button"
      tabIndex={0}
      onClick={handleCheckedNotify}
      onKeyDown={() => {}}
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
          {content.type === NotificationTypeEnum.TRANSACTION_HISTORY_IN && (
            <NotifyBankIn notification={notification} content={content}>
              <p className="flex gap-1">
                <TimeAgo time={notification.createdAt} />
              </p>
            </NotifyBankIn>
          )}
        </>
      )}
    </div>
  )
}

export default NotificationItem
