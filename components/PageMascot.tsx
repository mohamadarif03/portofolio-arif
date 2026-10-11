"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Mascot = dynamic(
  () => import("page-mascot").then((mod) => mod.Mascot),
  {
    ssr: false,
    loading: () => null,
  }
);

interface PageMascotProps {
  size?: number;
  className?: string;
  directions?: string;
  reactions?: string;
  showBadge?: boolean;
}

export default function PageMascot({
  size,
  className = "",
  directions = "/mascots/arif-directions.webp",
  reactions = "/mascots/arif-reactions.webp",
  showBadge = false,
}: PageMascotProps) {
  const [mounted, setMounted] = useState(false);
  const [computedSize, setComputedSize] = useState(size || 580);

  useEffect(() => {
    setMounted(true);
    if (!size) {
      const updateSize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (w < 640) {
          setComputedSize(300);
        } else if (w < 1024) {
          setComputedSize(360);
        } else {
          // Desktop: scale up to ~68-72% of viewport height (max 680px) to fill vertical space nicely
          setComputedSize(Math.min(680, Math.max(500, Math.round(h * 0.70))));
        }
      };
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    } else {
      setComputedSize(size);
    }
  }, [size]);

  if (!mounted) {
    const fallback = size || 580;
    return (
      <div 
        style={{ width: fallback, height: fallback }} 
        className={`flex items-center justify-center ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={`relative inline-flex flex-col items-center select-none group pointer-events-auto ${className}`}>
      <Mascot
        directions={directions}
        reactions={reactions}
        size={computedSize}
        label="Mohamad Arif Mascot"
      />
      {showBadge && (
        <span 
          className="mt-2 text-[11px] font-medium text-text-secondary bg-bg-secondary/90 border border-border px-2.5 py-0.5 rounded-full transition-colors group-hover:text-accent group-hover:border-accent/40 shadow-sm"
          title="Klik maskot untuk melihat reaksi animasi"
        >
          Klik aku! 👋
        </span>
      )}
    </div>
  );
}
