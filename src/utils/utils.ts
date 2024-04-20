import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { vi, enGB } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  })
}

export const getLocateDate = () => {
  const localeKey = localStorage.getItem('i18nextLng') ?? 'vi'
  switch (localeKey) {
    case 'en':
      return enGB
    default:
      return vi
  }
}

export const moneyFormat = (money: number) => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })

  return formatter.format(money)
}
