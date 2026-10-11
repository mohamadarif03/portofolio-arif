"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiOutlineDocumentArrowDown, HiOutlineEnvelope } from "react-icons/hi2";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Dynamic Variables using standard shadcn/tailwind v4 tokens */
  --pill-bg-1: color-mix(in oklch, var(--foreground, #E7EAEE) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground, #E7EAEE) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background, #0B0F14) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground, #E7EAEE) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background, #0B0F14) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground, #E7EAEE) 8%, transparent);
  
  --pill-bg-1-hover: color-mix(in oklch, var(--foreground, #E7EAEE) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground, #E7EAEE) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground, #E7EAEE) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background, #0B0F14) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground, #E7EAEE) 20%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--destructive, #EF4444) 50%, transparent)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive, #EF4444) 80%, transparent)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, color-mix(in oklch, var(--foreground, #E7EAEE) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground, #E7EAEE) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Theme-adaptive Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    color-mix(in oklch, var(--primary, #2563EB) 15%, transparent) 0%, 
    color-mix(in oklch, var(--secondary, #3B82F6) 15%, transparent) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground, #E7EAEE);
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 24vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground, #E7EAEE) 5%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground, #E7EAEE) 10%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground, #E7EAEE) 0%, color-mix(in oklch, var(--foreground, #E7EAEE) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--foreground, #E7EAEE) 15%, transparent));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Zero Dependency)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Fullstack Engineering</span> <span className="text-accent/60">✦</span>
    <span>Modern Next.js & React</span> <span className="text-accent/60">✦</span>
    <span>Golang RESTful APIs</span> <span className="text-accent/60">✦</span>
    <span>AI & Data Science</span> <span className="text-accent/60">✦</span>
    <span>Scalable Architecture</span> <span className="text-accent/60">✦</span>
    <span>Creative Interactive UI</span> <span className="text-accent/60">✦</span>
  </div>
);

export interface CinematicFooterProps {
  giantText?: string;
  headline?: string;
  copyrightName?: string;
  authorName?: string;
}

export function CinematicFooter({
  giantText = "MOHAMAD ARIF",
  headline = "Ready to build something impactful?",
  copyrightName = "Mohamad Arif",
  authorName = "Mohamad Arif",
}: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      // 1. Background Parallax
      if (giantTextRef.current) {
        gsap.fromTo(
          giantTextRef.current,
          { y: "15vh", scale: 0.82, opacity: 0.05 },
          {
            y: "0vh",
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }

      // 2. Staggered Content Reveal
      if (headingRef.current && linksRef.current) {
        gsap.fromTo(
          [headingRef.current, linksRef.current],
          { y: 50, opacity: 0.2 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 85%",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }
    }, wrapperRef);

    // Auto-refresh ScrollTrigger when page height changes
    const refreshST = () => ScrollTrigger.refresh();
    const t1 = setTimeout(refreshST, 250);
    const t2 = setTimeout(refreshST, 800);
    const t3 = setTimeout(refreshST, 1800);

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    window.addEventListener("resize", refreshST);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", refreshST);
      resizeObserver.disconnect();
      ctx.revert();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard flow. Because it has clip-path, its contents
        are ONLY visible within its bounding box as the content above lifts off.
      */}
      <div
        ref={wrapperRef}
        className="relative h-[780px] sm:h-[820px] lg:h-screen w-full z-0"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* The actual footer stays fixed to the viewport underneath everything */}
        <footer 
          className="fixed bottom-0 left-0 z-0 flex h-[780px] sm:h-[820px] lg:h-screen w-full flex-col justify-between overflow-hidden bg-bg-primary text-text-primary cinematic-footer-wrapper"
          style={{ backgroundColor: "var(--color-bg-primary, #0B0F14)" }}
        >
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            {giantText}
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-8 sm:top-12 left-0 w-full overflow-hidden border-y border-border/50 bg-bg-primary/80 backdrop-blur-md py-3.5 sm:py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-text-secondary uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 mt-20 w-full max-w-5xl mx-auto my-auto">
            <h2
              ref={headingRef}
              className="text-4xl sm:text-6xl md:text-8xl font-black footer-text-glow tracking-tighter mb-8 sm:mb-12 text-center"
            >
              {headline}
            </h2>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-5 sm:gap-6 w-full">
              {/* Primary Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
                <MagneticButton 
                  as="a" 
                  href="/cv.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-glass-pill px-7 sm:px-10 py-3.5 sm:py-5 rounded-full text-text-primary font-bold text-sm md:text-base flex items-center gap-3 group min-h-[44px]"
                >
                  <HiOutlineDocumentArrowDown className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                  Download Resume
                </MagneticButton>
                
                <MagneticButton 
                  as="a" 
                  href="mailto:mohamadarif5392@gmail.com" 
                  className="footer-glass-pill px-7 sm:px-10 py-3.5 sm:py-5 rounded-full text-text-primary font-bold text-sm md:text-base flex items-center gap-3 group min-h-[44px]"
                >
                  <HiOutlineEnvelope className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                  Send an Email
                </MagneticButton>
              </div>

              {/* Secondary Social & Profile Links */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 w-full mt-1">
                <MagneticButton 
                  as="a" 
                  href="https://github.com/mohamadarif03" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-glass-pill px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-text-secondary font-medium text-xs md:text-sm hover:text-text-primary flex items-center gap-2 min-h-[44px]"
                >
                  <FaGithub className="text-sm" />
                  GitHub
                </MagneticButton>
                <MagneticButton 
                  as="a" 
                  href="https://www.linkedin.com/in/mohamad-arif-68402627a/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-glass-pill px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-text-secondary font-medium text-xs md:text-sm hover:text-text-primary flex items-center gap-2 min-h-[44px]"
                >
                  <FaLinkedin className="text-sm text-blue-500" />
                  LinkedIn
                </MagneticButton>
                <MagneticButton 
                  as="a" 
                  href="https://www.instagram.com/mhmdarif346/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-glass-pill px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-text-secondary font-medium text-xs md:text-sm hover:text-text-primary flex items-center gap-2 min-h-[44px]"
                >
                  <FaInstagram className="text-sm text-pink-500" />
                  Instagram
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-6 sm:pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
            {/* Copyright */}
            <div className="text-text-secondary text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
              © {new Date().getFullYear()} {copyrightName}. All rights reserved.
            </div>

            {/* "Made with Love" Badge */}
            <div className="footer-glass-pill px-5 sm:px-6 py-2.5 sm:py-3 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-border/50">
              <span className="text-text-secondary text-[10px] md:text-xs font-bold uppercase tracking-widest">Crafted with</span>
              <span className="animate-footer-heartbeat text-sm md:text-base text-red-500">❤</span>
              <span className="text-text-secondary text-[10px] md:text-xs font-bold uppercase tracking-widest">by</span>
              <span className="text-text-primary font-black text-xs md:text-sm tracking-normal ml-1">{authorName}</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full footer-glass-pill flex items-center justify-center text-text-secondary hover:text-text-primary group order-3 min-h-[44px] min-w-[44px]"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}

export default CinematicFooter;
