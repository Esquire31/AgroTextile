'use client';

import React from 'react';
import { Ship, Clock, Anchor, ShieldCheck } from 'lucide-react';
import { useIntl } from 'react-intl';

export default function Logistics({ product }) {
  const { formatMessage } = useIntl();

  return (
    <section className="py-10 mb-15">
      <div className="glass-card p-12 rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Export Infrastructure */}
          <div>
            <h2 className="text-headline-lg font-bold text-on-surface mb-2">
              {formatMessage({ id: 'app.products.overview.logistics.title' })}
            </h2>
            <p className="text-body-lg text-on-surface-variant mb-10">
              {formatMessage(
                { id: 'app.products.overview.logistics.subtitle' },
                { product: product.title, origin: product.details.origin }
              )}
            </p>

            {/* Infrastructure List */}
            <div className="space-y-6">
              <div
                className="flex justify-between items-center border-b pb-4"
                style={{ borderColor: 'color-mix(in srgb, var(--color-outline-variant) 30%, transparent)' }}
              >
                <span className="text-body-lg text-on-surface">
                  {formatMessage({ id: 'app.products.overview.logistics.moq' })}
                </span>
                <span className="text-body-lg text-secondary font-mono">{product.details.minOrder}</span>
              </div>
              <div
                className="flex justify-between items-center border-b pb-4"
                style={{ borderColor: 'color-mix(in srgb, var(--color-outline-variant) 30%, transparent)' }}
              >
                <span className="text-body-lg text-on-surface">
                  {formatMessage({ id: 'app.products.overview.logistics.capacity' })}
                </span>
                <span className="text-body-lg text-secondary font-mono">{product.details.stockStatus}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-body-lg text-on-surface">
                  {formatMessage({ id: 'app.products.overview.logistics.insurance' })}
                </span>
                <span className="text-body-lg text-secondary font-mono">
                  {formatMessage({ id: 'app.products.overview.logistics.insurance_value' })}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Current Status */}
          <div
            className="p-8 rounded-xl border"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-background) 60%, transparent)',
              borderColor: 'color-mix(in srgb, var(--color-outline-variant) 30%, transparent)',
            }}
          >
            <h3 className="text-headline-lg font-bold text-primary mb-8">
              {formatMessage({ id: 'app.products.overview.logistics.overview_title' })}
            </h3>

            {/* Status Items */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-sm text-on-surface-variant uppercase font-bold tracking-wider">
                    {formatMessage({ id: 'app.products.overview.logistics.lead_time' })}
                  </p>
                  <p className="text-xl font-bold text-on-surface">{product.details.leadTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Anchor className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-sm text-on-surface-variant uppercase font-bold tracking-wider">
                    {formatMessage({ id: 'app.products.overview.logistics.port' })}
                  </p>
                  <p className="text-xl font-bold text-on-surface">{product.details.shippingPorts}</p>
                </div>
              </div>
            </div>

            {/* Live Operational Status */}
            <div className="mt-10 pt-8 border-t border-outline-variant/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                <p className="text-body-md text-on-surface">
                  {formatMessage({ id: 'app.products.overview.logistics.status_operational' })}
                </p>
              </div>
              <p className="text-body-xs text-on-surface-variant italic">
                {formatMessage({ id: 'app.products.overview.logistics.live_update' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
