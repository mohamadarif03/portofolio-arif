"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll, useMotionValueEvent } from "framer-motion"

const testimonials = [
  {
    quote: "Building robust, scalable full-stack web applications with modern ecosystems like Next.js, Golang RESTful APIs, and Laravel.",
    author: "Full-Stack Web Developer",
    role: "Production Apps • High-Performance APIs • Modern UX",
    company: "Next.js • Golang • Laravel • TypeScript",
  },
  {
    quote: "Extracting actionable insights, training machine learning models, and exploring deep learning architectures to solve complex problems.",
    author: "Data Science & Machine Learning",
    role: "Predictive Modeling • Data Analytics • Deep Learning",
    company: "Python • Scikit-Learn • PyTorch • Data Science",
  },
  {
    quote: "Consistently delivering high-impact solutions under pressure, earning 11+ IT competition awards during my university journey.",
    author: "11+ IT Competition Winner",
    role: "Awarded across Web Development, Software Engineering, and Data",
    company: "11+ IT Competitions Won in College",
  },
]

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll pinning: wrap in 300vh so user scrolls through 3 distinct steps while screen stays pinned
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map latest (0 to 1) into indices 0, 1, 2
    if (latest < 0.33) {
      setActiveIndex(0)
    } else if (latest < 0.67) {
      setActiveIndex(1)
    } else {
      setActiveIndex(2)
    }
  })

  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Transform for parallax on the large number
  const numberX = useTransform(x, [-200, 200], [-20, 20])
  const numberY = useTransform(y, [-200, 200], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
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

  const current = testimonials[activeIndex]

  return (
    <div ref={wrapperRef} className="relative w-full h-[260vh] lg:h-[300vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-background overflow-hidden">
        <div ref={containerRef} className="relative w-full max-w-5xl px-4 sm:px-6 md:px-8" onMouseMove={handleMouseMove}>
        {/* Oversized index number - positioned to bleed off left edge */}
        <motion.div
          className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 text-[14rem] sm:text-[20rem] md:text-[28rem] font-bold text-foreground/[0.04] select-none pointer-events-none leading-none tracking-tighter"
          style={{ x: numberX, y: numberY }}
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

        {/* Main content - asymmetric layout */}
        <div className="relative flex flex-col md:flex-row">
          {/* Mobile top label */}
          <div className="flex md:hidden items-center justify-between pb-4 border-b border-border mb-6">
            <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
              Key Highlights
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <span>0{activeIndex + 1}</span>
              <span>/</span>
              <span>0{testimonials.length}</span>
            </div>
          </div>

          {/* Left column - vertical text (desktop) */}
          <div className="hidden md:flex flex-col items-center justify-center pr-12 lg:pr-16 border-r border-border">
            <motion.span
              className="text-xs font-mono text-muted-foreground tracking-widest uppercase"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Key Highlights
            </motion.span>

            {/* Vertical progress line */}
            <div className="relative h-32 w-px bg-border mt-8">
              <motion.div
                className="absolute top-0 left-0 w-full bg-foreground origin-top"
                animate={{
                  height: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Center - main content */}
          <div className="flex-1 md:pl-16 py-4 md:py-12">
            {/* Company badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border rounded-full px-3 py-1 bg-bg-secondary/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {current.company}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Quote with character reveal */}
            <div className="relative mb-12 min-h-[120px] md:min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  className="text-2xl sm:text-3xl md:text-5xl font-light text-foreground leading-[1.2] md:leading-[1.15] tracking-tight"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {current.quote.split(" ").map((word, i) => (
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
                            delay: i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2, delay: i * 0.02 },
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
            <div className="flex items-end justify-between flex-wrap gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  {/* Animated line before name */}
                  <motion.div
                    className="w-8 h-px bg-foreground"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <div>
                    <p className="text-base font-medium text-foreground">{current.author}</p>
                    <p className="text-sm text-muted-foreground">{current.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={goPrev}
                  className="group relative w-12 h-12 rounded-full border border-border flex items-center justify-center overflow-hidden hover:border-accent transition-colors"
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous testimonial"
                >
                  <motion.div
                    className="absolute inset-0 bg-foreground/10"
                    initial={{ x: "-100%" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 text-foreground transition-colors"
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
                  className="group relative w-12 h-12 rounded-full border border-border flex items-center justify-center overflow-hidden hover:border-accent transition-colors"
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next testimonial"
                >
                  <motion.div
                    className="absolute inset-0 bg-foreground/10"
                    initial={{ x: "100%" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 text-foreground transition-colors"
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
          </div>
        </div>

        {/* Bottom ticker - subtle repeating company names */}
        <div className="absolute -bottom-16 left-0 right-0 overflow-hidden opacity-[0.06] pointer-events-none">
          <motion.div
            className="flex whitespace-nowrap text-6xl font-bold tracking-tight"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8">
                {testimonials.map((t) => t.company).join(" • ")} •
              </span>
            ))}
          </motion.div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
