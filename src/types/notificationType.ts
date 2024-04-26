import NotificationTypeEnum from '@/constants/notifications/NotificationTypeEnum'

export interface NotificationContent {
  type: NotificationTypeEnum
  [key: string]: any
}

export interface Notification {
  id: number
  checked: boolean
  avatar: string | null
  createdAt: Date
  content: string
}

export interface NotificationPaginate {
  total: number
  data: Notification[]
  curPage: number
  perPage: number
}
