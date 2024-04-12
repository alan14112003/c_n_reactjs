import { isAxiosError } from 'axios'
import { TFunction } from 'i18next'
import { toast } from 'react-toastify'

export const alertErrorAxios = (
  error: unknown,
  t: TFunction<any, undefined>
) => {
  if (isAxiosError(error)) {
    if (error.response) {
      toast.error(
        `${
          error.response.data?.code
            ? t<any, {}, null>(`response_code:${error.response.data.code}`)
            : error.response.statusText
        }`
      )
      return
    }
    toast.error(error.message)
    return
  }
  console.log(error)
}
