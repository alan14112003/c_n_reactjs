import { ChapterQuery } from '@/types/chapterType'
import { StoryCreate } from '@/types/storyType'
import http from '@/utils/http'

const PREV_URL = '/stories'
export const StoryKey = 'stories'
// Hàm delay
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

const storyServices = {
  all: async (options: any) => {
    await delay(2000)
    return http.get(PREV_URL, {
      params: options,
    })
  },

  allByAuth: async (options: any) => {
    await delay(2000)
    return http.get(PREV_URL + '/auth', {
      params: options,
    })
  },

  getByAuth: async (slug: string, id: string) => {
    await delay(2000)
    return http.get(PREV_URL + `/auth/${slug}.-.${id}`)
  },

  chaptersByAuth: async ({
    storySlug,
    storyId,
    order = 'desc',
  }: ChapterQuery) => {
    await delay(2000)
    return http.get(
      PREV_URL + `/auth/${storySlug}.-.${storyId}/chapters?order=${order}`
    )
  },

  create: async (data: StoryCreate) => {
    return http.post(PREV_URL, data)
  },
}

export default storyServices
