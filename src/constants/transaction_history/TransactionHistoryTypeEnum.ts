enum TransactionHistoryTypeEnum {
  IN = 10,
  OUT = 200,
}

namespace TransactionHistoryTypeEnum {
  export function allNames(): { [key: number]: string } {
    return {
      [TransactionHistoryTypeEnum.IN]: 'cms:transaction_history.in',
      [TransactionHistoryTypeEnum.OUT]: 'cms:transaction_history.out',
    }
  }

  export function getNameByValue(value: TransactionHistoryTypeEnum): string {
    const names = allNames()
    return names[value]
  }
}

export default TransactionHistoryTypeEnum
