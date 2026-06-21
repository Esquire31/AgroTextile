import React from "react";
import CountUp from "../../../../components/ui/CountUp";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function StatsSection() {
  const stats = [
  { end: 40, suffix: "+", label: "Countries Served" },
  { end: 500, suffix: "+", label: "Enterprise Clients" },
  { end: 1000, suffix: "+", label: "TEU Monthly", isK: true },
  { end: 15, suffix: "+", label: "Years Excellence" },
];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="relative z-10 px-4 md:px-8 my-10 md:my-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-[1280px] mx-auto bg-stats-primary border border-primary/20 rounded-xl py-8 md:py-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              className="flex flex-col items-center"
            >
              <div className="text-stats-text font-bold text-3xl sm:text-4xl md:text-[56px] leading-none tabular-nums">
                {inView ? (
                  <>
                    <CountUp
                        from={0}
                        to={stat.end}
                        duration={1.2}
                        separator=","
                        formatter={
                          stat.isK
                            ? (latest) =>
                                latest >= 999 ? "1K" : Math.floor(latest).toString()
                            : undefined
                        }
                      />
                    {stat.suffix}
                  </>
                ) : (
                  "0"
                )}
              </div>

              <div className="mt-3 text-text-on-primary uppercase tracking-widest text-xs md:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}