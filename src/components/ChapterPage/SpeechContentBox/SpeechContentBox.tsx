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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import {
  Pause,
  Play,
  RefreshCcw,
  Speech,
  StepBack,
  StepForward,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const RATE_LIST = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

const SpeechContentBox = () => {
  const { t } = useTranslation(['chapter_page'])

  const { chapterId } = useParams()

  const [isPaused, setIsPaused] = useState(false)
  const [isStoped, setIsStoped] = useState(true)
  const [isFirstPlay, setIsFirstPlay] = useState(true) // Cờ kiểm tra lần chạy đầu tiên
  const [chapterContentTagsName, setChapterContentTagsName] = useState<
    Element[]
  >([])
  const [index, setIndex] = useState(0)
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  )
  const [pitch, setPitch] = useState(1)
  const [rate, setRate] = useState(1)
  const [volume, setVolume] = useState(1)

  // reset all state
  useEffect(() => {
    setIsStoped(true)
    setIsFirstPlay(true)
    setIndex(0)

    const chapterContentTags = document.querySelectorAll('#chapter-content *')
    if (chapterContentTags) {
      const filteredElements = Array.from(chapterContentTags).filter(
        (element) => element.children.length === 0 && element.textContent !== ''
      )

      setChapterContentTagsName(filteredElements)
    }
  }, [chapterId])

  const unActiveText = () => {
    const className = 'bg-primary/50 font-semibold'
    chapterContentTagsName.forEach((chapterContentTagsNameItem) => {
      chapterContentTagsNameItem.classList.remove(...className.split(' '))
    })
  }

  const activeText = () => {
    const className = 'bg-primary/50 font-semibold'
    unActiveText()

    chapterContentTagsName[index].className = className
    chapterContentTagsName[index].scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (
      index < chapterContentTagsName.length &&
      chapterContentTagsName.length > 0
    ) {
      const u = new SpeechSynthesisUtterance(
        chapterContentTagsName[index].textContent ?? ''
      )

      setUtterance(u)

      // Nếu là lần chạy đầu tiên và nút Play đã được ấn, thì bắt đầu đọc đoạn hiện tại
      if (!isFirstPlay) {
        handlePlay(u)
      }
    }

    return () => {
      const synth = window.speechSynthesis
      synth.cancel()
    }
  }, [chapterContentTagsName, index])

  const handleNextUtterance = () => {
    if (index < chapterContentTagsName.length - 1) {
      setIndex((prevIndex) => prevIndex + 1) // Tăng index lên để đọc đoạn tiếp theo
    }
  }

  const handlePlay = (u?: SpeechSynthesisUtterance) => {
    const synth = window.speechSynthesis

    activeText()

    if (isPaused) {
      synth.resume()
      setIsPaused(false)
    }

    if (u) {
      u.lang = 'vi-VN'
      u.pitch = pitch
      u.rate = rate
      u.volume = volume
      u.onend = handleNextUtterance
      synth.speak(u)
    } else if (utterance) {
      utterance.lang = 'vi-VN'
      utterance.pitch = pitch
      utterance.rate = rate
      utterance.volume = volume
      utterance.onend = handleNextUtterance
      synth.speak(utterance)
    }

    if (isStoped) {
      setIsFirstPlay(false) // Đánh dấu đã chạy lần đầu tiên
      setIsStoped(false)
    }
  }

  const handlePause = () => {
    const synth = window.speechSynthesis

    synth.pause()

    setIsPaused(true)
  }

  const handleStop = (isStopReal?: boolean) => {
    const synth = window.speechSynthesis

    unActiveText()

    synth.cancel()

    setIsStoped(true)

    if (isStopReal) {
      setIsFirstPlay(true)
    }
  }

  const handlePrev = () => {
    handleStop()
    setIndex(index - 1 >= 0 ? index - 1 : 0)
  }

  const handleNext = () => {
    handleStop()
    setIndex(index + 1)
  }

  const handlePitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPitch(parseFloat(event.target.value))
  }

  const handleRateChange = (value: string) => {
    setRate(parseFloat(value))
  }

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(event.target.value))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Speech />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="dark:text-primary-foreground w-full">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              {t('chapter_page:speech_content.title')}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t('chapter_page:speech_content.descriptions')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isPaused || isStoped ? (
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
                onClick={handlePause}
              >
                <Pause />
              </Button>
            )}
            <Button
              variant={'link'}
              size="icon"
              className="rounded-full dark:text-primary-foreground"
              onClick={() => {
                handleStop(true)
              }}
            >
              <RefreshCcw />
            </Button>
            <Button
              variant={'link'}
              size="icon"
              className="rounded-full dark:text-primary-foreground"
              onClick={handlePrev}
            >
              <StepBack />
            </Button>
            <Button
              variant={'link'}
              size="icon"
              className="rounded-full dark:text-primary-foreground"
              onClick={handleNext}
            >
              <StepForward />
            </Button>

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

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={pitch}
                    onChange={handlePitchChange}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  {t('chapter_page:speech_content.pitch')}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  {t('chapter_page:speech_content.volume')}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default SpeechContentBox
