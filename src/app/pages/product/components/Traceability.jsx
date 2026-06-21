import { MapPin, Check, Leaf } from 'lucide-react';

export default function Traceability() {
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

      {/* Right Column - Content */}
      <div className="flex flex-col justify-center">
        <h2 className="text-headline-lg font-bold text-on-surface mb-4">
          Traceability by Design
        </h2>
        <p className="text-body-lg text-on-surface-variant leading-relaxed mb-8">
          At Vanguard Industrial Exports, we bridge the gap between regional agricultural prowess
          and global industrial demand. Our cotton is harvested through a network of 500+ certified
          farms across the Gujarat belt, ensuring each bale can be traced back to its specific field
          of origin.
        </p>

        {/* Feature List */}
        <div className="space-y-6">
          <div className="flex gap-4">
            <Check className="text-primary mt-1 shrink-0" size={24} />
            <div>
              <p className="text-title-md font-bold text-on-surface mb-2">Quality Control Protocol</p>
              <p className="text-body-md text-on-surface-variant">
                Each batch undergoes HVI (High Volume Instrument) testing in our ISO-17025
                accredited labs prior to container loading.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Leaf className="text-primary mt-1 shrink-0" size={24} />
            <div>
              <p className="text-title-md font-bold text-on-surface mb-2">ESG Compliance</p>
              <p className="text-body-md text-on-surface-variant">
                Commitment to Better Cotton Initiative (BCI) standards, minimizing water usage and
                ensuring fair labor practices in all sourcing hubs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}