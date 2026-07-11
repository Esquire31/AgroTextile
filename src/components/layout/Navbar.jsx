'use client'

import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useLocale } from '../../core/locale'

export function Navigation({ isDark, setIsDark }) {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
const [langMenuOpen, setLangMenuOpen] = useState(false)
const langMenuRef = useRef(null)
const { formatMessage } = useIntl()
const { locale, setLocale } = useLocale()

const locales = [
  { code: 'en-IN', label: 'EN', name: 'English' },
  { code: 'zh-CN', label: 'CN', name: '中文' },
  { code: 'ar-AE', label: 'AR', name: 'العربية' },
]

const localeLabelByCode = {
  'en-IN': 'EN',
  'zh-CN': '中文',
  'ar-AE': 'AR',
}

const handleLocaleSelect = (code) => {
  setLocale(code)
  setLangMenuOpen(false)
}

// Close the language dropdown when clicking outside of it
useEffect(() => {
  if (!langMenuOpen) return
  const handleClickOutside = (event) => {
    if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
      setLangMenuOpen(false)
    }
  }
  document.addEventListener('mousedown', handleClickOutside)
  return () => document.removeEventListener('mousedown', handleClickOutside)
}, [langMenuOpen])

const navItems = [
  { label: formatMessage({ id: 'app.navbar.tabs.about_us' }), href: '/about' },
  { label: formatMessage({ id: 'app.navbar.tabs.products' }), href: '/products' },
  { label: formatMessage({ id: 'app.navbar.tabs.contact_us' }), href: '/contact' },
]

return (
<> <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-128px)] max-w-295 z-50 bg-background/80 backdrop-blur-md border border-outline-variant/30 h-14 px-4 sm:px-6 lg:px-8 rounded-full flex items-center shadow-lg">
    <div className="w-full flex justify-between items-center gap-4">

      <Link to="/" className="type-subtitle text-primary tracking-tighter cursor-pointer shrink-0 hover:opacity-80 transition-opacity">
        {formatMessage({ id: 'app.company_name' })}
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden xl:flex flex-1 ml-12 gap-6 xl:gap-10 items-center justify-center">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive }) => 
              `transition-all duration-300 whitespace-nowrap ${
                isActive 
                  ? 'text-primary type-subtitle' 
                  : 'text-text-primary hover:text-primary type-body'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="flex gap-2 sm:gap-4 items-center shrink-0">

        <button
          onClick={() => setIsDark(!isDark)}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-text-primary hover:bg-surface-variant transition-all spring-active"
        >
          <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <div className="relative" ref={langMenuRef}>
          <button
            onClick={() => setLangMenuOpen((open) => !open)}
            title={formatMessage({ id: 'app.navbar.btn.change_language' })}
            aria-label={formatMessage({ id: 'app.navbar.btn.change_language' })}
            aria-haspopup="true"
            aria-expanded={langMenuOpen}
            className="w-12 h-10 flex items-center justify-center rounded-full border border-outline-variant text-text-primary hover:bg-surface-variant transition-all spring-active font-label-sm"
          >
            {localeLabelByCode[locale] || 'EN'}
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-3 w-52 origin-top-right rounded-2xl border border-outline-variant/30 bg-background backdrop-blur-xl shadow-2xl shadow-black/10 ring-1 ring-black/5 p-2 z-50 animate-lang-menu">
              <div className="flex flex-col gap-0.5">
                {locales.map(({ code, label, name }) => {
                  const isActive = locale === code
                  return (
                    <button
                      key={code}
                      onClick={() => handleLocaleSelect(code)}
                      className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-primary hover:bg-surface-variant'
                      }`}
                    >
                      <span className={`flex items-center justify-center w-8 h-8 shrink-0 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-variant text-text-primary/70 group-hover:bg-primary/10 group-hover:text-primary'
                      }`}>
                        {label}
                      </span>
                      <span className={`flex-1 font-body-md text-sm ${isActive ? 'font-semibold' : ''}`}>
                        {name}
                      </span>
                      {isActive && (
                        <span className="material-symbols-outlined text-[18px] text-primary">check</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <Link
          to="/contact#procurement-form"
          className="hidden xl:block px-4 sm:px-6 py-2 bg-primary text-text-on-primary dark:bg-primary-container dark:text-on-primary-container rounded-full font-semibold spring-hover spring-active font-label-sm whitespace-nowrap"
        >
          {formatMessage({ id: 'app.navbar.btn.request_quote' })}
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-text-primary hover:bg-surface-variant transition-all spring-active"
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

      </div>
    </div>
  </nav>

  {/* Mobile Menu */}
  {mobileMenuOpen && (
    <div className="fixed top-24 left-3 right-3 z-40 xl:hidden bg-background/95 backdrop-blur-md border border-border rounded-3xl shadow-lg p-6">
      <div className="flex flex-col gap-5">

        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) => 
              `transition-all duration-300 font-medium ${
                isActive 
                  ? 'text-primary text-lg font-semibold' 
                  : 'text-text-primary hover:text-primary'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}

        <div className="pt-4 border-t border-outline-variant flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <span className="text-text-primary font-label-sm px-1">
              {formatMessage({ id: 'app.navbar.btn.change_language' })}
            </span>
            <div className="flex gap-2">
              {locales.map(({ code, label, name }) => (
                <button
                  key={code}
                  onClick={() => handleLocaleSelect(code)}
                  className={`flex-1 py-2.5 rounded-full border transition-all spring-active font-label-sm ${
                    locale === code
                      ? 'border-primary bg-primary/10 text-primary font-semibold'
                      : 'border-outline-variant text-text-primary hover:bg-surface-variant'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <Link
            to="/contact#procurement-form"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 bg-primary text-on-primary dark:bg-primary-container dark:text-on-primary-container rounded-full font-semibold text-center"
          >
            {formatMessage({ id: 'app.navbar.btn.request_quote' })}
          </Link>
        </div>

      </div>
    </div>
  )}
</>
)
}