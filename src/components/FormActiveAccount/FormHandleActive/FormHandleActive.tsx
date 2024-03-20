import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ACTIVE_ACCOUNT_KEY } from '@/pages/ActiveAccountPage/ActiveAccountPage'
import AuthServices from '@/services/authServices'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

const formSchema = z
  .object({
    code: z.string(),
  })
  .required()

type FormHandleActiveProp = {
  email: string
  setEmail: (value: string) => void
}

const FormHandleActive = ({ email, setEmail }: FormHandleActiveProp) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  })

  const mutation = useMutation({
    mutationFn: AuthServices.handleActive,
  })

  const navigate = useNavigate()
  const { t } = useTranslation(['authentication', 'response_code'])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const body = { ...values, email: email }
      console.log(body)
      const res = await mutation.mutateAsync(body)
      const data = res.data

      toast.success(t<any, {}, null>(`response_code:${data.code}`))
      localStorage.removeItem(ACTIVE_ACCOUNT_KEY)

      setTimeout(() => {
        console.log('redirect')

        navigate('/login', {
          state: {
            dontBack: true,
          },
        })
      }, 1000)
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error<string>(
          t<any, {}, null>(`response_code:${error.response?.data}`)
        )
        return
      }
      console.log(error)
    }
  }

  const onRollback = () => {
    localStorage.removeItem(ACTIVE_ACCOUNT_KEY)
    setEmail('')
  }

  const onCancel = () => {
    localStorage.removeItem(ACTIVE_ACCOUNT_KEY)
    navigate('/login', {
      state: {
        dontBack: true,
      },
    })
  }

  return (
    <Card className="w-[450px] max-w-full mx-auto">
      <CardHeader>
        <CardTitle className="border-b pb-5">{t('input_code')}</CardTitle>
        <CardDescription>{t('please_check_code')}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center">
                  <FormControl className="w-1/2">
                    <Input placeholder={t('input_code')} {...field} />
                  </FormControl>
                  <FormDescription className="w-1/2">
                    {t('has_send_code')} {email}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="link"
              onClick={onRollback}
              className="px-0"
            >
              {t('dont_have_code')}
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={onCancel}>
                {t('cancel_btn')}
              </Button>
              <Button type="submit">{t('next_btn')}</Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default FormHandleActive
