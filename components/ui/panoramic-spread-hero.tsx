"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

// Certificate exhibition items - high quality certificate assets from portfolio
const IMAGES = [
  { 
    src: "/certificate/winner 1st place itc competition.webp", 
    alt: "1st Place Winner IT Competition 8.0", 
    title: "1st Place Winner • ITC 8.0",
    category: "National Competition"
  },
  { 
    src: "/certificate/achivement/jkb_fest.webp", 
    alt: "1st Place Winner JKB Fest Web Design", 
    title: "1st Place Winner • JKB Fest",
    category: "Web Design Competition"
  },
  { 
    src: "/certificate/achivement/mtq.webp", 
    alt: "1st Place MTQ UB Web Design Competition", 
    title: "1st Place • MTQ UB Web Design",
    category: "Campus Competition"
  },
  { 
    src: "/certificate/achivement/winner_3rd_t-arts.webp", 
    alt: "Winner 3rd Place T-Arts 3.0", 
    title: "3rd Place • T-Arts 3.0 Software",
    category: "Software Development"
  },
  { 
    src: "/certificate/achivement/softdev_inspire.webp", 
    alt: "1st Place Winner Inspire Software Development", 
    title: "1st Place Winner • Inspire SoftDev",
    category: "Software Engineering"
  },
  { 
    src: "/certificate/achivement/synapse_finalis.webp", 
    alt: "Synapse IT Competition Finalist", 
    title: "Finalist • Synapse IT Competition",
    category: "IT Competition"
  },
  { 
    src: "/certificate/machine-learning-ibm-DuIUTlc6.webp", 
    alt: "Machine Learning with Python IBM", 
    title: "Machine Learning with Python",
    category: "IBM Professional"
  },
  { 
    src: "/certificate/golang-sanbercode-BwYqxc-J.webp", 
    alt: "Golang Backend Development Sanbercode", 
    title: "Golang Backend Development",
    category: "Sanbercode Bootcamp"
  },
];

// Calculate a sweeping 3D arch around the center point for both mobile and desktop
const generatePanoramicCards = () => {
  const total = IMAGES.length;
  const centerIndex = (total - 1) / 2;

  return IMAGES.map((item, i) => {
    const offset = i - centerIndex;
    const absOffset = Math.abs(offset);
    const zIndex = Math.round(10 - absOffset);

    return {
      item,
      z: zIndex,
      desktop: {
        // Stack offset for resting state
        stacked: { x: offset * 2, y: offset * -2, rotateZ: offset * 2.5, rotateY: 0, scale: 1 },
        // Spread arch for panoramic view
        panoramic: { x: offset * 18, y: absOffset * 3, rotateZ: offset * 1.5, rotateY: offset * -12, scale: 1 - absOffset * 0.05 },
        // Balanced card dimensions that leave clear breathing room for typography and CTA
        size: { w: "21vw", h: "28vh", ml: "-10.5vw", mt: "-14vh" }
      },
      mobile: {
        stacked: { x: offset * 1.5, y: offset * -1.5, rotateZ: offset * 3, rotateY: 0, scale: 1 },
        // Tighter X spread and Y dip for mobile screens
        panoramic: { x: offset * 16, y: absOffset * 5, rotateZ: offset * 2, rotateY: offset * -15, scale: 1 - absOffset * 0.04 },
        size: { w: "46vw", h: "26vh", ml: "-23vw", mt: "-13vh" }
      },
    };
  });
};

const CARDS = generatePanoramicCards();

// Optimized physics to remove scroll jitter (higher damping, zero bounce)
const PROGRESS_SPRING = { stiffness: 80, damping: 25, mass: 0.5, restDelta: 0.001 };
const PARALLAX_SPRING = { stiffness: 50, damping: 25, mass: 0.5 };

function usePointerTilt(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const tiltX = useSpring(rawX, PARALLAX_SPRING);
  const tiltY = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled || !active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientY / window.innerHeight - 0.5) * -10);
      rawY.set((e.clientX / window.innerWidth - 0.5) * 10);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [active, enabled, rawX, rawY]);

  return { tiltX, tiltY };
}

interface CardLayout {
  stacked: { x: number; y: number; rotateZ: number; rotateY: number; scale: number };
  panoramic: { x: number; y: number; rotateZ: number; rotateY: number; scale: number };
  size: { w: string; h: string; ml: string; mt: string };
}

interface CardData {
  item: { src: string; alt: string; title: string; category: string };
  z: number;
  desktop: CardLayout;
  mobile: CardLayout;
}

