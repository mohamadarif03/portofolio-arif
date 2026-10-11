export interface Project {
  slug: string;
  title: string;
  category: "Web Development" | "Data Science";
  type: string;
  image: string;
  images: string[];
  description: string;
  techStack: string[];
  year: string;
  role: string;
  highlights: string[];
  link?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "cobylearnai",
    title: "CobyLearnAI",
    category: "Web Development",
    type: "Website",
    image: "/projects/cobyLearn.webp",
    images: [
      "/projects/cobyLearn.webp",
      "/projects/cobyLearn.webp",
      "/projects/cobyLearn.webp",
    ],
    description:
      "Solving information overload for students by leveraging Gemini AI to summarize complex materials instantly. The platform integrates gamification to boost study consistency and retention.",
    techStack: ["Golang", "React", "Gemini AI", "REST API"],
    year: "2025",
    role: "Full-Stack Developer",
    highlights: [
      "AI-based summarization from PDF, YouTube, and text input",
      "Integration with Gemini AI model for content understanding",
      "Personal to-do list for study planning",
      "Daily learning streak and gamification system",
      "Learning analytics and statistics (study time, activity frequency)",
      "User authentication and personalized dashboard",
      "RESTful API backend architecture",
    ],
  },
  {
    slug: "sipjaki",
    title: "SIPJAKI Kabupaten Pasuruan",
    category: "Web Development",
    type: "Website",
    image: "/projects/sipjaki.webp",
    images: [
      "/projects/sipjaki.webp",
      "/projects/sipjaki.webp",
      "/projects/sipjaki.webp",
    ],
    description:
      "Digitized regional construction data to improve transparency and accessibility. This government portal connects businesses and stakeholders, fostering a more efficient local supply chain.",
    techStack: ["Laravel (Full-stack)", "MySQL"],
    year: "2024",
    role: "Backend Developer",
    highlights: [
      "Centralized database of construction service businesses",
      "Public access to verified construction-related information",
      "Business directory to support construction supply chain networking",
      "Admin panel for data management and verification",
      "Role-based access control for administrators and operators",
      "Data reporting and monitoring system",
    ],
  },
  {
    slug: "squad-hub",
    title: "Squad Hub",
    category: "Web Development",
    type: "Website",
    image: "/projects/squadhub.webp",
    images: [
      "/projects/squadhub.webp",
      "/projects/squadhub.webp",
      "/projects/squadhub.webp",
    ],
    description:
      "Unified commerce and booking operations for a multi-service business. The ecosystem seamlessly integrates product sales, service booking, and memberships, boosting operational efficiency.",
    techStack: ["Laravel", "MySQL", "Xendit Payment Gateway"],
    year: "2024",
    role: "Full-Stack Developer",
    highlights: [
      "Membership-based access and user management",
      "E-commerce system for physical product sales",
      "Service listing and service purchase workflow",
      "Online reservation and booking system",
      "Secure payment integration using Xendit",
      "Admin panel for managing products, services, reservations, and members",
    ],
  },
  {
    slug: "kejar-taff",
    title: "Kejar Taff",
    category: "Web Development",
    type: "Website",
    image: "/projects/kejarTaf.webp",
    images: [
      "/projects/kejarTaf.webp",
      "/projects/kejarTaf.webp",
      "/projects/kejarTaf.webp",
    ],
    description:
      "Optimized field operations for leasing officers with a real-time task management system. Improved accountability and response times through transparent tracking and reporting.",
    techStack: ["Laravel (Full-stack)", "MySQL"],
    year: "2025",
    role: "Full-Stack Developer",
    highlights: [
      "Task assignment and management for field officers",
      "Activity tracking and field reporting system",
      "Monitoring dashboard for supervisors and administrators",
      "Role-based access control (Admin, Supervisor, Field Officer)",
      "Centralized task and activity database",
      "Data reporting and operational monitoring",
    ],
  },
  {
    slug: "get-skill",
    title: "Get Skill",
    category: "Web Development",
    type: "Website",
    image: "/projects/get-skill.webp",
    images: [
      "/projects/get-skill.webp",
      "/projects/get-skill.webp",
      "/projects/get-skill.webp",
    ],
    description:
      "Addressed the need for accessible digital education by creating a secure marketplace for creators. Enabled seamless transactions and role-based learning, resulting in increased creator revenue and user engagement.",
    techStack: ["Laravel", "JavaScript", "Tripay Payment Gateway", "REST API"],
    year: "2024",
    role: "Full-Stack Developer",
    highlights: [
      "Direct sales of digital learning materials and courses",
      "User authentication and access control",
      "Secure payment integration with automatic content access",
      "Course and material management system",
      "User dashboard for purchased courses and materials",
      "Admin panel for managing content and transactions",
    ],
    link: "https://getskill.id/",
  },
  {
    slug: "dolfin-brain",
    title: "Dolfin Brain",
    category: "Web Development",
    type: "Website",
    image: "/projects/dolfinBrain.webp",
    images: [
      "/projects/dolfinBrain.webp",
      "/projects/dolfinBrain.webp",
      "/projects/dolfinBrain.webp",
    ],
    description:
      "Streamlined CPNS exam preparation by building a dedicated LMS. The system simplifies course registration and access, providing a structured environment for thousands of aspiring civil servants.",
    techStack: ["Laravel (Full-stack)", "MySQL", "Tripay Payment Gateway"],
    year: "2025",
    role: "Full-Stack Developer",
    highlights: [
      "CPNS exam preparation course management",
      "Student registration and authentication system",
      "Paid course purchase and access control",
      "Secure payment integration using Tripay",
      "Learning dashboard for enrolled students",
      "Admin panel for managing courses, users, and transactions",
    ],
  },
];

export const projects = PROJECTS;
