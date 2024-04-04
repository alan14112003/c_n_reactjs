import http from '@/utils/http'

const PREV_URL = '/chapters'
export const ChapterKey = 'chapters'

const ChapterServices = {
  all: () => {
    return http.get(PREV_URL)
  },
}

export default ChapterServices
