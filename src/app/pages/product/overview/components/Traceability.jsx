'use client';

import { Globe, Microscope, ShieldCheck } from 'lucide-react';
import { useIntl } from 'react-intl';

export default function Traceability({ product }) {
  const { formatMessage } = useIntl();

  return (
    <section className="py-20 lg:py-32">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Left Side: Illustration / Visual */}
        <div className="flex-1 relative">
          <div className="w-full aspect-square max-w-md mx-auto relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-slow"></div>
            <div className="absolute inset-10 bg-primary/30 rounded-full blur-3xl"></div>
            <div className="relative z-10 w-full h-full glass-card rounded-full flex items-center justify-center border-2 border-primary/20">
              <Globe className="text-primary w-1/2 h-1/2 opacity-80" />
            </div>

            {/* Floating Labels */}
            <div className="absolute top-0 right-0 glass-card px-6 py-3 rounded-full border border-primary/30 animate-bounce-slow">
              <span className="text-xs font-bold text-primary uppercase tabular-nums">100% Traceable</span>
            </div>
            <div className="absolute bottom-10 left-[-20px] glass-card px-6 py-3 rounded-full border border-secondary/30 animate-bounce-slow" style={{ animationDelay: '1s' }}>
              <span className="text-xs font-bold text-secondary uppercase tabular-nums">Blockchain Verified</span>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 space-y-12">
          <div>
            <h2 className="text-display-sm font-bold text-on-surface mb-6 leading-tight">
              {formatMessage({ id: 'app.products.overview.traceability.title' })}
            </h2>
            <p className="text-body-xl text-on-surface-variant">
              {formatMessage({ id: 'app.products.overview.traceability.subtitle' })}
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-surface-container rounded-2xl flex items-center justify-center shrink-0 border border-outline-variant/10">
                <Globe className="text-primary" size={28} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-on-surface mb-2">
                  {formatMessage({ id: 'app.products.overview.traceability.origin' })}
                </h4>
                <p className="text-body-md text-on-surface-variant">
                  {product.details.origin}
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-14 h-14 bg-surface-container rounded-2xl flex items-center justify-center shrink-0 border border-outline-variant/10">
                <ShieldCheck className="text-primary" size={28} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-on-surface mb-2">
                  {formatMessage({ id: 'app.products.overview.traceability.treatment' })}
                </h4>
                <p className="text-body-md text-on-surface-variant">
                  {product.details.ripeness || product.details.grade}
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-14 h-14 bg-surface-container rounded-2xl flex items-center justify-center shrink-0 border border-outline-variant/10">
                <Microscope className="text-primary" size={28} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-on-surface mb-2">
                  {formatMessage({ id: 'app.products.overview.traceability.lab' })}
                </h4>
                <p className="text-body-md text-on-surface-variant">
                  {product.details.laboratoryReport}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
