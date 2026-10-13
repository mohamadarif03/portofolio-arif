"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import SiteNavbar from "@/components/SiteNavbar";
import SimpleFooter from "@/components/SimpleFooter";
import { CERTIFICATES, Certificate } from "@/data/certifications";


export default function CertificationsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const categories = ["All", "Course", "Achievement"];

  const filteredCerts =
    activeFilter === "All"
      ? CERTIFICATES
      : CERTIFICATES.filter((c) => c.category === activeFilter);

  const courseCount = CERTIFICATES.filter((c) => c.category === "Course").length;
  const achieveCount = CERTIFICATES.filter((c) => c.category === "Achievement").length;

  const allSkills = Array.from(new Set(CERTIFICATES.flatMap((c) => c.skills)));

  // Escape key handler for modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/20">
      <SiteNavbar />

      {/* ── 1. Hero Section ── */}
      <section className="pt-28 sm:pt-40 md:pt-44 pb-10 sm:pb-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <span className="font-serif italic text-base sm:text-lg text-accent mb-2 sm:mb-3 block">
            / Credentials
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary mb-3 sm:mb-4">
            Certifications &amp; <span className="text-accent/80 font-serif italic font-light">Achievements</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            A record of continuous learning and competitive success, from industry-recognized courses to winning trophies in national tech competitions.
          </p>

          {/* Overview Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-bg-secondary border border-border shadow-sm">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-text-primary block leading-none mb-1">
                  {CERTIFICATES.length}
                </span>
                <span className="text-[11px] sm:text-xs text-text-secondary font-medium uppercase tracking-wider">
                  Total Credentials
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-bg-secondary border border-border shadow-sm">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-text-primary block leading-none mb-1">
                  {courseCount}
                </span>
                <span className="text-[11px] sm:text-xs text-text-secondary font-medium uppercase tracking-wider">
                  Courses Completed
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-bg-secondary border border-border shadow-sm">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-text-primary block leading-none mb-1">
                  {achieveCount}
                </span>
                <span className="text-[11px] sm:text-xs text-text-secondary font-medium uppercase tracking-wider">
                  Achievements Won
                </span>
              </div>
            </div>
          </div>

          {/* Validated Skills Cloud */}
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-bg-secondary/60 border border-border">
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary block mb-2.5 sm:mb-3">
              Skills Validated
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {allSkills.map((skill, i) => (
                <span
                  key={i}
                  className="text-[11px] sm:text-xs font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20 hover:bg-accent hover:text-white transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Filter Bar & Bento Grid ── */}
      <section className="pb-20 sm:pb-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        
        {/* Filter Bar */}
        <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                activeFilter === cat
                  ? "bg-accent text-white border-accent shadow-md shadow-accent/20"
                  : "bg-bg-secondary text-text-secondary border-border hover:border-accent/40 hover:text-text-primary"
              }`}
            >
              {cat === "All" && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              )}
              {cat === "Course" && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              )}
              {cat === "Achievement" && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              )}
              <span>{cat}</span>
              <span className={`inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold ${
                activeFilter === cat ? "bg-white/25 text-white" : "bg-bg-primary text-text-secondary"
              }`}>
                {cat === "All" ? CERTIFICATES.length : cat === "Course" ? courseCount : achieveCount}
              </span>
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCerts.map((cert, index) => (
            <div
              key={`${activeFilter}-${index}`}
              onClick={() => setSelectedCert(cert)}
              className={`flex flex-col bg-bg-secondary rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer group ${
                cert.category === "Achievement"
                  ? "border-amber-500/30 hover:border-amber-500/60"
                  : "border-border hover:border-accent/50"
              }`}
            >
              {/* Preview image */}
              <div className="relative w-full h-48 bg-bg-primary overflow-hidden shrink-0">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* View Overlay */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/30">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    View Certificate
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* Category Badge & Level */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      cert.category === "Achievement"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    }`}>
                      {cert.category === "Achievement" ? "🏆 " : "📜 "}
                      {cert.category}
                    </span>
                    <span className="text-xs text-text-secondary font-medium">
                      {cert.level}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight mb-2.5 group-hover:text-accent transition-colors line-clamp-2">
                    {cert.title}
                  </h3>

                  {/* Issuer & Date */}
                  <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
                    <span className="flex items-center gap-1.5 font-medium">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4" />
                      </svg>
                      {cert.issuer}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {cert.date}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3 mb-4">
                    {cert.description}
                  </p>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                  {cert.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-bg-primary text-text-secondary border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Fullscreen Modal ── */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative bg-bg-secondary rounded-xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] my-auto overflow-y-auto border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-bg-primary/90 border border-border flex items-center justify-center text-text-primary hover:bg-accent hover:text-white transition-colors cursor-pointer shadow-md"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-52 sm:h-72 md:h-96 bg-bg-primary p-2 sm:p-4 flex items-center justify-center">
              <Image
                src={selectedCert.image}
                alt={selectedCert.title}
                fill
                className="object-contain p-2 sm:p-4"
              />
            </div>

            {/* Modal Details */}
            <div className="p-4 sm:p-8">
              <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                <span className={`text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full ${
                  selectedCert.category === "Achievement"
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                }`}>
                  {selectedCert.category === "Achievement" ? "🏆 " : "📜 "}
                  {selectedCert.category}
                </span>
                <span className="text-[11px] sm:text-xs text-text-secondary font-medium">
                  {selectedCert.level}
                </span>
              </div>

              <h2 className="text-xl sm:text-3xl font-bold text-text-primary tracking-tight mb-3 sm:mb-4">
                {selectedCert.title}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-5 sm:mb-6 p-3 sm:p-4 rounded-xl bg-bg-primary/60 border border-border text-xs sm:text-sm">
                <div>
                  <span className="text-text-secondary block text-[11px] sm:text-xs">Issuer</span>
                  <span className="font-semibold text-text-primary">{selectedCert.issuer}</span>
                </div>
                <div>
                  <span className="text-text-secondary block text-[11px] sm:text-xs">Date</span>
                  <span className="font-semibold text-text-primary">{selectedCert.date}</span>
                </div>
                <div>
                  <span className="text-text-secondary block text-[11px] sm:text-xs">Credential ID</span>
                  <span className="font-semibold text-text-primary break-all">{selectedCert.credentialId}</span>
                </div>
              </div>

              <p className="text-xs sm:text-base text-text-secondary leading-relaxed mb-5 sm:mb-6">
                {selectedCert.description}
              </p>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-text-secondary block mb-2 sm:mb-2.5">
                  Skills Validated
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedCert.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-[11px] sm:text-xs font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {selectedCert.verificationUrl && (
                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-border flex justify-end">
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 transition-colors shadow-sm"
                  >
                    <span>Verify Credential</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Simple Footer */}
      <SimpleFooter />
    </div>
  );
}
