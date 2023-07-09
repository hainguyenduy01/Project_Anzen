import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import EN_TRANSTALTE from './locales/en/translate';
import VI_TRANSTALTE from './locales/vi/translate';
const resources = {
	en: { translation: EN_TRANSTALTE },
	vi: { translation: VI_TRANSTALTE },
};
i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		detection: {
			order: ['querystring', 'cookie', 'localStorage', 'navigate'],
			lookupQuerystring: 'lng',
			lookupCookie: 'lang',
			lookupLocalStorage: 'lang',
			caches: ['cookie', 'localStorage'],
		},
		lng: 'vi',
		debug: true,
		interpolation: {
			escapeValue: false,
		},
	});
export default i18n;
