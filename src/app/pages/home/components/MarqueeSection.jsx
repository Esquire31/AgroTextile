import React from "react";
import { useIntl } from "react-intl";

export default function MarqueeSection() {
  const { formatMessage } = useIntl();
  const items = [
    formatMessage({ id: "app.pages.home.marquee.iso_9001_certified" }),
    formatMessage({ id: "app.pages.home.marquee.apeda_registered" }),
    formatMessage({ id: "app.pages.home.marquee.fssai_compliant" }),
    formatMessage({ id: "app.pages.home.marquee.global_quality_standards" }),
    formatMessage({ id: "app.pages.home.marquee.worldwide_shipping" }),
    formatMessage({ id: "app.pages.home.marquee.export_excellence" }),
  ];

  return (
    <section className="py-12 md:py-16 overflow-hidden bg-surface-container-lowest relative">
      {/* Left Fade */}
      <div className="absolute left-0 top-0 z-10 h-full w-24 bg-linear-to-r from-surface-container-lowest to-transparent pointer-events-none" />

      {/* Right Fade */}
      <div className="absolute right-0 top-0 z-10 h-full w-24 bg-linear-to-l from-surface-container-lowest to-transparent pointer-events-none" />

      <div className="marquee">
        {[1, 2].map((m) => (
          <div key={m} className="marquee-content">
            {items.map((item) => (
              <React.Fragment key={item}>
                <span
                  className="
                    text-primary
                    text-xl
                    md:text-3xl
                    font-medium
                    tracking-[0.3em]
                    uppercase
                    opacity-100
                    px-8
                    whitespace-nowrap
                  "
                >
                  {item}
                </span>

                <span className="text-primary text-2xl md:text-3xl opacity-40">
                  •
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}