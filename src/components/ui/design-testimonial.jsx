import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useIntl } from "react-intl"

// ─── EDIT: keep these IDs in sync with your en.json / zh.json / ar.json message files ───
const testimonials = [
  {
    quoteId: "app.pages.about.designtestimonials.t1.quote",
    authorId: "app.pages.about.designtestimonials.t1.author",
    roleId: "app.pages.about.designtestimonials.t1.role",
    tagId: "app.pages.about.designtestimonials.t1.tag",
  },
  {
    quoteId: "app.pages.about.designtestimonials.t2.quote",
    authorId: "app.pages.about.designtestimonials.t2.author",
    roleId: "app.pages.about.designtestimonials.t2.role",
    tagId: "app.pages.about.designtestimonials.t2.tag",
  },
  {
    quoteId: "app.pages.about.designtestimonials.t3.quote",
    authorId: "app.pages.about.designtestimonials.t3.author",
    roleId: "app.pages.about.designtestimonials.t3.role",
    tagId: "app.pages.about.designtestimonials.t3.tag",
  },
]

const valueIds = [
  "app.pages.about.designtestimonials.values.v1",
  "app.pages.about.designtestimonials.values.v2",
  "app.pages.about.designtestimonials.values.v3",
  "app.pages.about.designtestimonials.values.v4",
  "app.pages.about.designtestimonials.values.v5",
]
// ──────────────────────────────────────────────────────────────────────────────────────

export default function Designtestimonial() {
  const { formatMessage } = useIntl()
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const numberX = useTransform(x, [-200, 200], [-10, 10])
  const numberY = useTransform(y, [-200, 200], [-6, 6])

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
  }

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [])

  const current = testimonials[activeIndex]
  const currentQuote = formatMessage({ id: current.quoteId })
  const values = valueIds.map((id) => formatMessage({ id }))

  return (
    <section
      id="testimonials"
      className="w-full bg-(--color-background) py-16 sm:py-20 md:py-28 overflow-hidden font-[Inter,sans-serif]"
    >
      <div
        ref={containerRef}
        className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12"
        onMouseMove={handleMouseMove}
      >
        {/* Eyebrow */}
        <div className="mb-10 md:mb-14 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-(--color-primary)" />
          <span className="type-badge text-(--color-text-secondary)">
            {formatMessage({ id: "app.pages.about.designtestimonials.eyebrow" })}
          </span>
        </div>

        {/* Index number — filled, soft-blurred entrance, back to its original spot at a touch larger size */}
        <motion.div
          className="hidden lg:block absolute -left-6 top-1/2 -translate-y-1/2 text-[16rem] xl:text-[20rem] font-bold select-none pointer-events-none leading-none tracking-tighter"
          style={{ x: numberX, y: numberY, color: "var(--color-primary)", opacity: 0.06 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main content */}
        <div className="relative flex flex-col md:flex-row">
          {/* Left column - vertical label + progress (hidden on mobile) */}
          <div className="hidden md:flex flex-col items-center justify-center md:pr-12 lg:pr-16 md:border-r border-(--color-border)">
            <motion.span
              className="type-label text-(--color-text-secondary) tracking-widest uppercase"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {formatMessage({ id: "app.pages.about.designtestimonials.rail_label" })}
            </motion.span>

            <div className="relative h-28 lg:h-32 w-px bg-(--color-border) mt-8">
              <motion.div
                className="absolute top-0 left-0 w-full bg-(--color-primary) origin-top"
                animate={{
                  height: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Center - main content */}
          <div className="flex-1 md:pl-12 lg:pl-16 py-4 md:py-12">
            {/* Role tag badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mb-6 md:mb-8"
              >
                <span className="inline-flex items-center gap-2 type-badge text-(--color-text-secondary) border border-(--color-border) rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-primary)" />
                  {formatMessage({ id: current.tagId })}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Quote with word reveal */}
            <div className="relative mb-10 md:mb-12 min-h-28 sm:min-h-36 md:min-h-40">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-(--color-text-primary) leading-[1.2] tracking-tight"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {currentQuote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.3em]"
                      variants={{
                        hidden: { opacity: 0, y: 20, rotateX: 90 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.5,
                            delay: i * 0.03,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2, delay: i * 0.01 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author row */}
            <div className="flex flex-col sm:flex-row sm:items-end items-start justify-between gap-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    className="w-8 h-px bg-(--color-primary)"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <div>
                    <p className="text-base font-medium text-(--color-primary)">
                      {formatMessage({ id: current.authorId })}
                    </p>
                    <p className="text-sm text-(--color-text-secondary)">
                      {formatMessage({ id: current.roleId })}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <motion.button
                  onClick={goPrev}
                  aria-label={formatMessage({ id: "app.pages.about.designtestimonials.btn_prev" })}
                  className="group relative w-10 h-10 md:w-12 md:h-12 rounded-full border border-(--color-border) flex items-center justify-center overflow-hidden focus-visible:outline focus-visible:outline-(--color-primary) focus-visible:outline-offset-2"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-(--color-primary)"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 text-(--color-text-primary) group-hover:text-(--color-on-primary) transition-colors"
                  >
                    <path
                      d="M10 12L6 8L10 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>

                <motion.button
                  onClick={goNext}
                  aria-label={formatMessage({ id: "app.pages.about.designtestimonials.btn_next" })}
                  className="group relative w-10 h-10 md:w-12 md:h-12 rounded-full border border-(--color-border) flex items-center justify-center overflow-hidden focus-visible:outline focus-visible:outline-(--color-primary) focus-visible:outline-offset-2"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-(--color-primary)"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 text-(--color-text-primary) group-hover:text-(--color-on-primary) transition-colors"
                  >
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Mobile dot indicators */}
            <div className="flex md:hidden items-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`${formatMessage({ id: "app.pages.about.designtestimonials.rail_label" })} ${i + 1}`}
                  onClick={() => setActiveIndex(i)}
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: i === activeIndex ? "1.5rem" : "0.375rem",
                    backgroundColor:
                      i === activeIndex ? "var(--color-primary)" : "var(--color-border)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Values strip — premium marquee: hairline rules + fading edges instead of raw giant background text */}
        <div className="relative mt-14 md:mt-20 py-4 border-t border-b border-(--color-border) overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 w-16 md:w-24 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, var(--color-background), transparent)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-16 md:w-24 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, var(--color-background), transparent)",
            }}
          />
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="flex items-center">
                {values.map((v, vi) => (
                  <span key={vi} className="flex items-center">
                    <span className="type-label mx-5 md:mx-6 text-(--color-text-secondary) tracking-widest">
                      {v}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-(--color-primary)" />
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}