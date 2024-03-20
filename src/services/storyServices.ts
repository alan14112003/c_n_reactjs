import http from '@/utils/http'

const PREV_URL = '/stories'
export const StoryKey = 'stories'

const storyServices = {
  all: (options: any) => {
    return http.get(PREV_URL, {
      params: options,
    })
  },
}

export default storyServices
