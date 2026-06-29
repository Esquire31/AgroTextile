'use client'

import { useIntl } from 'react-intl'

export function Footer() {
  const { formatMessage } = useIntl()

  return (
    <footer className="bg-card-bg w-full py-12 md:py-24 rounded-t-3xl md:rounded-t-[5rem] border-t border-outline-variant shadow-lg mt-12 md:mt-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        <div className="col-span-1">
          <div className="font-headline-lg text-lg md:text-title-md font-bold text-primary mb-4 md:mb-8 tracking-tighter">
            {formatMessage({ id: 'app.company_name' })}
          </div>
          <p className="text-text-primary font-body-md text-sm md:text-base mb-6 md:mb-8 leading-relaxed">
            {formatMessage({ id: 'app.footer.subtext' })}
          </p>
          <div className="flex gap-4 md:gap-6">
            {['language', 'mail', 'share'].map((icon) => (
              <div
                key={icon}
                className="w-8 md:w-10 h-8 md:h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-on-primary transition-all"
              >
                <span className="material-symbols-outlined text-sm md:text-xl">{icon}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h5 className="font-bold text-primary mb-4 md:mb-8 font-label-sm uppercase tracking-widest text-xs md:text-sm">
            {formatMessage({ id: 'app.footer.section.operations.title' })}
          </h5>
          <ul className="space-y-3 text-text-primary md:space-y-5 font-body-md text-sm md:text-base">
            {['global_operations', 'compliance', 'sustainability'].map((item) => (
              <li key={item}>
                <a className="text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">
                  {formatMessage({ id: `app.footer.section.operations.link.${item}` })}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-primary mb-4 md:mb-8 font-label-sm uppercase tracking-widest text-xs md:text-sm">
            {formatMessage({ id: 'app.footer.section.corporate.title' })}
          </h5>
          <ul className="space-y-3 text-text-primary md:space-y-5 font-body-md text-sm md:text-base">
            {['investor_relations', 'terms_of_trade', 'privacy_policy'].map((item) => (
              <li key={item}>
                <a className="text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">
                  {formatMessage({ id: `app.footer.section.corporate.link.${item}` })}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-primary mb-4 md:mb-8 font-label-sm uppercase tracking-widest text-xs md:text-sm">
            {formatMessage({ id: 'app.footer.section.newsletter.title' })}
            </h5>
            <p className="text-xs text-text-primary mb-4 md:mb-6 font-body-md">{formatMessage({ id: 'app.footer.section.newsletter.subtext' })}</p>
          <div className="flex flex-col gap-3 md:gap-4">
            <input
              className="bg-surface-container border border-outline-variant text-text-primary rounded-full py-3 md:py-4 px-4 md:px-6 focus:ring-[#006241] focus:border-[#006241] font-body-md shadow-inner text-sm"
              placeholder={formatMessage({ id: 'app.footer.section.newsletter.input_placeholder' })}
              type="email"
            />
            <button className="bg-primary text-text-on-primary py-3 md:py-4 rounded-full font-bold hover:brightness-110 transition-all font-label-sm uppercase tracking-widest shadow-lg shadow-[#006241]/20 text-xs md:text-sm">
              {formatMessage({ id: 'app.footer.section.newsletter.btn_subscribe' })}
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 pt-8 md:pt-12 mt-8 md:mt-12 border-t border-outline-variant/30 text-center">
        <p className="text-text-primary font-body-md opacity-60 text-xs md:text-sm">
          {formatMessage({ id: 'app.footer.copyright' })}
        </p>
      </div>
    </footer>
  )
}
