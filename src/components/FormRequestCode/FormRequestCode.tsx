import AuthServices from '@/services/authServices'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { toast } from 'react-toastify'
import RequestCodeEnum from '@/constants/users/RequestCodeEnum'
import { isAxiosError } from 'axios'
import { useTranslation } from 'react-i18next'

const formSchema = z.object({
  email: z.string().email(),
})

type FormRequestCodeProp = {
  typeCode: RequestCodeEnum
  handleSuccess: (...args: any) => void
}

const FormRequestCode = ({ typeCode, handleSuccess }: FormRequestCodeProp) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const mutation = useMutation({
    mutationFn: AuthServices.requestCode,
  })

  const { t } = useTranslation(['authentication', 'response_code'])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const body = { ...values, type: typeCode }
      const res = await mutation.mutateAsync(body)
      const data = res.data

      toast.success(t<any, {}, null>(`response_code:${data.code}`))
      handleSuccess(values)
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error<string>(
          t<any, {}, null>(`response_code:${error.response?.data.code}`)
        )
        return
      }
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t('email_field')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">{t('next_btn')}</Button>
        </div>
      </form>
    </Form>
  )
}

export default FormRequestCode
