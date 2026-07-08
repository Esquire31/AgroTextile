'use client';

import { Globe, Microscope, MapPin, ShieldCheck } from 'lucide-react';
import { useIntl } from 'react-intl';

export default function Traceability({ product }) {
  const { formatMessage } = useIntl();

  return (
    <section className="py-10 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-15">
      {/* Left Column - Visual Display */}
      <div className="relative w-full h-100 lg:h-auto rounded-3xl overflow-hidden shadow-2xl">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-FT2ayuYAVPFN2fXE5SS2VNdQnRMgaPZYWZv6pi9DACQ8DxESg2wZu2EF5wfjIFiRqxBApJW6PlDHjgkXVWaCImoLImpFgvhZgxlrWJ-st3yCl2dZ6F_ut4NTciubdj3rIb4UHvvW6PN3_3YLlabIugH-2Esd_YONS6EguWOQOl5ai7ovcQp_S62Idi_RWU9eRowaOBK-PNopqR2_kT1R_gVneIuoFqqtansDSsFRYJk_lGe6bpeOcnFve2qP4coC0UKh-04EW5M"
          alt="Modern textile factory with spinning looms"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-background to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center shrink-0">
              <MapPin className="text-primary" size={20} />
            </div>
            <p className="text-on-surface font-bold">Regional Hubs: Gujarat &amp; Maharashtra</p>
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
    </section>
  );
}
