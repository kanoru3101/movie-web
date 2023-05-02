import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import uaHeader from './lang/ua/header.json'
import enHeader from './lang/en/header.json'
import uaComponents from './lang/ua/components.json'
import enComponents from './lang/en/components.json'
import uaPages from './lang/ua/pages.json'
import enPages from './lang/en/pages.json'
import { LANGUAGES } from '../../constants'
import { getCookie } from '../../services/cookie'

const resources = {
  en: {
    translation: {
      ...enHeader,
      ...enComponents,
      ...enPages
    }
  },
  ua: {
    translation: {
      ...uaHeader,
      ...uaComponents,
      ...uaPages
    }
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: LANGUAGES.EN,
    lng: (getCookie('language') || localStorage.getItem('language') || localStorage.getItem('i18nextLng')) as LANGUAGES,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