function GalleryCard({
  card,
  progress,
  isMobile,
}: {
  card: CardData;
  progress: ReturnType<typeof useTransform<number, number>>;
  isSpreadActive: boolean;
  isMobile: boolean;
}) {
  const { item, desktop, mobile, z } = card;
  const activeLayout = isMobile ? mobile : desktop;
  const { stacked, panoramic, size } = activeLayout;

  // Custom S-curve easing for elegance
  const ease = useTransform(progress, (p: number) =>
    p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
  );

  // Raw numeric interpolations converted natively to strings (fixes layout recalculation jitter)
  const xRaw = useTransform(ease, [0, 1], [stacked.x, panoramic.x]);
  const yRaw = useTransform(ease, [0, 1], [stacked.y, panoramic.y]);
  const x = useTransform(xRaw, (v) => `${v}vw`);
  const y = useTransform(yRaw, (v) => `${v}vh`);
  
  const rotateZ = useTransform(ease, [0, 1], [stacked.rotateZ, panoramic.rotateZ]);
  const rotateY = useTransform(ease, [0, 1], [stacked.rotateY, panoramic.rotateY]);
  const scale = useTransform(ease, [0, 1], [0.75, panoramic.scale]);

  return (
    <div 
      className="absolute left-1/2 top-1/2 pointer-events-none"
      style={{ zIndex: z }}
    >
      <motion.div
        className="will-change-transform cursor-pointer pointer-events-auto shadow-2xl shadow-black/20 dark:shadow-black/60 rounded-md"
        style={{
          width: size.w,
          height: size.h,
          marginLeft: size.ml,
          marginTop: size.mt,
          x,
          y,
          rotateZ,
          rotateY,
          scale,
          transformOrigin: "center center -50px" 
        }}
      >
        <div className="group relative h-full w-full overflow-hidden bg-bg-secondary p-2 pb-6 max-md:p-1.5 max-md:pb-3 rounded-md transition-all duration-500 hover:shadow-accent/20 ring-1 ring-border border border-border">
          {/* Polaroid-style aesthetic frame */}
          <div className="relative h-full w-full overflow-hidden rounded-sm bg-neutral-900">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            <img
              src={item.src}
              alt={item.alt}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          {/* Caption underneath */}
          <div className="absolute bottom-1 left-2 right-2 flex items-center justify-between pointer-events-none">
            <span className="text-[10px] font-mono font-medium text-text-secondary truncate max-w-[80%]">
              {item.title}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function PanoramicSpreadHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, PROGRESS_SPRING);
  const progress = useTransform(smoothProgress, [0.15, 0.85], [0, 1]);

  const [spread, setSpread] = useState(false);
  useMotionValueEvent(progress, "change", (p) => setSpread(p > 0.95));

  const { tiltX, tiltY } = usePointerTilt(spread, !reduce);

  // Subtle entrance animation for the header typography
  const textOpacity = useTransform(progress, [0, 0.2], [0.75, 1]);
  const textY = useTransform(progress, [0, 0.25], [12, 0]);

  return (
    <section 
      ref={wrapRef} 
      id="certifications"
      aria-label="Certifications Exhibition"
      className="relative w-full h-[320vh] lg:h-[380vh] bg-bg-primary text-text-primary transition-colors duration-500"
    >
      <div
        className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {/* Subtle Ambient Light */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-25 blur-[120px] pointer-events-none transition-opacity duration-700">
          <div className="w-[50vw] h-[50vw] bg-accent/30 rounded-full mix-blend-screen" />
        </div>

        {/* Scene Container - Positioned with vertical clearance below the header typography */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center translate-y-[8vh] sm:translate-y-[9vh] lg:translate-y-[10vh]"
          style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
        >
          {CARDS.map((card, i) => (
            <GalleryCard
              key={i}
              card={card}
              progress={progress}
              isSpreadActive={spread}
              isMobile={isMobile}
            />
          ))}
        </motion.div>

        {/* Elegant Editorial Typography - Anchored cleanly at the top zone, completely unobstructed */}
        <motion.div
          className="pointer-events-none absolute top-16 sm:top-20 lg:top-24 inset-x-0 z-20 flex flex-col items-center text-center px-6 max-w-3xl mx-auto"
          style={{ y: textY, opacity: textOpacity }}
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.35em] font-semibold text-accent mb-2 sm:mb-2.5">
            Exhibition & Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight tracking-tight text-text-primary">
            Certifications & Honors
          </h2>
          <p className="mt-3 max-w-xl text-xs sm:text-sm md:text-base font-light leading-relaxed text-text-secondary">
            Scroll to unspool the collection. Verified credentials spanning national IT competitions, machine learning, and software development.
          </p>
        </motion.div>

        {/* Centered CTA Button positioned below the certificate fan-out cards */}
        <motion.div
          className="absolute bottom-5 sm:bottom-7 md:bottom-9 z-20 flex justify-center pointer-events-auto"
          style={{
            opacity: useTransform(progress, [0.3, 0.7], [0, 1]),
            y: useTransform(progress, [0.3, 0.7], [16, 0]),
          }}
        >
          <Link
            href="/certifications"
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs sm:text-sm font-medium bg-accent text-white hover:bg-accent-hover transition-all duration-300 shadow-xl shadow-accent/30 hover:shadow-accent/50 hover:scale-105 border border-white/10"
          >
            <span>Lihat Semua Sertifikat</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default PanoramicSpreadHero;
