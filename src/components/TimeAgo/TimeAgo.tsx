import { getTimeAgo } from '@/utils/dateTime'
import { useTranslation } from 'react-i18next'

type TimeAgoProp = {
  time: string
}

const TimeAgo = ({ time }: TimeAgoProp) => {
  const { t } = useTranslation('cms')

  const timeAgo = getTimeAgo(time)

  return (
    <>
      {timeAgo.value ? timeAgo.value : ''}{' '}
      {timeAgo.key ? t<any, {}, null>(timeAgo.key) : ''}{' '}
    </>
  )
}

export default TimeAgo
