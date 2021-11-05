import { createI18n } from 'vue-i18n'
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'

// User defined lang
import enLocale from './en'
import zhLocale from './zh-cn'

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  'zh-cn': {
    ...zhLocale,
    ...elementZhLocale
  }
}

export const getLocale = () => {
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)

  // eslint-disable-next-line no-restricted-syntax
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'zh'
}

const i18n = createI18n({
  locale: getLocale(),
  messages
})

export default i18n
