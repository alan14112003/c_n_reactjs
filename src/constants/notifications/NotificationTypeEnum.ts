enum NotificationTypeEnum {
  COMMENT_NEW = 1,
  COMMENT_REPLY = 5,
  LIKE_STORY = 10,
  FOLLOW_STORY = 40,
  TRANSACTION_HISTORY_IN = 20,
}

namespace NotificationTypeEnum {
  export function allNames(): { [key: number]: string } {
    return {
      [NotificationTypeEnum.COMMENT_NEW]: 'bình luận',
      [NotificationTypeEnum.COMMENT_REPLY]: 'trả lời bình luận',
      [NotificationTypeEnum.LIKE_STORY]: 'thích truyện',
      [NotificationTypeEnum.TRANSACTION_HISTORY_IN]: 'xác nhận nạp tiền',
      [NotificationTypeEnum.FOLLOW_STORY]: 'theo dõi truyện',
    }
  }

  export function getNameByValue(value: NotificationTypeEnum): string {
    const names = allNames()
    return names[value]
  }
}

export default NotificationTypeEnum
