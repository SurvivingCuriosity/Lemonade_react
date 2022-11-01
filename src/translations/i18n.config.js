import global_es from '../translations/es/global.json'
import global_en from '../translations/en/global.json'


export const i18n = {
  interpolation: { escapeValue: false },
  lng: localStorage.getItem('lang') || 'es',
  resources: {
    es: {
      global: global_es
    },
    en: {
      global: global_en
    },
  }
}