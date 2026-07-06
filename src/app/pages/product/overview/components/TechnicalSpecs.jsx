'use client';

import { Maximize2, Zap, Dumbbell, ShieldCheck, Leaf, Target, Thermometer, Crown } from 'lucide-react';
import { useIntl } from 'react-intl';

const iconMap = {
  Maximize2: Maximize2,
  Zap: Zap,
  Dumbbell: Dumbbell,
  ShieldCheck: ShieldCheck,
  Leaf: Leaf,
  Target: Target,
  Thermometer: Thermometer,
  Crown: Crown,
};

export default function TechnicalSpecs({ product }) {
  const { formatMessage } = useIntl();
  const { specs } = product;

  return (
    <section className="py-20 border-y border-outline-variant/10">
      <div className="mb-16">
        <h2 className="text-display-sm font-bold text-on-surface mb-4">
          {formatMessage({ id: 'app.products.overview.specs.title' })}
        </h2>
        <p className="text-body-lg text-on-surface-variant max-w-2xl">
          {formatMessage(
            { id: 'app.products.overview.specs.subtitle' },
            { product: product.title }
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => {
          const IconComponent = iconMap[specs[`icon${i}`]] || Target;
          return (
            <div
              key={i}
              className="glass-card p-8 rounded-2xl flex flex-col gap-6 hover:translate-y-[-8px] transition-transform duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <IconComponent size={28} />
              </div>
              <div>
                <p className="text-sm font-mono text-on-surface-variant uppercase tracking-wider mb-2">
                  {specs[`label${i}`]}
                </p>
                <p className="text-2xl font-bold text-on-surface">
                  {specs[`value${i}`]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
