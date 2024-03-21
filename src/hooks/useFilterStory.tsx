import { StoriesQuery } from '@/types/storyType'
import { useNavigate } from 'react-router-dom'
import { isUndefined, omitBy } from 'lodash'

export default function useFilterStory() {
  const navigate = useNavigate()

  return (storyFilter: StoriesQuery) => {
    const filteredOptions = omitBy(storyFilter, isUndefined)
    navigate(
      `?${Object.keys(filteredOptions)
        .map(
          (filterKey, index, arr) =>
            `${filterKey}=${filteredOptions[filterKey]}${
              index < arr.length - 1 ? '&' : ''
            }`
        )
        .join('')}`
    )
  }
}
