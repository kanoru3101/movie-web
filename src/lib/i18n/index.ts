import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uaHeader from './lang/ua/header.json'
import enHeader from './lang/en/header.json'
import uaComponents from './lang/ua/components.json';
import enComponents from './lang/en/components.json';
import uaPages from './lang/ua/pages.json';
import enPages from './lang/en/pages.json';

const resources = {
  en: {
    translation: {
      ...enHeader,
      ...enComponents,
      enPages
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

//const [user] = useUser()

//const defaultUserLanguage = user?.language || 'en'

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ua',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
