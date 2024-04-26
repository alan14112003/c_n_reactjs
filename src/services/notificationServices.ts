import http from '@/utils/http'

const PREV_URL = '/notifications'
export const NotificationKey = 'notifications'

const NotificationServices = {
  all: () => {
    return http.get(PREV_URL)
  },
}

export default NotificationServices
