import { TransactionHisTory } from '@/types/transactionHisToryType'
import { FC, useEffect, useState } from 'react'
import Image from '../Image'
import { socket } from '@/utils/socket'
import NotificationEvent from '@/constants/events/NotificationEvent'
import { Notification, NotificationContent } from '@/types/notificationType'
import NotificationTypeEnum from '@/constants/notifications/NotificationTypeEnum'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/app/hooks'
import { updateBalanceUser } from '@/features/auth/authSlice'
import { getUserLS, setBalanceUserLS } from '@/utils/authLS'

type ScanQRPaymentBoxProp = {
  transactionHistory: TransactionHisTory
}

const ScanQRPaymentBox: FC<ScanQRPaymentBoxProp> = ({ transactionHistory }) => {
  const [urlImage, setUrlImage] = useState('')

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const money = (transactionHistory.money / 2) * 1000
    const content = `II${transactionHistory.code}${transactionHistory.id}OO`
    const url = `https://api.vieqr.com/vietqr/Vietcombank/1023048373/${money}/compact2.jpg?NDck=${content}&FullName=Nguyen%20Ngoc%20Son`
    setUrlImage(url)
  }, [])

  // bắt sự kiện chuyển khoản và thay đổi giá trị tiền tệ của user
  useEffect(() => {
    const handleNotificationEventNew = (notification: Notification) => {
      const notificationContent: NotificationContent = JSON.parse(
        notification.content
      )

      if (
        notificationContent.type !== NotificationTypeEnum.TRANSACTION_HISTORY_IN
      ) {
        return
      }

      if (notificationContent.transactionHistory.id === transactionHistory.id) {
        return
      }

      const auth = getUserLS()
      const accountBalance = auth?.accountBalance ?? 0
      setBalanceUserLS(accountBalance + transactionHistory.money)

      dispatch(updateBalanceUser(accountBalance + transactionHistory.money))

      navigate('/')
    }

    socket.on(NotificationEvent.NEW, handleNotificationEventNew)

    return () => {
      socket.off(NotificationEvent.NEW, handleNotificationEventNew)
    }
  }, [transactionHistory])

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-secondary/50 z-50 flex justify-center items-center p-10">
      {urlImage && (
        <Image
          src={urlImage}
          alt={`for transaction ${transactionHistory.id}`}
          className="h-full"
        />
      )}
    </div>
  )
}

export default ScanQRPaymentBox
