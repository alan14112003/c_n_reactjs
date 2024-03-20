import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import UserGenderEnum from '@/constants/users/UserGenderEnum'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ACTIVE_ACCOUNT_KEY } from '../ActiveAccountPage/ActiveAccountPage'
import AuthServices from '@/services/authServices'
import { useTranslation } from 'react-i18next'

const formSchema = z
  .object({
    firstName: z
      .string({
        required_error: 'họ là bắt buộc nhập',
      })
      .min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
    rePassword: z.string().min(1),
    gender: z.string(),
  })
  .required()

const RegisterPage = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: '',
      gender: UserGenderEnum.SECRET.toString(),
    },
  })

  const mutation = useMutation({
    mutationFn: AuthServices.register,
  })

  const navigate = useNavigate()
  const { t } = useTranslation('authentication')

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { rePassword, ...body } = values

      if (body.password !== rePassword) {
        toast.error(t('repass_not_match'))
        return
      }

      const res = await mutation.mutateAsync(body)
      const data = res.data

      toast.success(data)
      localStorage.setItem(ACTIVE_ACCOUNT_KEY, values.email)

      setTimeout(() => {
        console.log('redirect')

        navigate('/active-account')
      }, 1000)
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error<string>(`${error.response?.data}`)
        return
      }
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t('first_name_field')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t('last_name_field')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={t('repass_field')}
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Gender_field')}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(UserGenderEnum.allName()).map((key) => {
                    return (
                      <SelectItem key={key} value={key}>
                        {UserGenderEnum.allName()[Number(key)]}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center flex-col">
          <Button type="submit" variant="success" className="px-10">
            {t('register_btn')}
          </Button>
          <Button type="button" variant="link" className="w-fit p-0">
            <Link to="/login" state={{ dontBack: true }}>
              {t('has_account')}
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default RegisterPage
