import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en.json';
import vi from './locales/vi.json';
import es from './locales/es.json';
import ja from './locales/ja.json';
import zh from './locales/zh.json';
import ko from './locales/ko.json';

const LANGUAGE_PERSISTENCE_KEY = 'user-language';

const resources = {
  en: { translation: en },
  vi: { translation: vi },
  es: { translation: es },
  ja: { translation: ja },
  zh: { translation: zh },
  ko: { translation: ko },
};

const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (locales && locales.length > 0) {
    return locales[0].languageCode;
  }
  return 'en';
};

const initI18n = async () => {
  const persisted = await AsyncStorage.getItem(LANGUAGE_PERSISTENCE_KEY);
  const lng = persisted || getDeviceLanguage() || 'en';

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng,
      fallbackLng: 'en',
      compatibilityJSON: 'v3',
      interpolation: {
        escapeValue: false,
      },
      react: { useSuspense: false },
    });
};

initI18n();

export const changeAppLanguage = async (lng) => {
  try {
    await i18n.changeLanguage(lng);
    await AsyncStorage.setItem(LANGUAGE_PERSISTENCE_KEY, lng);
  } catch (err) {
    console.warn('Unable to change language', err);
  }
};

export default i18n;
