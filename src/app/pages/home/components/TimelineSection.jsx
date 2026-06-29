import React from 'react';
import { useIntl } from 'react-intl';

export default function TimelineSection() {
  const { formatMessage } = useIntl();
  const steps = [
    { title: formatMessage({ id: 'app.pages.home.timeline.inquiry.title' }), subtitle: formatMessage({ id: 'app.pages.home.timeline.inquiry.subtitle' }) },
    { title: formatMessage({ id: 'app.pages.home.timeline.sourcing.title' }), subtitle: formatMessage({ id: 'app.pages.home.timeline.sourcing.subtitle' }) },
    { title: formatMessage({ id: 'app.pages.home.timeline.qc.title' }), subtitle: formatMessage({ id: 'app.pages.home.timeline.qc.subtitle' }) },
    { title: formatMessage({ id: 'app.pages.home.timeline.packaging.title' }), subtitle: formatMessage({ id: 'app.pages.home.timeline.packaging.subtitle' }) },
    { title: formatMessage({ id: 'app.pages.home.timeline.delivery.title' }), subtitle: formatMessage({ id: 'app.pages.home.timeline.delivery.subtitle' }) },
  ];

  return (
    <section className="py-24 overflow-x-auto hide-scrollbar whitespace-nowrap bg-card-secondary">
      <div className="px-4 sm:px-8 md:px-16 inline-flex gap-4 md:gap-6 min-w-full pb-8">
        {steps.map((step, idx) => (
          <div key={step} className="w-64 sm:w-72 md:w-80 shrink-0 group p-6 md:p-8 rounded-xl hover:bg-card transition-all">
            <div className="text-5xl md:text-[72px] leading-tight md:leading-20 text-text-secondary mb-3 md:mb-4 group-hover:text-[#006241] transition-colors tabular-nums font-bold">
              0{idx + 1}
            </div>
            <h4 className="text-lg md:text-[24px] leading-tight md:leading-8 text-text-primary font-title-md mb-2 font-bold">{step.title}</h4>
            <p className="whitespace-normal text-xs md:text-base text-text-secondary font-body-md">
              {step.subtitle}
            </p>
            <div className="h-1.5 md:h-2 bg-card-secondary mt-6 md:mt-8 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-primary w-0 group-hover:w-full transition-all duration-1000"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
