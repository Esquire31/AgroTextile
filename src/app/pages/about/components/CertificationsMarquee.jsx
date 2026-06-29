'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, Leaf, ShieldCheck, Factory, Award } from 'lucide-react';
import { useIntl } from 'react-intl';

export default function CertificationsMarquee() {
  const { formatMessage } = useIntl();
  const certifications = [
    { Icon: BadgeCheck, name: formatMessage({ id: 'app.pages.about.certifications.cert.iso' }) },
    { Icon: Leaf, name: formatMessage({ id: 'app.pages.about.certifications.cert.globalgap' }) },
    { Icon: ShieldCheck, name: formatMessage({ id: 'app.pages.about.certifications.cert.haccp' }) },
    { Icon: Factory, name: formatMessage({ id: 'app.pages.about.certifications.cert.sa8000' }) },
    { Icon: Award, name: formatMessage({ id: 'app.pages.about.certifications.cert.organic_cotton' }) },
  ];

  return (
    <section
      className="py-16 sm:py-24 border-y overflow-hidden bg-surface-container-low relative"
      style={{ borderColor: 'color-mix(in srgb, var(--color-outline-variant) 10%, transparent)' }}
    >
      {/* Quiet brand glow to tie into the glass aesthetic used
          elsewhere on the site, rather than a flat plain band. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 15% 50%, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent 60%)',
        }}
      ></div>

      <motion.div
        className="px-margin-mobile sm:px-margin-desktop mb-10 sm:mb-12 flex justify-between items-end relative z-10"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div>
          <h3 className="font-label-sm text-primary uppercase tracking-widest mb-2">{formatMessage({ id: 'app.pages.about.certifications.eyebrow' })}</h3>
          <h2 className="font-title-md text-title-md text-on-surface">{formatMessage({ id: 'app.pages.about.certifications.title' })}</h2>
        </div>
      </motion.div>

      {/* The infinite scroll is driven entirely by the .marquee /
          .marquee-content CSS classes in index.css — that keyframe
          (translateX(calc(-100% - 24px))) is already mathematically
          correct for a seamless loop against the doubled content
          below. The previous version layered a SECOND, competing
          Framer Motion animate={{ x: [0, -100] }} on the same
          element, animating in raw pixels with no relation to the
          actual track width — that's removed here, since two
          transform-drivers on one element is exactly the kind of
          conflict that causes visible stutter/snapping in a
          "smooth infinite loop." Letting the CSS keyframe run alone
          fixes that.

          Blank-area fix: .marquee-content in index.css sets
          justify-content: space-around, which spreads fixed-width
          items apart with extra space at both ends/between items
          instead of packing them flush — visible as gaps once the
          badges became circles with clear edges. Overridden to
          flex-start here via inline style so badges sit packed
          together, without touching the shared index.css class
          (CTAMarquee and any other consumer of .marquee-content
          keeps its original spacing behavior).

          Wordmark placement: the mark has to live INSIDE the
          repeating [cert, cert] sequence, not outside .marquee-
          content — anything outside the scrolling element is
          static and would only ever appear once, never "between"
          loop cycles. Putting one wordmark item at the start of
          each certifications set means it scrolls past and
          reappears every full cycle, the way a real bookend in an
          infinite marquee works. */}
      <div className="marquee relative z-10">
        <div className="marquee-content" style={{ justifyContent: 'flex-start' }}>
          {[...certifications, ...certifications].flatMap((cert, index) => {
            const Icon = cert.Icon;
            const items = [];

            // Insert the wordmark at the start of each underlying
            // certifications set (index 0 and index === certifications.length),
            // so it scrolls through once per full loop on both the
            // first and second (duplicated) pass.
            if (index === 0 || index === certifications.length) {
              items.push(
                <div
                  key={`wordmark-${index}`}
                  className="flex items-center justify-center shrink-0 px-6 sm:px-8"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm shrink-0">
                      A
                    </div>
                    <span className="font-title-md text-sm sm:text-base font-bold text-on-surface whitespace-nowrap tracking-tight">
                      {formatMessage({ id: 'app.pages.about.certifications.wordmark' })}
                    </span>
                  </div>
                </div>
              );
            }

            items.push(
              <motion.div
                key={index}
                className="glass-card flex flex-col items-center justify-center gap-2.5 w-32 h-32 sm:w-40 sm:h-40 rounded-full shrink-0 opacity-60 hover:opacity-100 transition-all cursor-default p-4"
                whileHover={{ scale: 1.06 }}
              >
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Icon size={24} strokeWidth={1.75} />
                </div>
                <span className="font-title-md text-[11px] sm:text-xs font-bold text-on-surface text-center leading-tight px-1">
                  {cert.name}
                </span>
              </motion.div>
            );

            return items;
          })}
        </div>
      </div>
    </section>
  );
}