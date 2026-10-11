"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SiteNavbar from "@/components/SiteNavbar";
import SimpleFooter from "@/components/SimpleFooter";
import { PROJECTS, Project } from "@/data/projects";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const categories = ["All", "Web Development", "Data Science"];

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  const totalCount = PROJECTS.length;
  const webDevCount = PROJECTS.filter((p) => p.category === "Web Development").length;
  const dataScienceCount = PROJECTS.filter((p) => p.category === "Data Science").length;

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/20">
      <SiteNavbar />

      {/* ── 1. Hero Section ── */}
      <section className="pt-32 sm:pt-40 md:pt-44 pb-12 sm:pb-16 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <span className="font-serif italic text-lg text-accent mb-3 block">
            / Portfolio
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-text-primary mb-4">
            My <span className="text-accent/80 font-serif italic font-light">Projects</span>
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 max-w-2xl">
            A curated collection of projects spanning web development and data science, each crafted with purpose, precision, and a passion for solving real-world problems.
          </p>

          {/* Stats Pills Row */}
          <div className="flex gap-3 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 bg-bg-secondary rounded-full border border-border shadow-sm">
              <span className="text-lg sm:text-xl font-bold text-text-primary">{totalCount}</span>
              <span className="text-xs sm:text-sm text-text-secondary font-medium">Total Projects</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 bg-bg-secondary rounded-full border border-border shadow-sm">
              <span className="text-lg sm:text-xl font-bold text-accent">{webDevCount}</span>
              <span className="text-xs sm:text-sm text-text-secondary font-medium">Web Development</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 bg-bg-secondary rounded-full border border-border shadow-sm">
              <span className="text-lg sm:text-xl font-bold text-purple-400">{dataScienceCount}</span>
              <span className="text-xs sm:text-sm text-text-secondary font-medium">Data Science</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Content & Grid ── */}
      <section className="pb-24 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto">
        
        {/* Category Filter Tabs */}
        <div className="flex gap-2.5 sm:gap-3 mb-10 flex-wrap">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                activeFilter === cat
                  ? "bg-accent text-white border-accent shadow-md shadow-accent/20"
                  : "bg-bg-secondary text-text-secondary border-border hover:border-accent/40 hover:text-text-primary"
              }`}
            >
              {cat === "All" && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              )}
              {cat === "Web Development" && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              )}
              {cat === "Data Science" && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              )}
              <span>{cat}</span>
              <span className={`inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold ${
                activeFilter === cat ? "bg-white/25 text-white" : "bg-bg-primary text-text-secondary"
              }`}>
                {cat === "All" ? totalCount : cat === "Web Development" ? webDevCount : dataScienceCount}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="h-full"
              >
                <Link
                  href={`/project/${project.slug}`}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="flex flex-col h-full bg-bg-secondary rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group"
                >
                  {/* Image Preview Container */}
                  <div className="relative w-full h-56 sm:h-64 bg-bg-primary overflow-hidden shrink-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Top overlay badges */}
                    <div className="absolute top-3 inset-x-3 flex justify-between items-center z-10 pointer-events-none">
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/10">
                        {project.type}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-accent text-white backdrop-blur-md">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Category & Role */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          project.category === "Data Science"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            : "bg-accent/10 text-accent border border-accent/20"
                        }`}>
                          {project.category}
                        </span>
                        <span className="text-xs text-text-secondary font-medium">
                          {project.role}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight mb-2.5 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 mb-5">
                        {project.description}
                      </p>

                      {/* Highlights */}
                      {project.highlights && project.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.highlights.slice(0, 3).map((hl, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full"
                            >
                              <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span className="line-clamp-1">{hl}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/60">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium text-text-secondary bg-bg-primary border border-border px-2.5 py-1 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-text-secondary text-base">
            No projects found in this category yet.
          </div>
        )}
      </section>

      {/* Simple Footer */}
      <SimpleFooter />
    </div>
  );
}
