import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import AuthService from '@/services/authServices'
import { useAppDispatch } from '@/app/hooks'
import { updateAuth } from '@/features/auth/authSlice'
import { setAuthLS } from '@/utils/authLS'
import { AuthResponse } from '@/types/authType'
import { useTranslation } from 'react-i18next'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const LoginPage = () => {
  const dispatch = useAppDispatch()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const mutation = useMutation({
    mutationFn: AuthService.login,
  })

  const { t } = useTranslation(['authentication', 'response_code'])

  const navigate = useNavigate()

  const historyState = useLocation().state

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await mutation.mutateAsync(values)
      const data: AuthResponse = res.data
      const { accessToken, ...auth } = data

      dispatch(
        updateAuth({
          isAuthenticated: true,
          user: auth,
        })
      )

      setAuthLS(data)
      toast.success('đăng nhập thành công')

      setTimeout(() => {
        console.log('redirect')

        if (historyState?.dontBack) {
          navigate('/')
          return
        }

        navigate(-1)
      }, 1000)
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          `${
            error.response?.data?.code
              ? t<any, {}, null>(`response_code:${error.response.data.code}`)
              : error.response?.statusText
          }`
        )
        console.log('123')

        return
      }
      console.log(error)
    }
  }

  const onRedirectToCreateAccount = () => {
    navigate('/register')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={t('password_field')}
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {t('login_btn')}
        </Button>
        <div className="w-full flex justify-evenly mb-4 border-b">
          <Button type="button" variant="link">
            <Link to="/forgot-password">{t('forgotten_password')}?</Link>
          </Button>
          <Button type="button" variant="link">
            <Link to="/active-account">{t('active_account')}?</Link>
          </Button>
        </div>
        <div className="w-full flex justify-center">
          <Button
            type="button"
            variant="success"
            onClick={onRedirectToCreateAccount}
          >
            {t('create_account')}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default LoginPage
