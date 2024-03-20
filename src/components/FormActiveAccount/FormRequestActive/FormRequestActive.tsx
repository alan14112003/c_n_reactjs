import { ACTIVE_ACCOUNT_KEY } from '@/pages/ActiveAccountPage/ActiveAccountPage'
import RequestCodeEnum from '@/constants/users/RequestCodeEnum'
import FormRequestCode from '@/components/FormRequestCode'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useTranslation } from 'react-i18next'

type FormRequestActiveProp = {
  setEmail: (value: string) => void
}

const FormRequestActive = ({ setEmail }: FormRequestActiveProp) => {
  const handleSuccess = (values: any) => {
    setEmail(values.email)
    localStorage.setItem(ACTIVE_ACCOUNT_KEY, values.email)
  }

  const { t } = useTranslation('authentication')

  return (
    <Card className="w-[400px] max-w-full mx-auto">
      <CardHeader>
        <CardTitle className="border-b pb-5">{t('active_account')}</CardTitle>
        <CardDescription>{t('please_input_email')}</CardDescription>
      </CardHeader>
      <CardContent>
        <FormRequestCode
          typeCode={RequestCodeEnum.ACTIVE}
          handleSuccess={handleSuccess}
        />
      </CardContent>
    </Card>
  )
}

export default FormRequestActive
