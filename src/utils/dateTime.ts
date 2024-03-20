import moment from 'moment'

type GetTimeAgoReturn = { key: string | null; value: number | string | null }

export const getTimeAgo = (time: string): GetTimeAgoReturn => {
  const previousTime = moment(time)
  const currentTime = moment()
  const duration = moment.duration(currentTime.diff(previousTime))

  // Nếu thời gian trước đó là trong vòng 1 phút, trả về "vừa mới"
  if (duration.asMinutes() < 1) {
    return {
      key: 'time_ago.now',
      value: null,
    }
  }

  // Nếu thời gian trước đó là trong vòng 1 giờ, trả về số phút trước
  if (duration.asHours() < 1) {
    return {
      key: 'time_ago.minutes',
      value: Math.floor(duration.asMinutes()),
    }
  }

  // Nếu thời gian trước đó là trong vòng 1 ngày, trả về số giờ trước
  if (duration.asDays() < 1) {
    return {
      key: 'time_ago.hours',
      value: Math.floor(duration.asHours()),
    }
  }

  // Nếu thời gian trước đó là trong vòng 1 tuần, trả về số ngày trước
  if (duration.asWeeks() < 1) {
    return {
      key: 'time_ago.days',
      value: Math.floor(duration.asDays()),
    }
  }

  // Nếu thời gian trước đó là trong vòng 1 tháng, trả về số tuần trước
  if (duration.asMonths() < 1) {
    return {
      key: 'time_ago.weeks',
      value: Math.floor(duration.asWeeks()),
    }
  }

  // Nếu không thuộc các trường hợp trên, trả về ngày đăng
  return {
    key: null,
    value: previousTime.format('DD/MM/YYYY'),
  }
}
