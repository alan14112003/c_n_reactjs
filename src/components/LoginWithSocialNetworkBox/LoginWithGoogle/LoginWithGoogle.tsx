import { useAppDispatch } from '@/app/hooks'
import { updateAuth } from '@/features/auth/authSlice'
import useGoogleLogin from '@/hooks/useGoogleLogin'
import AuthServices from '@/services/authServices'
import { AuthResponse } from '@/types/authType'
import { setAuthLS } from '@/utils/authLS'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginWithGoogle = () => {
  const dispatch = useAppDispatch()

  const mutation = useMutation({
    mutationFn: AuthServices.loginGoogle,
  })

  const navigate = useNavigate()
  const { t } = useTranslation('authentication')

  const callback = async (
    value: google.accounts.id.CredentialResponse
  ): Promise<void> => {
    try {
      const res = await mutation.mutateAsync({ token: value.credential })
      const data: AuthResponse = res.data
      const { accessToken, ...auth } = data

      dispatch(
        updateAuth({
          isAuthenticated: true,
          user: auth,
        })
      )

      setAuthLS(data)
      toast.success(t('login_success'))

      setTimeout(() => {
        console.log('redirect')

        navigate('/')
      }, 1000)
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error<string>(`${error.response?.data}`)
        return
      }
      console.log(error)
    }
  }

  const googleLoginButton = useGoogleLogin({
    clientId:
      '784916241478-silgai1j4pgok93fhfdlc0hg7rf50un0.apps.googleusercontent.com',
    callback: callback,
  })

  return <>{googleLoginButton}</>
}

export default LoginWithGoogle
