import { ChapterCreate } from '@/types/chapterType'
import http from '@/utils/http'

const PREV_URL = '/chapters'
export const ChapterKey = 'chapters'

const ChapterServices = {
  create: (data: ChapterCreate) => {
    return http.post(PREV_URL, data)
  },
}

export default ChapterServices
