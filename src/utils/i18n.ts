import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(Backend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('i18nextLng') ?? 'vi',
    fallbackLng: 'vi',
    debug: true,
  })

interface Languages {
  [key: string]: string // This is an index signature
}

export const languages: Languages = {
  en: 'English',
  vi: 'Tiếng Việt',
}

export default i18n
