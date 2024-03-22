import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  selectStoryFilter,
  updateStoryFilter,
} from '@/features/stories/storyFilterSlide'
import useFilterStory from '@/hooks/useFilterStory'

const SearchBox = () => {
  const { t } = useTranslation('cms')
  const storyFilter = useAppSelector(selectStoryFilter)
  const [searchValue, setSearchValue] = useState(storyFilter.key)
  const dispatch = useAppDispatch()
  const filterStoryNavigate = useFilterStory()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      updateStoryFilter({
        key: searchValue,
        page: 1,
      })
    )

    filterStoryNavigate({
      ...storyFilter,
      key: searchValue,
      page: 1,
    })
  }

  useEffect(() => {
    setSearchValue(storyFilter.key)
  }, [storyFilter.key])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setSearchValue(value)
  }

  return (
    <form className="flex items-center " onSubmit={handleSearch}>
      <Input
        type="text"
        className="flex-grow pr-12 rounded-full py-2 px-5 w-[400px] h-10"
        placeholder={t('header.search_placeholder')}
        value={searchValue}
        onChange={handleChange}
      />
      <Button
        type="submit"
        size="icon"
        variant="link"
        className="-ml-12 relative p-[6px] before:left-[-1px] before:absolute before:w-[1px] before:bg-primary before:opacity-30 before:top-2 before:bottom-2"
      >
        <Search />
      </Button>
    </form>
  )
}

export default SearchBox
