"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // On tablet and mobile (<= 1024px), it flows vertically
      if (window.innerWidth <= 1024) {
        track.style.transform = "none";
        return;
      }

      const scrollableDistance = section.offsetHeight - window.innerHeight;
      if (scrollableDistance > 0) {
        const sectionTop = section.offsetTop;
        const clampedProgress = Math.max(
          0,
          Math.min(1, (window.scrollY - sectionTop) / scrollableDistance)
        );
        const maxScroll = track.scrollWidth - window.innerWidth + 80;
        track.style.transform = `translateX(-${clampedProgress * maxScroll}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-title"
      className="relative w-full bg-bg-primary text-text-primary z-20 pointer-events-auto lg:h-[300vh]"
    >
      <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center overflow-hidden px-6 sm:px-10 lg:px-14 py-16 lg:py-0">
        
        {/* Header with FadeIn upward animation */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 lg:mb-12 max-w-6xl mx-auto w-full lg:px-5"
        >
          <span className="font-serif italic text-base lg:text-lg text-accent mb-2.5 block">
            / Selected Work
          </span>
          <h2
            id="projects-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary"
          >
            Recent{" "}
            <span className="font-serif italic font-light text-text-primary/75">
              Projects
            </span>
          </h2>
        </motion.div>

        {/* Projects Track */}
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-8 will-change-transform lg:px-5 max-w-6xl lg:max-w-none mx-auto w-full transition-transform duration-75 ease-out"
        >
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="group relative w-full lg:w-[680px] xl:w-[720px] lg:shrink-0 rounded-2xl overflow-hidden border border-border bg-bg-secondary transition-all duration-300 hover:border-accent/40 hover:scale-[1.01]"
            >
              {/* Image Container with 16:9 ratio */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-bg-secondary">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 720px"
                  priority={index < 2}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/95 group-hover:via-black/60 group-hover:to-black/30 flex flex-col justify-end p-6 sm:p-8">
                  {/* Type Badge - Slides up and reveals on hover */}
                  <span className="text-xs font-mono font-semibold text-accent uppercase tracking-widest mb-2 opacity-100 lg:opacity-0 -translate-y-0 lg:-translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300">
                    {project.type} • {project.year}
                  </span>

                  {/* Project Name */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                    {project.title}
                  </h3>

                  {/* Description - Expands and reveals on hover */}
                  <p className="text-xs sm:text-sm text-white/80 line-clamp-2 lg:line-clamp-none lg:max-h-0 lg:opacity-0 overflow-hidden lg:group-hover:max-h-28 lg:group-hover:opacity-100 transition-all duration-300 ease-out leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack pill tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 pt-3 border-t border-white/10">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/90 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
