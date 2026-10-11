"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import ContributionSkyline, { ContributionDay } from "@/components/ui/contribution-skyline";
import fallbackContributions from "@/public/github-contributions.json";

export default function GithubSkylineSection() {
  const [contributions, setContributions] = useState<ContributionDay[]>(
    fallbackContributions as ContributionDay[]
  );
  const [total, setTotal] = useState<number>(() =>
    (fallbackContributions as ContributionDay[]).reduce(
      (sum, item) => sum + (item.count || 0),
      0
    )
  );
  const [isLive, setIsLive] = useState(false);
  const [currentView, setCurrentView] = useState<"2d" | "3d">("2d");
  const sectionRef = useRef<HTMLElement>(null);
  const userInteracted = useRef(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchLatestContributions() {
      try {
        const res = await fetch("/api/github-contributions");
        if (!res.ok) return;
        const json = await res.json();
        if (isMounted && Array.isArray(json.contributions) && json.contributions.length > 0) {
          setContributions(json.contributions);
          if (typeof json.total === "number") {
            setTotal(json.total);
          }
          setIsLive(true);
        }
      } catch (err) {
        console.error("Failed to load live GitHub activity:", err);
      }
    }

    fetchLatestContributions();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        // Reset manual interaction when user scrolls away from section
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          userInteracted.current = false;
        }

        // Preserve explicit user choice if they manually clicked toggle button
        if (userInteracted.current) return;

        // When user arrives at section and scrolls into it:
        // - At the header / entry (rect.top > 120px): flat 2D heatmap view
        // - When scrolled down a bit into the section (rect.top <= 120px and rect.bottom > 200px): rise up into 3D Skyline
        // - When scrolling back up towards top of section (rect.top > 180px): fold back to flat 2D view
        if (rect.top <= 120 && rect.bottom > 200) {
          setCurrentView((prev) => (prev !== "3d" ? "3d" : prev));
        } else if (rect.top > 180) {
          setCurrentView((prev) => (prev !== "2d" ? "2d" : prev));
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="activity"
      aria-label="GitHub Activity"
      className="w-full border-t border-border py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-bg-primary relative z-20 pointer-events-auto"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <div>
            <span className="font-serif italic text-base lg:text-lg text-accent mb-2 block">
              / Engineering Activity
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
              Activity &amp;{" "}
              <span className="font-serif italic font-light text-text-primary/75">
                Skyline
              </span>
            </h2>
            <p className="mt-3 text-sm md:text-base text-text-secondary max-w-xl">
              Real-time activity and 3D isometric skyline graph representing code contributions and project milestones directly from GitHub.
            </p>
          </div>

          {/* GitHub Status & Direct Profile Link */}
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/mohamadarif03"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-bg-secondary hover:border-accent/50 hover:bg-bg-secondary/80 text-text-primary text-xs sm:text-sm font-medium transition-all group shadow-sm"
            >
              <FaGithub className="text-base group-hover:text-accent transition-colors" />
              <span>@mohamadarif03</span>
              <span className="inline-flex items-center gap-1.5 pl-1.5 border-l border-border text-[11px] text-text-secondary">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isLive ? "bg-emerald-500 animate-pulse" : "bg-blue-500"
                  }`}
                />
                {isLive ? "Live Sync" : "GitHub Verified"}
              </span>
              <HiOutlineArrowTopRightOnSquare className="text-xs text-text-secondary group-hover:text-accent transition-colors ml-0.5" />
            </Link>
          </div>
        </div>

        {/* 2D Heatmap & 3D Isometric Skyline Component */}
        <ContributionSkyline
          data={contributions}
          palette="ocean"
          view={currentView}
          onViewChange={(v) => {
            setCurrentView(v);
            userInteracted.current = true;
          }}
          defaultView="2d"
          unit="contribution"
          title={
            <div className="flex flex-wrap items-center gap-2">
              <FaGithub className="text-text-primary" />
              <Link
                href="https://github.com/mohamadarif03"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-text-primary hover:text-accent transition-colors underline decoration-dotted underline-offset-4"
              >
                mohamadarif03
              </Link>
              <span className="text-text-secondary">•</span>
              <span className="text-text-secondary">
                <strong className="text-text-primary tabular-nums font-semibold">
                  {total.toLocaleString()}
                </strong>{" "}
                contributions in the last year
              </span>
            </div>
          }
          className="shadow-2xl border-border bg-bg-secondary"
        />
      </div>
    </section>
  );
}
