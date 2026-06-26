'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-[921px] flex items-center overflow-hidden bg-background">
      <div className="px-margin-desktop w-full max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-gutter relative z-10">
        <motion.div
          className="flex flex-col justify-center space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <span className="w-12 h-0.5 bg-primary"></span>
            <span className="text-primary font-label-sm uppercase tracking-widest">Heritage Modernist</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface leading-tight">
            Indian Excellence, <br />
            <span className="text-primary">Global Reach.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Rooted in the fertile landscapes of Gujarat and Maharashtra, AgroTextile Global bridges the gap between traditional Indian craftsmanship and international market precision. From high-tensile hemp fibers to the sweetness of Kesar mangoes, we deliver excellence at industrial scale.
          </p>
          <div className="flex gap-4">
            <button className="bg-primary text-on-primary font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform duration-200 shadow-primary/20 shadow-lg">
              Explore Our Sectors
            </button>
            <button className="border border-primary text-primary font-bold py-4 px-10 rounded-full hover:bg-primary/10 transition-colors">
              Our Legacy
            </button>
          </div>
        </motion.div>

        <motion.div
          className="hidden lg:block relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="glass-card rounded-xl aspect-square p-4 rotate-3 transform hover:rotate-0 transition-transform duration-700"
            whileHover={{ rotateZ: 0 }}
          >
            <img
              className="w-full h-full object-cover rounded-lg"
              alt="Modern textile warehouse in India"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlc51nZzsB81zM5kn0Bx8wAunbo4WizeBQoM_evHNLIK1GIsKDOI9hLIK-UYQhtg36xZyPA93MNY1AAW9T2zEGbHIvO_a3aV1-HVPeHDQPUVQKaiDxzzL5HjiYQXinUQqVu4OTjBHOArCNiSZ7Sepz61eG-3rwu52Jwiyxz-m7mrExTi2PIeeyUysyW4ZDiWMlyO4WlzP0haFonFut1UUGYhs0xnTGMiNTwpE1afJSkAR_0jhpCyeUd3BcrXLTqb77wGufAe88f7A"
            />
            <motion.div
              className="absolute -bottom-6 -left-6 glass-card p-6 rounded-lg shadow-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-4">
                <div className="pulse-ring w-3 h-3 bg-primary rounded-full"></div>
                <span className="tabular-nums text-on-surface text-title-md">24/7 Global Dispatch</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}