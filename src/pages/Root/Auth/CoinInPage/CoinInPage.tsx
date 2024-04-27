import TransactionHistoryTypeEnum from '@/constants/transaction_history/TransactionHistoryTypeEnum'
import TransactionHistoryServices from '@/services/transactionHistoryServices'
import { alertErrorAxios } from '@/utils/alert'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { moneyFormat } from '@/utils/utils'
import { CircleDollarSign } from 'lucide-react'
import { useState } from 'react'
import { TransactionHisTory } from '@/types/transactionHisToryType'
import ScanQRPaymentBox from '@/components/ScanQRPaymentBox'

const formSchema = z.object({
  money: z.number(),
  type: z.number(),
})

const CoinInPage = () => {
  const { t } = useTranslation(['response_code'])
  const [loading, setLoading] = useState(false)
  const [transactionHisTory, setTransactionHistory] =
    useState<TransactionHisTory | null>(null)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: TransactionHistoryTypeEnum.IN,
    },
  })

  const moneyList = Array.from({ length: 10 }, (_, i) => (i + 1) * 20)

  const mutation = useMutation({
    mutationFn: TransactionHistoryServices.insert,
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const { data } = await mutation.mutateAsync(values)
      setTransactionHistory(data)
    } catch (error) {
      alertErrorAxios(error, t)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl capitalize font-bold">Nhận xu</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="money"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      form.setValue('money', +value)
                    }}
                    defaultValue={`${field.value}`}
                    className="gird grid-cols-5 gap-16"
                  >
                    {moneyList.map((moneyItem) => {
                      const price = moneyItem * 2
                      const moneyReal = moneyItem * 1000
                      return (
                        <FormItem key={moneyItem}>
                          <RadioGroupItem
                            value={`${price}`}
                            id={`money-${moneyItem}`}
                            className="hidden"
                          />
                          <FormLabel
                            htmlFor={`money-${moneyItem}`}
                            className={`
                              border flex flex-col gap-2 justify-center items-center cursor-pointer
                              min-h-24 rounded-md
                              ${field.value === price && 'border-primary'}
                            `}
                          >
                            <h3 className="text-2xl flex items-center gap-1">
                              <span>{price}</span>
                              <CircleDollarSign />
                            </h3>
                            <p>{moneyFormat(moneyReal)}</p>
                          </FormLabel>
                        </FormItem>
                      )
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-6">
            <Button disabled={loading}>Nạp tiền</Button>
          </div>
        </form>
      </Form>
      {transactionHisTory && (
        <ScanQRPaymentBox transactionHistory={transactionHisTory} />
      )}
    </div>
  )
}

export default CoinInPage
