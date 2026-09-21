"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { SiReact, SiNextdotjs, SiPython, SiTypescript, SiNodedotjs, SiTailwindcss, SiPostgresql, SiFramer, SiGit, SiPandas } from "react-icons/si";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";

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
function StatItem({ value, label }: { value: number; label: React.ReactNode }) {
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
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen relative overflow-hidden bg-bg-primary text-text-primary"
    >
      
      {/* 1. Background Grid */}
      <motion.div 
        variants={bgVariants}
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:4rem_4rem] z-0"
      />

      {/* 2. Navbar */}
      <motion.nav variants={navVariants} className="flex justify-between items-center px-8 md:px-16 py-8 absolute top-0 w-full z-20">
        <div className="font-serif italic text-2xl font-medium tracking-tight">
          Mohamad Arif
        </div>
        <ul className="hidden md:flex gap-10 text-[15px] font-medium text-text-secondary">
          <li><Link href="/" className="text-accent hover:text-accent-hover transition-colors">Home</Link></li>
          <li><Link href="/about" className="hover:text-text-primary transition-colors">About</Link></li>
          <li><Link href="/project" className="hover:text-text-primary transition-colors">Project</Link></li>
          <li><Link href="/certifications" className="hover:text-text-primary transition-colors">Certifications</Link></li>
          <li><Link href="/contact" className="hover:text-text-primary transition-colors">Contact Us</Link></li>
        </ul>
      </motion.nav>

      <main className="relative pt-[12vh] h-screen flex flex-col items-center justify-between pointer-events-none">
        
        {/* 3 & 4. Titles */}
        <motion.div variants={titlesContainerVariants} className="text-center z-10 space-y-3 mt-4 pointer-events-auto">
          {/* Text reveal per-kata */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary flex justify-center gap-[0.25em] flex-wrap">
            {"Hi I'm Arif".split(" ").map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.h2 variants={subHeadingVariants} className="text-2xl md:text-4xl font-serif italic text-text-primary/90 font-light tracking-wide inline-block">
            Web Developer & Data Enthusiast
          </motion.h2>
        </motion.div>

        {/* 5. Center Image */}
        <motion.div variants={imageVariants} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] flex justify-center items-end z-0">
          <Image 
            src="/hero.png" 
            alt="Mohamad Arif" 
            width={600} 
            height={800} 
            className="object-contain w-auto h-[65vh] md:h-[72vh] object-bottom"
            priority
          />
        </motion.div>

        {/* 6. Left Stats */}
        <motion.div variants={statsContainerVariants} className="hidden lg:flex absolute left-8 md:left-24 top-1/2 -translate-y-1/2 flex-col gap-10 z-10 pointer-events-auto">
          <StatItem value={2} label={<>Years<br/>Experience</>} />
          <StatItem value={15} label={<>Projects<br/>Completed</>} />
          <StatItem value={8} label={<>Certificates<br/>Achieved</>} />
        </motion.div>

        {/* 7. Right Text */}
        <motion.div variants={descVariants} className="hidden lg:block absolute right-8 md:right-24 top-1/2 -translate-y-1/2 w-72 z-10 pointer-events-auto">
          <p className="text-sm md:text-base text-text-primary leading-relaxed font-medium">
            Passionate web developer currently expanding into data science, driven to create smarter and more impactful digital solutions.
          </p>
        </motion.div>

        {/* 9. Bottom Left Links */}
        <motion.div variants={socialVariants} className="absolute bottom-10 left-8 md:left-24 flex gap-6 text-[15px] font-medium text-text-secondary z-10 pointer-events-auto">
          <Link href="#" className="hover:text-text-primary transition-colors">LinkedIn</Link>
          <Link href="#" className="hover:text-text-primary transition-colors">GitHub</Link>
          <Link href="#" className="hover:text-text-primary transition-colors">Instagram</Link>
        </motion.div>

        {/* 8. Bottom Right Button */}
        <motion.div variants={buttonVariants} className="absolute bottom-10 right-8 md:right-24 z-10 pointer-events-auto">
          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
            <ArrowFillButton 
              href="/cv.pdf" 
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

      {/* 10. Skills Marquee */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="w-full overflow-hidden bg-bg-secondary py-3 md:py-4 border-t border-border z-20 relative pointer-events-auto"
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

      {/* 11. Career Journey & About */}
      <section className="w-full relative z-20 pointer-events-auto bg-bg-primary">
        <div className="py-16 md:py-24 max-w-6xl mx-auto px-8 md:px-12">
          
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
                    <Link href="#" className="block text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer">
                      <FaTwitter className="w-5 h-5" />
                    </Link>
                  </motion.div>
                  <motion.div 
                    variants={aboutSocialItemVariants}
                    whileHover={{ scale: 1.15, y: -3, transition: { duration: 0.25, ease: "easeOut" } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="#" className="block text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer">
                      <FaLinkedin className="w-5 h-5" />
                    </Link>
                  </motion.div>
                  <motion.div 
                    variants={aboutSocialItemVariants}
                    whileHover={{ scale: 1.15, y: -3, transition: { duration: 0.25, ease: "easeOut" } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="#" className="block text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer">
                      <FaInstagram className="w-5 h-5" />
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
                A passionate web developer and data enthusiast focusing on creating intuitive digital experiences. I've collaborated with teams to design products that blend usability and aesthetics, focusing on solving problems through a design thinking journey process.
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

    </motion.div>
  );
}
