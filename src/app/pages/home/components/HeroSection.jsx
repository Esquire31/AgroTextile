import React from "react";
import { useIntl } from "react-intl";

export default function HeroSection() {
  const { formatMessage } = useIntl();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* World Map Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
    src="/World map dots animation.svg"
    alt="Global Export Network"
    className="
      w-[140%]
      sm:w-[120%]
      md:w-full
      lg:w-[90%]
      max-w-[1800px]
      h-auto
      object-contain
      opacity-15
      -translate-y-12
    "
  />

      </div>
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-8 overflow-hidden">
        
        {/* <span className="text-primary font-label-sm uppercase tracking-widest mb-6 inline-block bg-primary/10 px-4 py-2 rounded-full border border-primary/20 text-sm">
          India To The World
        </span> */}

        <h1 className="text-4xl text-text-primary sm:text-6xl lg:text-[88px] leading-[1.05] font-bold font-display-lg tracking-[-0.03em] mb-8">
          <span dangerouslySetInnerHTML={{ __html: formatMessage({ id: 'app.pages.home.hero.title' }) }} />
        </h1>

        <p className="max-w-3xl mx-auto text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
          {formatMessage({ id: 'app.pages.home.hero.subtitle' })}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <button className="bg-primary text-text-on-primary px-8 py-4 rounded-full font-bold spring-hover spring-active flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
            {formatMessage({ id: 'app.pages.home.hero.btn.start_sourcing' })}
            <span className="material-symbols-outlined">
              arrow_forward
            </span>
          </button>

          <button className="border border-outline bg-card-bg backdrop-blur-sm text-text-primary px-8 py-4 rounded-full font-bold hover:bg-primary transition-colors spring-active">
            {formatMessage({ id: 'app.pages.home.hero.btn.view_catalogue' })}
          </button>
        </div>
      </div>
    </section>
  );
}