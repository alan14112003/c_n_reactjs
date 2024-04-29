import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Pause, Play, ScrollText } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const RATE_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const AutoScrollBox = () => {
  const { t } = useTranslation(['chapter_page'])

  const [isPaused, setIsPaused] = useState(true)
  const [rate, setRate] = useState(1)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>()

  const checkScrollEnd = () => {
    return (
      window.innerHeight + window.scrollY - 20 >= document.body.offsetHeight
    )
  }

  const handlePlay = () => {
    setIsPaused(false)
    const intervalId = setInterval(() => {
      window.scrollBy({ behavior: 'smooth', top: rate * 10 })
      if (checkScrollEnd()) {
        handlePause(intervalId)
      }
    }, 500)
    setIntervalId(intervalId)
  }

  const handlePause = (interId?: NodeJS.Timeout) => {
    if (interId) {
      clearInterval(interId)
    }
    if (intervalId) {
      clearInterval(intervalId)
    }
    setIsPaused(true)
  }

  const handleRateChange = (value: string) => {
    setRate(parseFloat(value))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <ScrollText />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="dark:text-primary-foreground w-full">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              {t('chapter_page:auto_scrool.title')}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t('chapter_page:auto_scrool.descriptions')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isPaused ? (
              <Button
                variant={'link'}
                size={'icon'}
                className="rounded-full dark:text-primary-foreground"
                onClick={() => {
                  handlePlay()
                }}
              >
                <Play />
              </Button>
            ) : (
              <Button
                variant={'link'}
                size="icon"
                className="rounded-full dark:text-primary-foreground"
                onClick={() => {
                  handlePause()
                }}
              >
                <Pause />
              </Button>
            )}

            <Select onValueChange={handleRateChange} defaultValue={`${rate}`}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="rate" />
              </SelectTrigger>
              <SelectContent>
                {RATE_LIST.map((rateVal) => (
                  <SelectItem key={rateVal} value={`${rateVal}`}>
                    {rateVal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default AutoScrollBox
