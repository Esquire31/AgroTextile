"use client";
import React from "react";
import { motion } from "motion/react";
import { Quote } from "lucide-react";

export const TestimonialsColumn = (props) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  key={i}
                  className="glass-card relative p-6 sm:p-8 rounded-3xl w-72 sm:max-w-xs sm:w-full transition-all duration-300 hover:-translate-y-1"
                  style={{
                    boxShadow: '0 10px 30px var(--color-shadow)',
                  }}
                >
                  <Quote
                    size={24}
                    className="text-primary/25 absolute top-5 sm:top-6 right-5 sm:right-6"
                    strokeWidth={1.5}
                  />
                  <p className="text-on-surface leading-relaxed relative z-10 mb-5 sm:mb-6 text-sm sm:text-base">
                    {text}
                  </p>
                  <div
                    className="flex items-center gap-3 pt-4 sm:pt-5 border-t"
                    style={{ borderColor: 'color-mix(in srgb, var(--color-outline-variant) 20%, transparent)' }}
                  >
                    <img
                      width={44}
                      height={44}
                      src={image}
                      alt={name}
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/15"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold tracking-tight leading-5 text-on-surface text-sm">
                        {name}
                      </span>
                      <span className="leading-5 tracking-tight text-on-surface-variant text-xs">
                        {role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};