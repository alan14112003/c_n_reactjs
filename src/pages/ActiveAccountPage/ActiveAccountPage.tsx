import FormHandleActive from '@/components/FormActiveAccount/FormHandleActive'
import FormRequestActive from '@/components/FormActiveAccount/FormRequestActive'
import { useState } from 'react'

export const ACTIVE_ACCOUNT_KEY = 'ACTIVE_ACCOUNT_KEY_EMAIL'

const ActiveAccountPage = () => {
  // 1. Define your form.
  const [email, setEmail] = useState(
    localStorage.getItem(ACTIVE_ACCOUNT_KEY) ?? ''
  )

  return (
    <>
      {!email && <FormRequestActive setEmail={setEmail} />}
      {email && <FormHandleActive email={email} setEmail={setEmail} />}
    </>
  )
}

export default ActiveAccountPage
