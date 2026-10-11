"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { ThemeToggle } from "@/components/ui/circular-theme-reveal";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Certifications", href: "/certifications" },
  { label: "Contact", href: "/contact" },
];

export default function SiteNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center">
      <motion.nav
        animate={{
          width: scrolled ? "75%" : "100%",
          marginTop: scrolled ? "12px" : "0px",
          borderRadius: scrolled ? "9999px" : "0px",
          paddingTop: scrolled ? "10px" : "24px",
          paddingBottom: scrolled ? "10px" : "24px",
          paddingLeft: scrolled ? "28px" : "32px",
          paddingRight: scrolled ? "28px" : "32px",
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 42,
        }}
        className={cn(
          "flex justify-between items-center relative max-w-5xl min-w-[min(92vw,340px)]",
          "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
          scrolled
            ? "bg-bg-secondary/90 backdrop-blur-xl border border-border shadow-[0_8px_32px_rgba(0,0,0,0.28)]"
            : "bg-transparent border-transparent shadow-none backdrop-blur-none"
        )}
      >
        {/* Logo */}
        <div className="font-serif italic text-2xl font-medium tracking-tight text-text-primary whitespace-nowrap shrink-0">
          Mohamad Arif
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 text-[15px] font-medium text-text-secondary items-center">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    link.href === "/"
                      ? "text-accent hover:text-accent-hover transition-colors"
                      : "hover:text-text-primary transition-colors"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex flex-col justify-center items-center w-11 h-11 rounded-lg text-text-primary hover:bg-bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={mobileOpen ? "Tutup navigasi" : "Buka navigasi"}
            aria-expanded={mobileOpen}
          >
            <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-5 h-0.5 bg-current my-1 transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>

        {/* Mobile Dropdown - anchored inside the pill */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden absolute top-full left-0 w-full bg-bg-secondary/95 backdrop-blur-lg border border-border border-t-0 py-6 px-8 shadow-2xl z-30 flex flex-col gap-4 text-base font-medium"
            style={{ borderRadius: scrolled ? "0 0 24px 24px" : "0" }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={
                  link.href === "/"
                    ? "text-accent py-2 transition-colors min-h-[44px] flex items-center"
                    : "text-text-secondary hover:text-text-primary py-2 transition-colors min-h-[44px] flex items-center"
                }
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </motion.nav>
    </div>
  );
}
