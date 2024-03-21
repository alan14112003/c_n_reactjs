import { Search } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  selectStoryFilterKey,
  updateStoryFilter,
} from '@/features/stories/storyFilterSlide'

const SearchBox = () => {
  const { t } = useTranslation('cms')
  const storyFilterKey = useAppSelector(selectStoryFilterKey)
  const [searchValue, setSearchValue] = useState(storyFilterKey)
  const dispatch = useAppDispatch()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      updateStoryFilter({
        key: searchValue,
      })
    )
  }

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
