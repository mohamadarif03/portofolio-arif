"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate, useInView, useScroll, useMotionValueEvent } from "framer-motion";
import ArrowFillButton from "@/components/ui/arrow-fill-button";
import PageMascot from "@/components/PageMascot";
import { ThemeToggle } from "@/components/ui/circular-theme-reveal";
import { Testimonial } from "@/components/ui/design-testimonial";
import ProjectsSection from "@/components/ProjectsSection";
import PanoramicSpreadHero from "@/components/ui/panoramic-spread-hero";
import KineticGrid from "@/components/ui/kinetic-grid";
import GithubSkylineSection from "@/components/GithubSkylineSection";
import CinematicFooter from "@/components/ui/motion-footer";
import SiteNavbar from "@/components/SiteNavbar";
import { SiReact, SiNextdotjs, SiPython, SiTypescript, SiNodedotjs, SiTailwindcss, SiPostgresql, SiFramer, SiGit, SiPandas } from "react-icons/si";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaGlobe } from "react-icons/fa";
import { cn } from "@/lib/utils";

const SKILLS = [
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Python', icon: SiPython },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Pandas', icon: SiPandas },
  { name: 'Framer Motion', icon: SiFramer },
  { name: 'Git', icon: SiGit },
];

// --- ANIMATION VARIANTS ---

// Parent container (orchestrator with staggerChildren)
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      // Total duration will be around 1.35s
    },
  },
};

// 1. Background grid (Fade-in canvas)
const bgVariants: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

// 2. Navbar (Fade-in + slide-down)
const navVariants: any = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

// 3 & 4. Titles container (orchestrator for words + subheading)
const titlesContainerVariants: any = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const wordVariants: any = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const subHeadingVariants: any = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// 5. Illustration (Scale-up + fade-in)
const imageVariants: any = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

// 6. Stats list (Staggered rows)
const statsContainerVariants: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const statItemVariants: any = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// 7. Right Description (Slide from right)
const descVariants: any = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// 8. Download CTA Button (Slide-up)
const buttonVariants: any = {
  hidden: { y: 15, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

// 9. Social icons (Simple fade-in)
const socialVariants: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

// --- ABOUT SECTION VARIANTS ---

// 1. Photo (Slide from left)
const photoVariants: any = {
  hidden: { x: -30, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { duration: 0.7, ease: "easeOut" } 
  }
};

// 2. Paragraf deskripsi (Fade-in + slide-up, delayed slightly)
const descAboutVariants: any = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.5, ease: "easeOut", delay: 0.15 } 
  }
};

// 3. Experience Timeline Container (Staggered items)
const timelineContainerVariants: any = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.25 }
  }
};

const timelineRowVariants: any = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
};

const timelineLineVariants: any = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

// 4. Name & Role (Simple fade-in, delayed)
const nameVariants: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, delay: 0.6, ease: "easeOut" } }
};

// 5. Social Icons in About (Staggered fade-in, appears last)
const aboutSocialListVariants: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.7 } }
};

const aboutSocialItemVariants: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
};


// --- CUSTOM COMPONENT ---

