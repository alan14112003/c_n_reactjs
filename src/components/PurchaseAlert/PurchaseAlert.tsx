import { useAppDispatch } from '@/app/hooks'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { updateBalanceUser } from '@/features/auth/authSlice'
import { ChapterKey } from '@/services/chapterServices'
import PurchaseServices from '@/services/purchaseServices'
import { alertErrorAxios } from '@/utils/alert'
import { getUserLS, setBalanceUserLS } from '@/utils/authLS'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type PurchaseAlertProp = {
  price: number
  chapterId: string
}

const PurchaseAlert: FC<PurchaseAlertProp> = ({ chapterId, price }) => {
  const [load, setLoad] = useState(false)
  const { t } = useTranslation(['response_code'])
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  const buyChapterMutation = useMutation({
    mutationFn: PurchaseServices.buyChapter,
  })

  const hanldeCancel = () => {
    navigate(-1)
  }

  const handleContinue = async () => {
    setLoad(true)
    try {
      const { data } = await buyChapterMutation.mutateAsync({
        ChapterId: chapterId,
      })
      toast.success(t<any, {}, null>(data.code))

      queryClient.invalidateQueries({
        queryKey: [ChapterKey, 'get', chapterId],
      })

      const user = getUserLS()
      if (!user) {
        return
      }
      setBalanceUserLS(user.accountBalance - price)
      dispatch(updateBalanceUser(user.accountBalance - price))
    } catch (error) {
      alertErrorAxios(error, t)
    } finally {
      setLoad(false)
    }
  }

  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có muốn mua chương truyện này không?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Bạn phải chi {price} để mua chương này.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={hanldeCancel}>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue} disabled={load}>
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PurchaseAlert
