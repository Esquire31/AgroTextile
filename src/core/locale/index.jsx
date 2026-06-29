import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { IntlProvider } from 'react-intl'
import enINMessages from './translations/en-in.json'
import zhCNMessages from './translations/zh-cn.json'
import arAEMessages from './translations/ae-ar.json'

const messagesByLocale = {
	'en-IN': enINMessages,
	'zh-CN': zhCNMessages,
	'ar-AE': arAEMessages,
}

const LocaleContext = createContext({
	locale: 'en-IN',
	setLocale: () => {},
})

export function LocaleProvider({ children }) {
	const [locale, setLocale] = useState(() => {
		if (typeof window === 'undefined') return 'en-IN'
		const storedLocale = localStorage.getItem('locale')
		return messagesByLocale[storedLocale] ? storedLocale : 'en-IN'
	})

	const messages = messagesByLocale[locale] || messagesByLocale['en-IN']

	useEffect(() => {
		if (typeof document === 'undefined') return
		document.documentElement.lang = locale
		document.documentElement.dir = locale === 'ar-AE' ? 'rtl' : 'ltr'
		localStorage.setItem('locale', locale)
	}, [locale])

	const value = useMemo(() => ({ locale, setLocale }), [locale])

	return (
		<LocaleContext.Provider value={value}>
			<IntlProvider locale={locale} defaultLocale="en-IN" messages={messages}>
				{children}
			</IntlProvider>
		</LocaleContext.Provider>
	)
}

export function useLocale() {
	return useContext(LocaleContext)
}
