'use client'

import { useState } from 'react'

export function Navigation({ isDark, setIsDark }) {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

const navItems = [
'Logistics',
'Sourcing',
'Supply Chain',
'Products',
'ESG',
'Freight',
]

return (
<> <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-128px)] max-w-295 z-50 bg-background/80 backdrop-blur-md border border-outline-variant/30 h-14 px-4 sm:px-6 lg:px-8 rounded-full flex items-center shadow-lg"> <div className="w-full flex justify-between items-center gap-4">

      <div className="font-headline-lg text-title-md font-bold text-primary tracking-tighter cursor-pointer shrink-0">
        AgriTex Global
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex ml-12 gap-6 xl:gap-10 items-center">
        {navItems.map((item) => (
          <a
            key={item}
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md whitespace-nowrap"
            href="#"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex gap-2 sm:gap-4 items-center shrink-0">

        <button
          onClick={() => setIsDark(!isDark)}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface hover:bg-surface-variant transition-all spring-active"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <button className="hidden lg:block px-6 py-2 border border-outline-variant rounded-full text-on-surface hover:bg-surface-variant transition-all spring-active font-label-sm whitespace-nowrap">
          Login
        </button>

        <button className="hidden sm:block px-4 sm:px-6 py-2 bg-primary text-on-primary dark:bg-primary-container dark:text-on-primary-container rounded-full font-semibold spring-hover spring-active font-label-sm whitespace-nowrap">
          Request Quote
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface"
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
    <div className="fixed top-24 left-3 right-3 z-40 lg:hidden bg-background/95 backdrop-blur-md border border-outline-variant rounded-3xl shadow-lg p-6">
      <div className="flex flex-col gap-5">

        {navItems.map((item) => (
          <a
            key={item}
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="text-on-surface font-medium hover:text-primary transition-colors"
          >
            {item}
          </a>
        ))}

        <div className="pt-4 border-t border-outline-variant flex flex-col gap-3">
          <button className="w-full py-3 border border-outline-variant rounded-full">
            Login
          </button>

          <button className="w-full py-3 bg-primary text-on-primary dark:bg-primary-container dark:text-on-primary-container rounded-full font-semibold">
            Request Quote
          </button>
        </div>

      </div>
    </div>
  )}
</>
)
}