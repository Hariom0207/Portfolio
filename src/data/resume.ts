// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: "Hariom Ray",
  firstName: "Hariom",
  lastName: "Ray",
  initials: "HR",
  role: "React.js Developer",
  title: "React.js & MERN Stack Developer",
  location: "Jhabua, Madhya Pradesh, India",
  shortLocation: "Jhabua, MP",
  email: "hari273om@gmail.com",
  linkedin: "https://www.linkedin.com/in/hariom-ray-ba239b34a/",
  idNumber: "HR-0207",
  // Photos (files live in /public).
  photo: "/hariom.jpg" as string | null, // ID card in the hero
  portrait: "/hariom-portrait.png", // About section + Let's talk section
  intro:
    "I build responsive, maintainable web apps with React.js and the MERN stack — two years shipping live projects in a team at Black Hat Bucks Tech.",
  summary: [
    "Computer Science graduate with 2 years of professional experience in MERN Stack development at Black Hat Bucks Tech. I work across frontend and backend: UI implementation, API integration, database operations and debugging on live projects in a team-based environment.",
    "I'm skilled in React.js, JavaScript, Node.js, Express.js and MongoDB, with hands-on exposure to Shopify-based e-commerce. I'm looking for a React.js Developer role where I can build responsive, maintainable web applications and grow as a frontend-focused developer.",
  ],
};

export const stats = [
  { value: 2, suffix: "+", label: "Years of experience" },
  {
    // counts the projects list below automatically
    get value() {
      return projects.length;
    },
    suffix: "",
    label: "Featured projects",
  },
  { value: 5, suffix: "+", label: "Core technologies" },
];

export const marquee = [
  "React.js",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "REST APIs",
  "Shopify",
  "HTML5",
  "CSS3",
  "Git",
];

export const services = [
  {
    title: "Frontend Development",
    points: ["React.js components", "Responsive UI development", "Clean, maintainable code"],
  },
  {
    title: "Backend & APIs",
    points: ["Node.js & Express.js", "REST API integration", "Debugging live issues"],
  },
  {
    title: "Database Work",
    points: ["MongoDB", "Database operations", "Data-driven features"],
  },
  {
    title: "E-commerce",
    points: ["Shopify storefronts", "Product discovery flows", "Online ordering experience"],
  },
];

export const skills = [
  { group: "Languages", items: ["JavaScript", "HTML5", "CSS3"] },
  { group: "Frontend", items: ["React.js", "Responsive UI Development"] },
  { group: "Backend", items: ["Node.js", "Express.js", "REST API Integration"] },
  { group: "Databases", items: ["MongoDB"] },
  { group: "Tools & Platforms", items: ["Git", "VS Code", "Shopify"] },
  {
    group: "Practices",
    items: ["Debugging", "Database Operations", "Team Collaboration", "Problem Solving", "Continuous Learning"],
  },
];

export const experience = [
  {
    role: "MERN Stack Developer",
    company: "Black Hat Bucks Tech",
    place: "Jhabua, Madhya Pradesh",
    period: "Oct 2024 — Present",
    points: [
      "Develop and support web applications using MERN Stack technologies in a team-based development environment.",
      "Contribute to frontend UI implementation and connect application interfaces with backend APIs.",
      "Work on database operations, troubleshoot issues, debug application behavior and improve functionality.",
      "Participate in development, testing and deployment activities for live projects.",
    ],
  },
  {
    role: "PHP Development Intern",
    company: "Amici Infotech",
    place: "Dahod, Gujarat",
    period: "2024 · 1 month",
    points: ["Gained introductory exposure to PHP development and web application workflows."],
  },
];

export const projects = [
  {
    title: "PLANZO",
    category: "Dashboard Web App",
    description: "A dashboard web application from my project portfolio — the live app is available for review.",
    tags: ["React.js", "Dashboard"],
    url: "https://dashboard.planzo.app",
    linkLabel: "dashboard.planzo.app",
    theme: "from-[#ffffff] to-[#ffe9ec]",
    logo: { src: "/projects/planzo-logo.png", width: 512, height: 111, className: "w-[72%] max-w-[340px]" },
    comingSoon: false,
  },
  {
    title: "Black Hat Bucks Tech",
    category: "Company Website",
    description:
      "Worked on the company website as part of my professional experience — implementation, debugging and collaborative development workflows.",
    tags: ["Web", "Team project"],
    url: "https://blackbucks.tech",
    linkLabel: "blackbucks.tech",
    theme: "from-[#ffffff] to-[#ffffff]",
    logo: { src: "/projects/blackbucks-logo.jpg", width: 200, height: 200, className: "h-[88%] w-auto" },
    comingSoon: false,
  },
  {
    title: "MilkGo",
    category: "Dairy Management Software",
    description:
      "Software for dairy vendors to manage milk-packet distribution to retail shopkeepers, with sales, purchases, customer accounting and analytics in one place.",
    tags: ["TypeScript", "Full-stack"],
    url: null as string | null,
    linkLabel: "Launching soon",
    theme: "from-[#ffffff] to-[#e3f6fd]",
    logo: { src: "/projects/milkgo-logo.png", width: 981, height: 271, className: "w-[74%] max-w-[360px]" },
    comingSoon: true,
  },
  {
    title: "Door-Tak",
    category: "Local E-Commerce · Startup",
    description:
      "A Shopify-based local e-commerce storefront concept that helps customers in Jhabua discover and order products from local sellers.",
    tags: ["Shopify", "E-commerce"],
    url: null as string | null,
    linkLabel: "Launching soon",
    theme: "from-[#f0a35e] to-[#d1495b]",
    logo: null,
    comingSoon: true,
  },
];

export const education = [
  {
    degree: "B.Tech, Computer Science Engineering",
    school: "Dr. A.P.J. Abdul Kalam U.I.T., Jhabua",
    period: "2022 — 2026",
    score: "CGPA 6.70",
  },
  { degree: "Class 12", school: "K.V.S., Jhabua", period: "", score: "71%" },
  { degree: "Class 10", school: "N.C.M.S., Jhabua", period: "", score: "81.6%" },
];
