import { useTranslation } from 'react-i18next'
import LoginWithGoogle from './LoginWithGoogle'

const LoginWithSocialNetworkBox = () => {
  const { t } = useTranslation('authentication')
  return (
    <div className="mb-3">
      <div className="flex justify-center items-center mb-3">
        <LoginWithGoogle />
      </div>
      <p className="w-full flex justify-center items-center gap-4 relative before:w-[40%] before:h-[0.5px] before:bg-[hsl(var(--border))] after:w-[40%] after:h-[0.5px] after:bg-[hsl(var(--border))] ">
        {t('then_login')}
      </p>
    </div>
  )
}

export default LoginWithSocialNetworkBox
