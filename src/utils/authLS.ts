import { AuthResponse, AuthType } from '@/types/authType'

const AUTH_LS_KEY = {
  accessToken: 'at',
  user: 'usr',
}

export const getTokenLS = () => {
  return localStorage.getItem(AUTH_LS_KEY.accessToken) || ''
}

export const setTokenLS = (accessToken: string) => {
  localStorage.setItem(AUTH_LS_KEY.accessToken, accessToken)
}

export const getUserLS = (): AuthType | null => {
  const user = localStorage.getItem(AUTH_LS_KEY.user)
  return user ? JSON.parse(user) : null
}

export const setAuthLS = (authResponse: AuthResponse) => {
  const { accessToken, ...user } = authResponse
  localStorage.setItem(AUTH_LS_KEY.accessToken, accessToken)
  localStorage.setItem(AUTH_LS_KEY.user, JSON.stringify(user))
}

export const resetAuthLS = () => {
  localStorage.removeItem(AUTH_LS_KEY.accessToken)
  localStorage.removeItem(AUTH_LS_KEY.user)
}
