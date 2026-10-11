"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import SiteNavbar from "@/components/SiteNavbar";
import SimpleFooter from "@/components/SimpleFooter";
import { PROJECTS, Project } from "@/data/projects";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const project = useMemo(() => {
    return PROJECTS.find((p) => p.slug === slug);
  }, [slug]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Other projects for sidebar
  const otherProjects = useMemo(() => {
    return PROJECTS.filter((p) => p.slug !== slug).slice(0, 3);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-text-secondary mb-6">The project you are looking for does not exist.</p>
        <Link href="/projects" className="px-6 py-2.5 rounded-full bg-accent text-white font-medium hover:bg-accent-hover transition-colors">
          Back to Projects
        </Link>
      </div>
    );
  }

  const galleryImages = project.images && project.images.length > 0 ? project.images : [project.image];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/20">
      <SiteNavbar />

      <main className="pt-32 sm:pt-40 md:pt-44 pb-20 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary mb-8 sm:mb-10" aria-label="Breadcrumb">
          <Link href="/" className="text-accent hover:underline font-medium">Home</Link>
          <span className="text-border">/</span>
          <Link href="/projects" className="text-accent hover:underline font-medium">Projects</Link>
          <span className="text-border">/</span>
          <span className="text-text-primary font-semibold truncate max-w-[200px] sm:max-w-none">{project.title}</span>
        </nav>

        {/* Hero Image Gallery */}
        <div className="mb-12 sm:mb-16">
          <div className="relative w-full h-64 sm:h-[420px] md:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden bg-bg-secondary border border-border shadow-xl">
            <Image
              src={galleryImages[activeImageIndex] || project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 sm:w-32 h-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-accent ring-2 ring-accent/30 opacity-100"
                      : "border-border opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image src={img} alt={`${project.title} thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Project Content & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-start">
          
          {/* Main Content */}
          <div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary mb-6">
              {project.title}
            </h1>

            {/* Meta tags & Visit Website Button */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap mb-10 pb-8 border-b border-border">
              <span className="text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                {project.type}
              </span>
              <span className={`text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border ${
                project.category === "Data Science"
                  ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                  : "bg-blue-500/10 text-blue-400 border-blue-500/20"
              }`}>
                {project.category}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-bg-secondary text-text-secondary border border-border">
                {project.year}
              </span>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:ml-auto inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-white text-xs sm:text-sm font-semibold hover:bg-accent-hover transition-colors shadow-md"
                >
                  Visit Website
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>

            {/* About Section */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-4">
                About The Project
              </h2>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-bg-secondary/60 rounded-2xl p-6 sm:p-8 border border-border">
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-text-secondary mb-2">
                    Role
                  </h3>
                  <p className="text-base font-semibold text-text-primary">{project.role}</p>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-text-secondary mb-2">
                    Year
                  </h3>
                  <p className="text-base font-semibold text-text-primary">{project.year}</p>
                </div>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="sm:col-span-2 pt-4 border-t border-border">
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-text-secondary mb-3">
                      Key Highlights
                    </h3>
                    <ul className="space-y-2 text-sm sm:text-base text-text-secondary">
                      {project.highlights.map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-accent mt-1">•</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="sm:col-span-2 pt-4 border-t border-border">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-text-secondary mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg bg-bg-primary text-text-primary border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Other Projects */}
          <aside className="lg:sticky lg:top-28 w-full bg-bg-secondary rounded-2xl p-6 border border-border">
            <h3 className="text-xl font-bold text-text-primary tracking-tight mb-5">
              Other Projects
            </h3>
            <div className="flex flex-col gap-4">
              {otherProjects.map((other) => (
                <Link
                  key={other.slug}
                  href={`/project/${other.slug}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-bg-primary/80 transition-all border border-transparent hover:border-border group"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-bg-primary">
                    <Image src={other.image} alt={other.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors line-clamp-1">
                      {other.title}
                    </h4>
                    <span className="text-xs text-text-secondary font-medium">
                      {other.category}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </main>

      {/* Simple Footer */}
      <SimpleFooter />
    </div>
  );
}
