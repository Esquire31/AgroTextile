"use client";
import { TestimonialsColumn } from "@/components/ui/testimonials-column";
import { motion } from "motion/react";
import { useIntl } from "react-intl";

export default function TestimonialsSection() {
  const { formatMessage } = useIntl();

  const testimonials = [
    {
      text: formatMessage({ id: "app.pages.about.testimonials.t1.text" }),
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "Rajesh Sharma",
      role: formatMessage({ id: "app.pages.about.testimonials.t1.role" }),
    },
    {
      text: formatMessage({ id: "app.pages.about.testimonials.t2.text" }),
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Priya Mehta",
      role: formatMessage({ id: "app.pages.about.testimonials.t2.role" }),
    },
    {
      text: formatMessage({ id: "app.pages.about.testimonials.t3.text" }),
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Amit Verma",
      role: formatMessage({ id: "app.pages.about.testimonials.t3.role" }),
    },
    {
      text: formatMessage({ id: "app.pages.about.testimonials.t4.text" }),
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Neha Kapoor",
      role: formatMessage({ id: "app.pages.about.testimonials.t4.role" }),
    },
    {
      text: formatMessage({ id: "app.pages.about.testimonials.t5.text" }),
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      name: "Vikram Patel",
      role: formatMessage({ id: "app.pages.about.testimonials.t5.role" }),
    },
    {
      text: formatMessage({ id: "app.pages.about.testimonials.t6.text" }),
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      name: "Anjali Desai",
      role: formatMessage({ id: "app.pages.about.testimonials.t6.role" }),
    },
    {
      text: formatMessage({ id: "app.pages.about.testimonials.t7.text" }),
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      name: "Rohit Nair",
      role: formatMessage({ id: "app.pages.about.testimonials.t7.role" }),
    },
    {
      text: formatMessage({ id: "app.pages.about.testimonials.t8.text" }),
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      name: "Pooja Iyer",
      role: formatMessage({ id: "app.pages.about.testimonials.t8.role" }),
    },
    {
      text: formatMessage({ id: "app.pages.about.testimonials.t9.text" }),
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      name: "Karan Malhotra",
      role: formatMessage({ id: "app.pages.about.testimonials.t9.role" }),
    },
    {
      text: formatMessage({ id: "app.pages.about.testimonials.t10.text" }),
      image: "https://randomuser.me/api/portraits/women/10.jpg",
      name: "Sneha Joshi",
      role: formatMessage({ id: "app.pages.about.testimonials.t10.role" }),
    },
    {
      text: formatMessage({ id: "app.pages.about.testimonials.t11.text" }),
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      name: "Arjun Singh",
      role: formatMessage({ id: "app.pages.about.testimonials.t11.role" }),
    },
    {
      text: formatMessage({ id: "app.pages.about.testimonials.t12.text" }),
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      name: "Kavya Reddy",
      role: formatMessage({ id: "app.pages.about.testimonials.t12.role" }),
    },
    {
      text: formatMessage({ id: "app.pages.about.testimonials.t13.text" }),
      image: "https://randomuser.me/api/portraits/men/13.jpg",
      name: "Sandeep Gupta",
      role: formatMessage({ id: "app.pages.about.testimonials.t13.role" }),
    },
    {
      text: formatMessage({ id: "app.pages.about.testimonials.t14.text" }),
      image: "https://randomuser.me/api/portraits/women/14.jpg",
      name: "Ritu Agarwal",
      role: formatMessage({ id: "app.pages.about.testimonials.t14.role" }),
    },
    {
      text: formatMessage({ id: "app.pages.about.testimonials.t15.text" }),
      image: "https://randomuser.me/api/portraits/men/15.jpg",
      name: "Manish Choudhary",
      role: formatMessage({ id: "app.pages.about.testimonials.t15.role" }),
    },
  ];

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className="py-16 sm:py-section-gap relative overflow-hidden" style={{ backgroundColor: `var(--color-background)` }}>
      {/* Quiet ambient glow, consistent with the glass treatment
          used across Certifications/Impact/Hero, so this section
          no longer feels like a copied-in component. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--color-primary) 8%, transparent), transparent 50%)',
        }}
      ></div>

      <div className="container z-10 mx-auto px-margin-mobile sm:px-margin-desktop relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-135 mx-auto"
        >
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-widest">
              {formatMessage({ id: 'app.pages.about.testimonials.eyebrow' })}
            </div>
          </div>

          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-6 text-center"
            style={{ color: `var(--color-on-surface)` }}
          >
            {formatMessage({ id: 'app.pages.about.testimonials.title' })}
          </h2>
          <p
            className="text-center mt-5"
            style={{ color: `var(--color-on-surface-variant)`, opacity: 0.85 }}
          >
            {formatMessage({ id: 'app.pages.about.testimonials.subtitle' })}
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 sm:gap-6 mt-10 sm:mt-12 px-2 mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-120 sm:max-h-150 lg:max-h-185 overflow-hidden relative z-10">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}