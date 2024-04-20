import { TransactionHisTory } from '@/types/transactionHisToryType'
import { FC, useEffect, useState } from 'react'
import Image from '../Image'

type ScanQRPaymentBoxProp = {
  transactionHistory: TransactionHisTory
}

const ScanQRPaymentBox: FC<ScanQRPaymentBoxProp> = ({ transactionHistory }) => {
  const [urlImage, setUrlImage] = useState('')

  useEffect(() => {
    const money = (transactionHistory.money / 2) * 1000
    const content = `II${transactionHistory.code}${transactionHistory.id}OO`
    const url = `https://api.vieqr.com/vietqr/Vietcombank/1023048373/${money}/qr_only.jpg?NDck=${content}&FullName=Nguyen%20Ngoc%20Son`
    setUrlImage(url)
  }, [])

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-secondary/50 z-50 flex justify-center items-center p-10">
      {urlImage && (
        <>
          <Image
            src={urlImage}
            alt={`for transaction ${transactionHistory.id}`}
            className="h-full"
          />
        </>
      )}
    </div>
  )
}

export default ScanQRPaymentBox
