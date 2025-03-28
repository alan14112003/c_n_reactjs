import AuthService from '@/services/authServices'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getTokenLS, setTokenLS } from './authLS'
import { sendEvent } from './event'

const BASE_URL = `${import.meta.env.VITE_API_URL}/v1`

const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

http.interceptors.request.use((request) => {
  const accessToken = getTokenLS()

  if (!request.headers['Content-Type']) {
    request.headers['Content-Type'] = 'application/json'
  }

  request.headers.Authorization = 'Bearer ' + accessToken
  return request
})

http.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (axios.isAxiosError(error)) {
      if (error.request.responseURL.includes('auth/refresh')) {
        sendEvent('auth:redirectLogin', null)
        toast.error(error.response?.data.message)
        return Promise.reject(error)
      }

      if (error.response?.data?.code === 'auth.token_expired') {
        try {
          const res = await AuthService.refresh()
          const data = res.data
          setTokenLS(data.accessToken)

          if (error.config?.headers) {
            error.config.headers.Authorization = 'Bearer ' + data.accessToken
            return axios.request(error.config)
          }
        } catch (err) {
          return Promise.reject(err)
        }
      }
    }
    return Promise.reject(error)
  }
)

export default http
