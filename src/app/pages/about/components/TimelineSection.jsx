'use client';

import { motion } from 'framer-motion';

const timelineItems = [
  {
    year: '1994',
    title: 'The First Harvest',
    description: 'Established in Ahmedabad as a boutique textile sourcing house focusing on organic long-staple cotton for European luxury markets.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeNvnu2w6h7v-Udz6OUiPoAugF8ot9arJppohvVmL6QZPuj078QmErSJ0IdWnbb5tVGbiazLbRLX5t8iz08gAtsuqhfubN27yS8IJgsGdNlEfxYsGFMIbT5Jlzq46oCvvc5cfYFVRZQsVOmydyM3BKaqbzqkML5DqKZZS3WiOvFyGr7WCad_IdZ-UKiT35icMlCnYWc6oRUar48uxWe4fOlUxeVcapWLw_0HoM_1qkzJTREkKbV4_zExPtZ_IkTFD8UubTfa_ahho',
    position: 'left',
  },
  {
    year: '2008',
    title: 'Agro-Export Expansion',
    description: 'Diversified into premium horticulture, launching our cold-chain infrastructure in Maharashtra for Mango and Pomegranate exports to the Middle East.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSU8xOCO0UutiX-TlpcsFGBaLV9sBq3PU1FZkSJi_neyk3Igt_8MzxHsUZjjHpYgVfVuuNgdkFuJ1IgSyrcdhTURBxHU_q-Acifl9Adroq0VRt7zV9PkGCl4BHlP-_urWc8sWl3KB9r8gwPq9W7e1uLXg_PFguzQSGXHoRBz6k29cZPDDwbFTAK95sJjSUk6T1QI8nGmJlA2DHFKakogg7sisl2hLcXACQRFI8qcRFQ9zgopuAMT-bTj9V99Iu6nIdlX1RHrNEkUc',
    position: 'right',
  },
  {
    year: '2022',
    title: 'Industrial Modernist Era',
    description: 'Full integration of IoT-enabled logistics and sustainability-first ESG protocols across all textile and agro units, achieving GlobalGAP status.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6UKX5krzFkB7nPIQiaPtAEPnJ9oqRAJoqALGQmd82DT6X7SfcirLiAi0YUEfjKuAZSCzAcPL9PrcurlQTTVBVRcour_QLt63Y1IS4GPGwtoLKL9HXlMQorsp2M13v2a0XPVbPfK94iryPdEOLi3bZ9AIuCkmfqYLO9HQcAFYiDEBamKQJ97PDQeuEJBAFhnkYmo36gJEsQvqQG0HDqzD9qMUBnPyofDY63k8kOffziJNHo0y3c7QvovNYbrYbxnIe-7zSpGcp-4A',
    position: 'left',
  },
];

export default function TimelineSection() {
  return (
    <section className="py-16 sm:py-section-gap px-margin-mobile sm:px-margin-desktop bg-surface-container-low">
      <div className="max-w-container-max mx-auto">
        <motion.div
          className="flex flex-col items-center text-center mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">The Journey of Quality</h2>
          <p className="font-body-lg text-on-surface-variant max-w-2xl">
            A chronological testament to our growth from local sourcing to becoming a multi-sector export powerhouse.
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop spine — centered, full height */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full hidden md:block"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-outline-variant) 30%, transparent)' }}
          ></div>

          {/* Mobile spine — left-aligned, since the card stacks
              single-column below md */}
          <div
            className="absolute left-5 top-0 bottom-0 w-0.5 md:hidden"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-outline-variant) 30%, transparent)' }}
          ></div>

          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              className={`relative grid md:grid-cols-2 gap-6 md:gap-gutter mb-12 md:mb-20 ${item.position === 'right' ? 'md:direction-rtl' : ''}`}
              initial={{ opacity: 0, x: item.position === 'left' ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              {/* Mobile marker dot, sits on the left spine */}
              <div className="absolute left-5 top-1 -translate-x-1/2 w-3 h-3 bg-primary rounded-full border-2 border-surface-container-low z-10 md:hidden"></div>

              <div
                className={`pl-12 md:pl-0 ${
                  item.position === 'right' ? 'md:order-2 md:text-left md:pl-12' : 'md:text-right md:pr-12'
                }`}
              >
                <span className="tabular-nums text-primary text-display-lg opacity-50 block mb-2">{item.year}</span>
                <h3 className="font-title-md text-title-md text-on-surface mb-3 md:mb-4">{item.title}</h3>
                <p className="text-on-surface-variant">{item.description}</p>
              </div>

              {/* Photo — now visible at every breakpoint instead of
                  hidden below md, and the previous flat opacity-80
                  on the image (which looked blurry/washed-out
                  specifically in light theme, since a translucent
                  image loses far more contrast against a light
                  background than a dark one) is replaced with a
                  full-opacity image plus a thin theme-aware scrim
                  layered on top via an absolutely-positioned div.
                  Same "doesn't look like a raw stock photo" softness,
                  but the photo itself stays crisp in both themes. */}
              <div
                className={`flex items-center pl-12 md:pl-0 ${
                  item.position === 'right' ? 'md:order-1 md:justify-end md:pr-12' : 'justify-start md:pl-12'
                } relative`}
              >
                <div
                  className={`hidden md:block absolute ${
                    item.position === 'right' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
                  } w-4 h-4 bg-primary rounded-full border-4 border-background z-10`}
                ></div>
                <div className="glass-card p-2 rounded-xl w-full max-w-xs sm:max-w-none sm:w-64 h-40 relative overflow-hidden">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    alt={item.title}
                    src={item.image}
                  />
                  <div
                    className="absolute inset-2 rounded-lg pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to top, color-mix(in srgb, var(--color-background) 18%, transparent), transparent 60%)',
                    }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}