import { Search } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useTranslation } from 'react-i18next'

type SearchBoxProps = {
  onSubmit: (value: string) => void
  onInput?: (value: string) => void
}

const SearchBox = ({ onSubmit, onInput }: SearchBoxProps) => {
  const { t } = useTranslation('cms')
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSubmit(searchValue)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)

    if (onInput) {
      onInput(value)
    }
  }

  return (
    <form className="flex items-center " onSubmit={handleSearch}>
      <Input
        type="text"
        className="flex-grow pr-12 rounded-full py-2 px-5 w-[400px] h-10"
        placeholder={t('header.search_placeholder')}
        value={searchValue}
        onInput={handleInput}
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
