'use client';

import { Globe } from 'lucide-react';

export default function LiveTradeDesk() {
  const desks = [
    { city: 'Mumbai (IST)', status: 'Open', isOpen: true },
    { city: 'London (GMT)', status: 'Open', isOpen: true },
    { city: 'New York (EST)', status: 'Closed', isOpen: false },
    { city: 'Dubai (GST)', status: 'Open', isOpen: true },
  ];

  return (
    <section
      className="py-12 bg-surface-container-low border-y"
      style={{ borderColor: 'color-mix(in srgb, var(--color-outline-variant) 10%, transparent)' }}
    >
      <div className="max-w-container-max mx-auto px-margin-mobile sm:px-margin-desktop">
        <div className="flex flex-wrap items-center justify-between gap-gutter">
          <div className="flex items-center gap-4">
            <Globe className="text-primary text-4xl w-10 h-10" />
            <div>
              <h3 className="font-title-md text-title-md text-on-surface">Live Trade Desk</h3>
              <p className="text-on-surface-variant font-label-sm">Monitoring Global Time Zones</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 sm:gap-12 tabular-nums">
            {desks.map((desk, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-on-surface-variant text-label-sm uppercase mb-1">{desk.city}</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${desk.isOpen ? 'bg-primary pulse-ring' : 'bg-error'} relative`}
                  ></span>
                  <span className="text-body-lg text-on-surface">{desk.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}