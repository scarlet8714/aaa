import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import zhTW from './locales/zh-TW.json';
import en from './locales/en.json';

i18n
  // 自動偵測瀏覽器語系 (例如使用者的系統是英文，就預設給英文)
  .use(LanguageDetector)
  // 將 i18next 傳入 react-i18next 模組
  .use(initReactI18next)
  // 初始化設定
  .init({
    resources: {
      'zh-TW': { translation: zhTW },
      en: { translation: en },
    },
    fallbackLng: 'zh-TW', // 如果偵測到的語系不支援，預設使用繁中
    interpolation: {
      escapeValue: false, // React 本身就會防範 XSS，所以這裡設為 false
    },
  });

export default i18n;