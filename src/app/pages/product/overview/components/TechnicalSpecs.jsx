import { Maximize2, Zap, Dumbbell, Crown } from 'lucide-react';

export default function TechnicalSpecs() {
  const specs = [
    {
      icon: Maximize2,
      label: 'STAPLE LENGTH',
      value: '32mm+',
      detail: 'Extra Long Staple',
    },
    {
      icon: Zap,
      label: 'MICRONAIRE',
      value: '3.8 – 4.2',
      detail: 'Optimal Spin-ability',
    },
    {
      icon: Dumbbell,
      label: 'FIBER STRENGTH',
      value: '30 GPT+',
      detail: 'High-Tenacity',
    },
    {
      icon: Crown,
      label: 'GRADE',
      value: 'Middling',
      detail: 'Standard White-1',
    },
  ];

  return (
    <section className="py-10 mb-15">
      <div className="mb-12">
        <h2 className="text-headline-lg font-bold text-on-surface mb-3">
          Technical Specifications
        </h2>
        <p className="text-body-lg text-on-surface-variant">
          Live laboratory metrics for Batch ID: VANG-COT-2024-08
        </p>
      </div>

      {/* Grid of Spec Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {specs.map((spec, idx) => {
          const Icon = spec.icon;
          return (
            <div
              key={idx}
              className="glass-card p-8 rounded-2xl flex flex-col items-center text-center"
            >
              <Icon className="text-primary mb-6" size={32} />
              <p className="text-label-sm text-on-surface-variant font-bold tracking-wider mb-3">
                {spec.label}
              </p>
              <p className="text-headline-lg font-bold text-on-surface mb-2 tabular-nums">
                {spec.value}
              </p>
              <p className="text-body-md text-secondary font-semibold">
                {spec.detail}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}