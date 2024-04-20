import TransactionHistoryTypeEnum from '@/constants/transaction_history/TransactionHistoryTypeEnum'

export interface TransactionHisTory {
  id: number
  money: number
  code: number
  UserId: number
  type: TransactionHistoryTypeEnum
  check: boolean
  createdAt: Date
}
