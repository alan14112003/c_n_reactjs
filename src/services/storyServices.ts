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
}

export default storyServices
