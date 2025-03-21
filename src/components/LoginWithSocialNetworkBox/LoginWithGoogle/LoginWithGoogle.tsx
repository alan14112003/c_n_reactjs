import { useAppDispatch } from '@/app/hooks'
import { updateAuth } from '@/features/auth/authSlice'
import useGoogleLogin from '@/hooks/useGoogleLogin'
import AuthServices from '@/services/authServices'
import { AuthResponse } from '@/types/authType'
import { setAuthLS } from '@/utils/authLS'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginWithGoogle = () => {
  const dispatch = useAppDispatch()

  const mutation = useMutation({
    mutationFn: AuthServices.loginGoogle,
  })

  const navigate = useNavigate()
  const historyState = useLocation().state

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

        if (historyState?.dontBack) {
          navigate('/')
          return
        }

        navigate(-1)
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
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    callback: callback,
  })

  return <>{googleLoginButton}</>
}

export default LoginWithGoogle
