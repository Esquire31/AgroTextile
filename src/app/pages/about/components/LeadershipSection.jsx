"use client";
import { TestimonialsColumn } from "@/components/ui/testimonials-column";
import { motion } from "motion/react";

 const testimonials = [
  {
    text: "The quality of products and consistency in every shipment have exceeded our expectations. Their team is responsive, reliable, and always delivers on time.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Rajesh Sharma",
    role: "Procurement Manager",
  },
  {
    text: "We've been sourcing from this export company for over two years, and every order has met international quality standards. A trustworthy long-term partner.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Priya Mehta",
    role: "Import Operations Head",
  },
  {
    text: "Excellent communication, premium product quality, and timely deliveries. Their professionalism has made international procurement completely hassle-free.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Amit Verma",
    role: "Supply Chain Director",
  },
  {
    text: "Their attention to detail in packaging and documentation is exceptional. Every shipment arrives exactly as committed, making them one of our most dependable suppliers.",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Neha Kapoor",
    role: "International Buyer",
  },
  {
    text: "Working with this export company has simplified our sourcing process. Their commitment to quality and customer satisfaction truly sets them apart.",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Vikram Patel",
    role: "Global Procurement Lead",
  },
  {
    text: "Every order has been handled professionally from inquiry to delivery. Their reliability and transparency have earned our complete confidence.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Anjali Desai",
    role: "Import Manager",
  },
  {
    text: "The consistency in product quality and prompt customer support have helped us maintain our own reputation with clients worldwide.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Rohit Nair",
    role: "Distribution Manager",
  },
  {
    text: "Their export expertise and efficient logistics ensure smooth deliveries every time. We highly value this partnership.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Pooja Iyer",
    role: "Purchasing Manager",
  },
  {
    text: "From pricing to shipment tracking, every step is handled with professionalism. Their team is always available to address our requirements quickly.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Karan Malhotra",
    role: "Procurement Specialist",
  },
  {
    text: "Their products consistently meet our quality expectations, and deliveries are always on schedule. We confidently recommend them as a trusted export partner.",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    name: "Sneha Joshi",
    role: "Category Manager",
  },
  {
    text: "We've experienced outstanding service, competitive pricing, and excellent product quality. Their team makes international sourcing effortless.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Arjun Singh",
    role: "Commercial Manager",
  },
  {
    text: "Their commitment to maintaining export standards and delivering premium-quality products has made them one of our preferred suppliers.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Kavya Reddy",
    role: "International Sourcing Manager",
  },
  {
    text: "Every shipment reflects their dedication to quality, precision, and timely execution. It's a pleasure working with such a professional export team.",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    name: "Sandeep Gupta",
    role: "Head of Procurement",
  },
  {
    text: "The entire experience—from quotation to final delivery—has been seamless. Their reliability has helped us strengthen our own supply chain.",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
    name: "Ritu Agarwal",
    role: "Supply Chain Manager",
  },
  {
    text: "A dependable export partner that consistently delivers superior quality products backed by excellent communication and customer service. We look forward to many more years of collaboration.",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    name: "Manish Choudhary",
    role: "International Trade Manager",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function TestimonialsSection() {
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
              Testimonials
            </div>
          </div>

          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-6 text-center"
            style={{ color: `var(--color-on-surface)` }}
          >
            What our partners say
          </h2>
          <p
            className="text-center mt-5"
            style={{ color: `var(--color-on-surface-variant)`, opacity: 0.85 }}
          >
            Trusted by procurement teams and trade desks around the world.
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