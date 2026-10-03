// Single source of truth. Every value below comes from Resume.pdf.
export const PROFILE = {
  name: "Dheeraj Singh",
  firstName: "Dheeraj",
  initials: "DS",
  role: "MERN Stack Developer",
  headline: "MERN Stack Developer | Advance DSA with JAVA | JAVA Developer | B.Tech 27'",
  email: "itzdheerajsingh@gmail.com",
  phone: "+91 9457418789",
  phoneHref: "tel:+919457418789",
  github: "https://github.com/itzdheerajsingh",
  linkedin: "https://www.linkedin.com/in/itzdheerajsingh/",
  resume: "/resume.pdf",
  gradYear: "2027",
  // location and summary paragraph are not in the résumé, so they are omitted.
} as const;

export const NAV = [
  { id: "about", label: "About" }, { id: "skills", label: "Skills" },
  { id: "work", label: "Work" }, { id: "certifications", label: "Certifications" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" }, { id: "contact", label: "Contact" },
] as const;

export const SKILL_GROUPS = [
  { family: "Languages", items: ["Java", "HTML", "CSS", "JavaScript"] },
  { family: "Frameworks", items: ["Node.js", "Express.js", "React.js"] },
  { family: "Libraries", items: ["Tailwind CSS", "Three.js", "GSAP", "React Three Fiber"] },
  { family: "Databases", items: ["MySQL", "MongoDB"] },
  { family: "DevOps", items: ["Docker", "Kubernetes", "Git"] },
  { family: "APIs", items: ["REST API"] },
] as const;

export const EXPERIENCE = [
  {
    org: "Elevate Labs", title: "Web Developer Intern", period: "May 2025 – June 2025",
    points: [
      "Developed a responsive web application using React.js and TailwindCSS, improving user engagement by 15%.",
      "Collaborated with a team of 4 to implement a REST API using Node.js and Express, ensuring seamless data flow between the frontend and backend.",
      "Optimized database queries in MongoDB, reducing query response time by 20%.",
      "Integrated JWT-based authentication, securing user access for 500+ accounts.",
      "Participated in code reviews, improving code quality and development efficiency.",
      "Deployed the application on AWS S3 and EC2, ensuring scalability and 99.9% uptime.",
    ],
  },
] as const;

export const EDUCATION = [
  {
    school: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    degree: "Bachelor of Technology in Computer Science Engineering",
    score: "7.7/10", period: "2023 – 2027",
  },
] as const;

export const PROJECTS = [
  {
    id: "taskmanager-pro", index: "01", title: "TaskManager Pro", kicker: "Task management web app", period: "2019 – 2020",
    description: "A task management web application to streamline daily task organization and team collaboration.",
    features: [
      "Signup, login and password recovery with JWT-based access for 1,000+ users",
      "CRUD task system, improving task completion efficiency by 25%",
      "Task sharing and assignments, boosting team productivity by 30%",
      "Email notifications for updates and deadlines, reducing missed deadlines by 40%",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "AWS", "JWT"],
    github: null as string | null,
  },
  {
    id: "portfolio-builder", index: "02", title: "Portfolio Builder", kicker: "Portfolio creation web app", period: "2020 – 2021",
    description: "A dynamic web application enabling users to create and customize professional portfolios with real-time previews.",
    features: [
      "Drag-and-drop editing built with React.js, reducing portfolio creation time by 60%",
      "Real-time previews while customizing",
      "Deployed on AWS S3/EC2 for fast load times and scalability",
    ],
    tech: ["React.js", "Node.js", "MongoDB", "AWS"],
    github: null as string | null,
  },
] as const;

export const CERTIFICATIONS = [
  { title: "Java + OOPs", issuer: "Simplilearn", url: null as string | null },
  { title: "Java (Basics)", issuer: "HackerRank", url: null as string | null },
] as const;

// Résumé metrics only (no invented platform ranks).
export const ACHIEVEMENTS = [
  { value: 15, suffix: "%", label: "User engagement", detail: "Responsive React.js + TailwindCSS app · Elevate Labs" },
  { value: 20, suffix: "%", label: "Faster queries", detail: "MongoDB query optimisation · Elevate Labs" },
  { value: 500, suffix: "+", label: "Accounts secured", detail: "JWT-based authentication · Elevate Labs" },
  { value: 99.9, suffix: "%", label: "Uptime", detail: "AWS S3 and EC2 deployment · Elevate Labs" },
  { value: 1000, suffix: "+", label: "Users protected", detail: "JWT auth · TaskManager Pro" },
  { value: 60, suffix: "%", label: "Faster creation", detail: "Drag-and-drop builder · Portfolio Builder" },
] as const;
