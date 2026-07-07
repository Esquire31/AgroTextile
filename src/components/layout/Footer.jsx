'use client'

import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'

export function Footer() {
  const { formatMessage } = useIntl()

  const socialLinks = [
    {
      key: 'facebook',
      href: 'https://facebook.com/yourpage',
      label: 'Facebook',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
          <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
        </svg>
      ),
    },
    {
      key: 'instagram',
      href: 'https://instagram.com/yourpage',
      label: 'Instagram',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 md:w-5 md:h-5">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      key: 'mail',
      href: 'mailto:info@yourcompany.com',
      label: 'Email',
      svg: <span className="material-symbols-outlined text-sm md:text-xl">mail</span>,
    },
  ]

  return (
    <footer className="bg-card-bg w-full pt-10 pb-6 md:pt-16 md:pb-10 rounded-t-2xl md:rounded-t-[2rem] border-t border-outline-variant shadow-lg mt-6 md:mt-10 overflow-hidden relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 flex flex-col items-center text-center md:grid md:grid-cols-[2fr_1fr_1fr] md:items-center md:text-left gap-8 md:gap-10 relative z-10">
        {/* Brand column */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
          <img
            className="w-32 md:w-48 h-auto mb-3 md:mb-4"
            src="/logo.svg"
            alt={formatMessage({ id: 'app.company_name' })}
          />
          <p className="text-text-primary type-body mb-3 md:mb-4 max-w-sm opacity-80">
            {formatMessage({ id: 'app.footer.subtext' })}
          </p>
          <div className="flex gap-3 md:gap-4 justify-center md:justify-start">
            {socialLinks.map(({ key, href, label, svg }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 md:w-10 h-8 md:h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-on-primary transition-all"
              >
                {svg}
              </a>
            ))}
          </div>
        </div>

        {/* Company links */}
        <div>
          <h5 className="type-badge text-primary mb-2 md:mb-3">
            {formatMessage({ id: 'app.footer.section.company.title' })}
          </h5>
          <ul className="space-y-1 text-text-primary md:space-y-2 type-body">
            {[
              { key: 'about_us', to: '/about' },
              { key: 'products', to: '/products' },
              { key: 'contact_us', to: '/contact' },
            ].map(({ key, to }) => (
              <li key={key}>
                <Link className="text-on-surface-variant hover:text-text-highlight hover:underline transition-all duration-200" to={to}>
                  {formatMessage({ id: `app.footer.section.company.link.${key}` })}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h5 className="type-badge text-text-highlight mb-2 md:mb-3">
            {formatMessage({ id: 'app.footer.section.contact.title' })}
          </h5>
          <ul className="space-y-1 text-text-primary md:space-y-2 type-body">
            <li className="text-on-surface-variant">
              {formatMessage({ id: 'app.footer.section.contact.address' })}
            </li>
            <li>
              <a className="text-on-surface-variant hover:text-highlight hover:underline transition-all duration-200" href={`mailto:${formatMessage({ id: 'app.footer.section.contact.email' })}`}>
                {formatMessage({ id: 'app.footer.section.contact.email' })}
              </a>
            </li>
            <li>
              <a className="text-on-surface-variant hover:text-highlight hover:underline transition-all duration-200" href={`tel:${formatMessage({ id: 'app.footer.section.contact.phone' })}`}>
                {formatMessage({ id: 'app.footer.section.contact.phone' })}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 pt-8 md:pt-12 mt-8 md:mt-12 border-t border-outline-variant/30 text-center relative z-10">
        <p className="text-text-primary font-body-md opacity-60 text-xs md:text-sm">
          {formatMessage({ id: 'app.footer.copyright' })}
        </p>
      </div>
    </footer>
  )
}