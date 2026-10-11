"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import SiteNavbar from "@/components/SiteNavbar";
import SimpleFooter from "@/components/SimpleFooter";

// ── Motion Animation Helpers ──
function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const dirs = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
    none: { y: 0, x: 0 },
  };

  const { x, y } = dirs[direction] || dirs.up;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScaleIn({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = "",
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const dirs = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };
  const { x, y } = dirs[direction] || dirs.up;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x, y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Experiences Data ──
interface Role {
  title: string;
  type: string;
  period: string;
  location: string;
  description: string;
  bullets?: string[];
  skills?: string[];
}

interface Experience {
  company: string;
  logo: string;
  totalDuration: string;
  roles: Role[];
}

const EXPERIENCES: Experience[] = [
  {
    company: "BCC Community",
    logo: "/exp/bcc.webp",
    totalDuration: "1 mo",
    roles: [
      {
        title: "Member - Data Science",
        type: "Learning Community",
        period: "May 2026 - Present",
        location: "Malang, East Java, Indonesia · On-site",
        description:
          "Joined a Data Science learning community as a regular member, focusing on building a foundation in modern AI technologies.",
        bullets: [
          "Currently studying machine learning concepts and the basics of deep learning.",
          "Completed a machine learning classification project for predictive modeling.",
          "Developing practical skills in data analysis, data modeling, and neural networks.",
        ],
        skills: [
          "Python",
          "Pandas",
          "NumPy",
          "Scikit-learn",
          "Machine Learning",
          "Deep Learning",
          "Neural Network",
          "Data Analyst",
          "Modelling",
        ],
      },
    ],
  },
  {
    company: "Jobnation.id",
    logo: "/exp/jobnation.webp",
    totalDuration: "1 yr",
    roles: [
      {
        title: "Web Developer",
        type: "Freelance",
        period: "Jun 2025 - Jun 2026 · 1 yr",
        location: "Malang, East Java, Indonesia · Hybrid",
        description:
          "Developed and maintained full-stack web features for a job-platform product serving thousands of users.",
        bullets: [
          "Built RESTful APIs and integrated third-party services using Laravel and PHP.",
          "Improved front-end performance and UX by refactoring legacy jQuery code into modern React components.",
          "Collaborated closely with product and design teams in an Agile sprint workflow.",
          "Implemented responsive designs and ensured cross-browser compatibility across the platform.",
        ],
        skills: [
          "Laravel",
          "React",
          "PHP",
          "REST API",
          "jQuery",
          "Bootstrap",
          "JavaScript",
          "Agile",
          "Responsive Design",
        ],
      },
    ],
  },
  {
    company: "PT Humma Teknologi",
    logo: "/exp/hummatech.webp",
    totalDuration: "2 yrs 7 mos",
    roles: [
      {
        title: "Mentor - Kelas Industri",
        type: "Contract",
        period: "Jan 2024 - Jan 2025 · 1 yr",
        location: "Malang, East Java, Indonesia · Hybrid",
        description:
          "Mentored 100+ students from 4+ different schools throughout my tenure, delivering comprehensive programming curricula.",
        bullets: [
          "Conducted active weekly online teaching sessions and regular on-site school visits to provide hands-on mentoring.",
          "Taught fundamental and advanced concepts in Basic Java, Laravel, JavaScript, HTML, CSS, and PHP.",
          "Guided students through practical coding exercises and project-based learning to build real-world skills.",
        ],
        skills: [
          "Teaching",
          "Mentoring",
          "Java",
          "Laravel",
          "JavaScript",
          "HTML",
          "CSS",
          "PHP",
        ],
      },
      {
        title: "Web Developer",
        type: "Contract",
        period: "Jan 2024 - Jan 2025 · 1 yr 1 mo",
        location: "Malang, East Java, Indonesia · On-site",
        description:
          "Developed and maintained web-based systems, including school management platforms, license/code selling systems, and online course platforms using Laravel.",
        bullets: [
          "Built and shipped 5+ production web applications for various client industries.",
          "Designed database schemas and implemented complex business logic with Laravel Eloquent ORM.",
          "Integrated payment gateways and third-party APIs into client applications.",
          "Collaborated with UI/UX designers to translate Figma mockups into pixel-perfect interfaces.",
        ],
        skills: ["Laravel", "Nuxt.js", "MySQL", "Figma"],
      },
      {
        title: "Web Developer Intern",
        type: "Internship",
        period: "Jan 2024 - Jun 2024 · 6 mos",
        location: "Malang, East Java, Indonesia · On-site",
        description:
          "Assisted senior developers in building and maintaining web applications using Laravel and PHP.",
        bullets: [
          "Created responsive front-end interfaces using Bootstrap and vanilla JavaScript.",
          "Debugged and fixed issues in production environments, improving system reliability.",
          "Gained hands-on experience with Git workflows and agile development practices.",
        ],
        skills: ["Laravel", "Bootstrap", "JavaScript", "Git"],
      },
    ],
  },
];

const STATS = [
  { number: "3+", label: "Years Experience" },
  { number: "15+", label: "Projects Completed" },
  { number: "20+", label: "Certificates Achieved" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/20">
      <SiteNavbar />

      {/* ── 1. About Hero Section ── */}
      <section className="pt-32 sm:pt-40 md:pt-44 pb-16 md:pb-24 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* Left: Bio & Stats */}
        <FadeIn direction="left" delay={0.2} className="flex-1 w-full max-w-2xl">
          <span className="font-serif italic text-lg text-accent mb-3 block">
            / About Me
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-text-primary mb-3">
            Mohamad <span className="text-accent/80 font-serif italic font-light">Arif</span>
          </h1>
          <div className="inline-block py-2 px-5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6 border border-accent/20">
            Web Developer &amp; Data Enthusiast
          </div>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-10 max-w-xl">
            A passionate web developer and data enthusiast based in Indonesia, focused on
            crafting intuitive digital experiences that blend functionality with aesthetics.
            I&apos;ve collaborated with teams to design products that solve real-world problems
            through a design thinking process, always pushing boundaries since 2023.
          </p>

          {/* Stats Row */}
          <StaggerContainer staggerDelay={0.1} className="flex gap-8 sm:gap-12 flex-wrap">
            {STATS.map((stat, i) => (
              <StaggerItem key={i} direction="up">
                <div className="flex flex-col gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
                    {stat.number}
                  </span>
                  <span className="text-xs sm:text-sm text-text-secondary uppercase tracking-wider font-semibold">
                    {stat.label}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeIn>

        {/* Right: Photo & Social Links */}
        <FadeIn direction="right" delay={0.3} className="w-full max-w-md lg:max-w-sm flex flex-col items-center gap-6">
          <ScaleIn delay={0.4} className="w-full">
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full aspect-square rounded-3xl overflow-hidden shadow-2xl bg-bg-secondary border border-border relative group"
            >
              <Image
                src="/photo.webp"
                alt="Mohamad Arif"
                fill
                priority
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </motion.div>
          </ScaleIn>

          {/* Social Icons Row */}
          <div className="flex gap-4 flex-wrap">
            <motion.a
              href="https://www.linkedin.com/in/mohamad-arif-68402627a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              whileHover={{ y: -4, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="w-12 h-12 rounded-full bg-bg-secondary border border-border flex items-center justify-center text-text-primary hover:bg-accent hover:text-white transition-colors shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://github.com/mohamadarif03"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              whileHover={{ y: -4, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="w-12 h-12 rounded-full bg-bg-secondary border border-border flex items-center justify-center text-text-primary hover:bg-accent hover:text-white transition-colors shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://www.instagram.com/mhmdarif346/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              whileHover={{ y: -4, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="w-12 h-12 rounded-full bg-bg-secondary border border-border flex items-center justify-center text-text-primary hover:bg-accent hover:text-white transition-colors shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.79-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </motion.a>

            <motion.a
              href="mailto:mohamadarif5392@gmail.com"
              aria-label="Email"
              whileHover={{ y: -4, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="w-12 h-12 rounded-full bg-bg-secondary border border-border flex items-center justify-center text-text-primary hover:bg-accent hover:text-white transition-colors shadow-sm"
            >
              <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </motion.a>
          </div>
        </FadeIn>
      </section>

      {/* ── 2. Journey & Experience Section ── */}
      <section className="py-20 md:py-28 px-6 sm:px-8 md:px-12 bg-bg-secondary/40 border-t border-border">
        <div className="max-w-4xl mx-auto">
          
          {/* Section Header */}
          <FadeIn direction="up">
            <div className="mb-14 md:mb-16">
              <span className="font-serif italic text-lg text-accent mb-2 block">
                / Experience
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary mb-4">
                My <span className="text-accent/80 font-serif italic font-light">Journey</span>
              </h2>
              <p className="text-text-secondary text-base sm:text-lg max-w-xl">
                Here is a detailed look at what I have been building, learning, and contributing throughout my career.
              </p>
            </div>
          </FadeIn>

          {/* Experience Cards List */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {EXPERIENCES.map((exp, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.15}>
                <ExperienceCard experience={exp} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <SimpleFooter />
    </div>
  );
}

// ── ExperienceCard Component ──
function ExperienceCard({ experience }: { experience: Experience }) {
  const hasMultipleRoles = experience.roles.length > 1;

  return (
    <div className="bg-bg-secondary rounded-2xl border border-border p-6 sm:p-8 hover:border-accent/40 transition-colors shadow-sm">
      
      {/* Company Header */}
      <div className="flex items-center gap-4 mb-7 pb-5 border-b border-border">
        <div className="w-14 h-14 rounded-xl bg-bg-primary border border-border flex items-center justify-center p-2.5 shrink-0 overflow-hidden">
          <Image
            src={experience.logo}
            alt={experience.company}
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            {experience.company}
          </h3>
          <span className="text-xs sm:text-sm text-text-secondary font-medium">
            {experience.totalDuration}
          </span>
        </div>
      </div>

      {/* Roles Timeline */}
      <div className="flex flex-col">
        {experience.roles.map((role, j) => (
          <RoleItem
            key={j}
            role={role}
            hasTimeline={hasMultipleRoles}
            isLast={j === experience.roles.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

// ── RoleItem Component ──
function RoleItem({
  role,
  hasTimeline,
  isLast,
}: {
  role: Role;
  hasTimeline: boolean;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`flex gap-4 sm:gap-5 ${isLast ? "" : "pb-7"}`}>
      {/* Timeline Indicator for Multi-Role Companies */}
      {hasTimeline && (
        <div className="flex flex-col items-center w-4 shrink-0 pt-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-accent/20 shrink-0" />
          {!isLast && <div className="flex-1 w-[2px] bg-border my-1.5" />}
        </div>
      )}

      {/* Role Content */}
      <div className="flex-1">
        <div className="mb-3">
          <h4 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
            {role.title}
          </h4>
          <p className="text-sm font-medium text-text-secondary">{role.type}</p>
          <p className="text-xs text-text-secondary/80 mt-0.5">{role.period}</p>
          <p className="text-xs text-text-secondary/70">{role.location}</p>
        </div>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-3">
          {role.description}
        </p>

        {/* Expandable Bullets */}
        {role.bullets && role.bullets.length > 0 && (
          <div className="mt-2">
            {expanded && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-text-secondary mb-3 pl-1"
              >
                {role.bullets.map((bullet, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </motion.ul>
            )}

            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-accent hover:text-accent-hover transition-colors py-1 cursor-pointer focus:outline-none"
            >
              {expanded ? (
                <>
                  Show less
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </>
              ) : (
                <>
                  Show more
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}

        {/* Skills Tags */}
        {role.skills && role.skills.length > 0 && (
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/60 flex-wrap">
            <svg
              className="w-4 h-4 text-accent shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2 2 7l10 5 10-5-10-5Z" />
              <path d="m2 17 10 5 10-5" />
              <path d="m2 12 10 5 10-5" />
            </svg>
            <span className="text-xs sm:text-sm font-medium text-text-secondary">
              {role.skills.join(" · ")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