// CountUp component using framer-motion native primitives
function StatItem({ 
  value, 
  label, 
  orientation = "horizontal" 
}: { 
  value: number; 
  label: React.ReactNode; 
  orientation?: "horizontal" | "vertical"; 
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (inView) {
      // 1.2s count up with easeOut to prevent linear robotic feel
      const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, value]);

  if (orientation === "vertical") {
    return (
      <motion.div variants={statItemVariants} className="flex flex-col items-center text-center gap-1 sm:gap-1.5" ref={nodeRef}>
        <div className="flex items-center text-2xl sm:text-3xl font-bold text-text-primary">
          <motion.span>{rounded}</motion.span>
          <span>+</span>
        </div>
        <span className="text-[10px] sm:text-[11px] text-text-secondary tracking-[0.06em] uppercase leading-tight font-medium">
          {label}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div variants={statItemVariants} className="flex items-center gap-5" ref={nodeRef}>
      <div className="flex items-center text-4xl md:text-5xl font-bold">
        <motion.span>{rounded}</motion.span>
        <span>+</span>
      </div>
      <span className="text-[11px] md:text-xs text-text-secondary tracking-[0.1em] uppercase w-24 leading-tight font-medium">
        {label}
      </span>
    </motion.div>
  );
}


// --- MAIN PAGE ---

export default function Home() {
  const { scrollY } = useScroll();
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const threshold = window.innerHeight;
      setIsPastHero(window.scrollY >= threshold);
    };
    checkScroll();
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = typeof window !== "undefined" ? window.innerHeight : 800;
    setIsPastHero(latest >= threshold);
  });

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen relative overflow-x-clip bg-bg-primary text-text-primary"
    >
      
      {/* Sticky Animated Navbar */}
      <SiteNavbar />

      {/* Hero Section (Stationary Pinned Hero) */}
      <div 
        className={cn(
          "sticky top-0 h-screen w-full z-0 overflow-hidden bg-bg-primary",
          isPastHero && "invisible pointer-events-none"
        )}
      >
        <div className="h-full w-full">
          <KineticGrid className="h-full w-full relative">
            <main className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-[12vh] h-full flex flex-col items-center justify-between pointer-events-none">
        
        {/* 3 & 4. Titles */}
        <motion.div variants={titlesContainerVariants} className="text-center z-10 space-y-2 md:space-y-3 mt-2 sm:mt-4 px-4 pointer-events-auto">
          {/* Text reveal per-kata */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary flex justify-center gap-[0.25em] flex-wrap">
            {"Hi I'm Arif".split(" ").map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.h2 variants={subHeadingVariants} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif italic text-text-primary/90 font-light tracking-wide inline-block">
            Web Developer & Data Enthusiast
          </motion.h2>

          {/* 7a. Mobile Description (Disimpan di bawah subtitle agar terbaca rapi di mobile) */}
          <motion.p variants={subHeadingVariants} className="lg:hidden text-xs sm:text-sm text-text-secondary max-w-sm sm:max-w-md mx-auto pt-2 px-2 leading-relaxed font-normal">
            Passionate web developer currently expanding into data science, driven to create smarter and more impactful digital solutions.
          </motion.p>
        </motion.div>

        {/* Mobile: Character Photo & Stats Card seamlessly integrated */}
        <div className="lg:hidden relative w-full flex flex-col items-center mt-3 mb-4">
          {/* Character Mascot - sits directly flush into the card top */}
          <motion.div 
            variants={imageVariants} 
            className="relative z-0 -mb-5 sm:-mb-7 flex justify-center items-end w-full max-w-[320px] sm:max-w-[380px] pointer-events-auto"
          >
            <PageMascot size={300} />
          </motion.div>

          {/* Stats Card - character emerges seamlessly from behind this card */}
          <motion.div 
            variants={statsContainerVariants} 
            className="relative z-10 w-[92%] max-w-md mx-auto grid grid-cols-3 gap-2 py-3.5 px-3 rounded-2xl bg-bg-secondary/95 border border-border backdrop-blur-md shadow-2xl pointer-events-auto"
          >
            <StatItem value={3} label={<>Years<br/>Experience</>} orientation="vertical" />
            <StatItem value={15} label={<>Projects<br/>Completed</>} orientation="vertical" />
            <StatItem value={20} label={<>Certificates<br/>Achieved</>} orientation="vertical" />
          </motion.div>
        </div>

        {/* Desktop: Center Mascot (lg+) */}
        <motion.div 
          variants={imageVariants} 
          className="hidden lg:flex absolute -bottom-6 xl:-bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[720px] justify-center items-end z-10 pointer-events-auto"
        >
          <PageMascot />
        </motion.div>

        {/* Desktop: Left Stats (lg+) */}
        <motion.div variants={statsContainerVariants} className="hidden lg:flex absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 flex-col gap-10 z-10 pointer-events-auto">
          <StatItem value={3} label={<>Years<br/>Experience</>} />
          <StatItem value={15} label={<>Projects<br/>Completed</>} />
          <StatItem value={20} label={<>Certificates<br/>Achieved</>} />
        </motion.div>

        {/* 7b. Desktop Right Text (lg+) */}
        <motion.div variants={descVariants} className="hidden lg:block absolute right-8 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 w-64 xl:w-72 z-10 pointer-events-auto">
          <p className="text-sm md:text-base text-text-primary leading-relaxed font-medium">
            Passionate web developer currently expanding into data science, driven to create smarter and more impactful digital solutions.
          </p>
        </motion.div>

        {/* 8a & 9a. Mobile Bottom Controls (< lg) */}
        <div className="lg:hidden w-full px-6 pb-8 pt-1 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-5 z-10 pointer-events-auto max-w-md mx-auto">
          <motion.div variants={socialVariants} className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[14px] sm:text-[15px] font-medium text-text-secondary">
            <Link href="https://www.linkedin.com/in/mohamad-arif-68402627a/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors py-2 min-h-[44px] flex items-center">LinkedIn</Link>
            <Link href="https://github.com/mohamadarif03" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors py-2 min-h-[44px] flex items-center">GitHub</Link>
            <Link href="https://www.instagram.com/mhmdarif346/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors py-2 min-h-[44px] flex items-center">Instagram</Link>
            <Link href="mailto:mohamadarif5392@gmail.com" className="hover:text-text-primary transition-colors py-2 min-h-[44px] flex items-center">Email</Link>
          </motion.div>
          <motion.div variants={buttonVariants}>
            <ArrowFillButton 
              href="/CV_Mohamad_Arif.pdf" 
              btnText="Download CV" 
              className="bg-accent hover:bg-accent-hover"
              bgColor="#2563EB"
              textColor="#ffffff"
              fillBgColor="#ffffff"
              fillTextColor="#2563EB"
              hoverFillBgColor="#ffffff"
              hoverFillTextColor="#1D4ED8"
            />
          </motion.div>
        </div>

        {/* 9b. Desktop Bottom Left Links (lg+) */}
        <motion.div variants={socialVariants} className="hidden lg:flex absolute bottom-10 left-8 md:left-16 lg:left-24 gap-6 text-[15px] font-medium text-text-secondary z-10 pointer-events-auto">
          <Link href="https://www.linkedin.com/in/mohamad-arif-68402627a/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">LinkedIn</Link>
          <Link href="https://github.com/mohamadarif03" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">GitHub</Link>
          <Link href="https://www.instagram.com/mhmdarif346/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">Instagram</Link>
          <Link href="mailto:mohamadarif5392@gmail.com" className="hover:text-text-primary transition-colors">Email</Link>
        </motion.div>

        {/* 8b. Desktop Bottom Right Button (lg+) */}
        <motion.div variants={buttonVariants} className="hidden lg:block absolute bottom-10 right-8 md:right-16 lg:right-24 z-10 pointer-events-auto">
          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
            <ArrowFillButton 
              href="/CV_Mohamad_Arif.pdf" 
              btnText="Download CV" 
              className="bg-accent hover:bg-accent-hover"
              bgColor="#2563EB"
              textColor="#ffffff"
              fillBgColor="#ffffff"
              fillTextColor="#2563EB"
              hoverFillBgColor="#ffffff"
              hoverFillTextColor="#1D4ED8"
            />
          </motion.div>
        </motion.div>

      </main>
      </KineticGrid>
        </div>
      </div>

      {/* Overlapping Content Sheet covering the Hero */}
      <div className="relative z-20 bg-bg-primary shadow-[0_-25px_60px_rgba(0,0,0,0.6)] border-b border-border">
        {/* Skills Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full overflow-hidden bg-bg-secondary py-3 md:py-4 border-y border-border relative pointer-events-auto"
        >
        <div className="flex w-fit animate-marquee hover:[animation-play-state:paused]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {SKILLS.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex items-center gap-2.5 group">
                    <skill.icon className="text-2xl md:text-3xl text-text-primary/40 group-hover:text-accent transition-colors cursor-default" />
                    <span className="text-lg md:text-xl font-bold text-text-primary/40 group-hover:text-accent transition-colors cursor-default whitespace-nowrap">{skill.name}</span>
                  </div>
                  <span className="text-text-primary/10 text-sm md:text-base mx-8 md:mx-12">●</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* About & Career Journey Section */}
      <section id="about" aria-labelledby="about-title" className="w-full relative z-20 pointer-events-auto bg-bg-primary">
        <div className="py-16 md:py-24 max-w-6xl mx-auto px-8 md:px-12">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-12 md:mb-16"
          >
            <h2 id="about-title" className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
              About <span className="font-serif italic font-light text-text-primary/80">Me</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[4fr_6fr] gap-12 lg:gap-20 items-center">
            {/* Left Column (Photo & Info) */}
            <div className="w-full">
              {/* Animated Photo with Hover Interaction */}
              <motion.div 
                variants={photoVariants}
                initial="hidden"
                whileInView="visible"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="w-full aspect-square rounded-[2rem] overflow-hidden bg-bg-secondary mb-6 relative border border-border cursor-default"
              >
                <Image 
                  src="/photo.webp" 
                  alt="Mohamad Arif"
                  fill
                  className="object-cover grayscale hover:grayscale-[40%] transition-all duration-[400ms] ease-out"
                />
              </motion.div>
              <div className="flex justify-between items-end px-2">
                {/* Animated Social Icons with Micro-interaction */}
                <motion.div 
                  variants={aboutSocialListVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-4 text-text-secondary"
                >
                  <motion.div 
                    variants={aboutSocialItemVariants}
                    whileHover={{ scale: 1.15, y: -3, transition: { duration: 0.25, ease: "easeOut" } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="https://github.com/mohamadarif03" target="_blank" rel="noopener noreferrer" aria-label="GitHub Mohamad Arif" className="block text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer">
                      <FaGithub className="w-5 h-5" />
                    </Link>
                  </motion.div>
                  <motion.div 
                    variants={aboutSocialItemVariants}
                    whileHover={{ scale: 1.15, y: -3, transition: { duration: 0.25, ease: "easeOut" } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="https://www.linkedin.com/in/mohamad-arif-68402627a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Mohamad Arif" className="block text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer">
                      <FaLinkedin className="w-5 h-5" />
                    </Link>
                  </motion.div>
                  <motion.div 
                    variants={aboutSocialItemVariants}
                    whileHover={{ scale: 1.15, y: -3, transition: { duration: 0.25, ease: "easeOut" } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="https://www.instagram.com/mhmdarif346/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Mohamad Arif" className="block text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer">
                      <FaInstagram className="w-5 h-5" />
                    </Link>
                  </motion.div>
                  <motion.div 
                    variants={aboutSocialItemVariants}
                    whileHover={{ scale: 1.15, y: -3, transition: { duration: 0.25, ease: "easeOut" } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="mailto:mohamadarif5392@gmail.com" aria-label="Email Mohamad Arif" className="block text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer">
                      <FaEnvelope className="w-5 h-5" />
                    </Link>
                  </motion.div>
                </motion.div>
                {/* Animated Name & Role */}
                <motion.div 
                  variants={nameVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-right"
                >
                  <h3 className="font-bold text-text-primary text-lg leading-tight">Mohamad Arif</h3>
                  <p className="text-accent text-sm font-medium">Data Enthusiast</p>
                </motion.div>
              </div>
            </div>

            {/* Right Column (Text & Timeline) */}
            <div className="w-full flex flex-col justify-center h-full">
              {/* Animated Description Paragraph */}
              <motion.p 
                variants={descAboutVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="text-text-primary/90 leading-relaxed mb-12 text-sm md:text-base font-medium"
              >
                A passionate web developer and data enthusiast focusing on creating intuitive digital experiences. I&apos;ve collaborated with teams to design products that blend usability and aesthetics, focusing on solving problems through a design thinking journey process.
              </motion.p>

              {/* Animated Experience Timeline */}
              <motion.div 
                variants={timelineContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col w-full relative"
              >
                {/* Top border line */}
                <motion.div variants={timelineLineVariants} className="absolute top-0 left-0 right-0 h-[1px] bg-border origin-left" />
                
                {[
                  { role: "Fullstack Developer", company: "PBM Agency", year: "2026 → Now" },
                  { role: "Data Science", company: "BCC Community", year: "2026 → Now" },
                  { role: "Web Developer", company: "Jobnation.id", year: "2025 → 2026" },
                  { role: "Web Dev & Tech Mentor", company: "PT Hummatech", year: "2023 → 2025" },
                ].map((exp, i) => (
                  <motion.div key={i} variants={timelineRowVariants} className="relative group cursor-pointer rounded-lg transition-colors duration-[250ms] ease-out hover:bg-bg-secondary">
                    <div className="flex justify-between items-center py-5 transition-all duration-[250ms] ease-out group-hover:px-2">
                      {/* Role moves to right on hover */}
                      <span className="text-text-primary font-medium flex-1 text-sm md:text-base transform transition-transform duration-[250ms] ease-out group-hover:translate-x-1">
                        {exp.role}
                      </span>
                      {/* Company with animated underline */}
                      <span className="flex-1 text-center text-sm md:text-base group/company inline-flex justify-center">
                        <span className="relative inline-block text-accent hover:text-blue-500 transition-colors duration-200">
                          {exp.company}
                          <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-blue-500 transition-all duration-300 ease-out group-hover/company:w-full"></span>
                        </span>
                      </span>
                      <span className="text-text-secondary flex-1 text-right text-sm md:text-base">
                        {exp.year}
                      </span>
                    </div>
                    {/* Bottom animated border for each row, turns blue on hover */}
                    <motion.div 
                      variants={timelineLineVariants} 
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-border origin-left transition-colors duration-[250ms] ease-out group-hover:bg-accent" 
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" aria-label="Key Highlights" className="w-full relative z-20 pointer-events-auto border-t border-border">
        <Testimonial />
      </section>

      {/* Projects Section */}
      <div className="border-t border-border">
        <ProjectsSection />
      </div>

      {/* Certifications 3D Panoramic Exhibition Section */}
      <div id="certifications" className="border-t border-border">
        <PanoramicSpreadHero />
      </div>

      {/* GitHub Activity & Contribution Skyline Section */}
      <GithubSkylineSection />

      </div>

      {/* Cinematic Motion Footer */}
      <CinematicFooter />

    </motion.div>
  );
}
