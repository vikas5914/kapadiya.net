const metaData = {
  baseUrl: "https://kapadiya.net",
  title: "Vikas Kapadiya | AI Engineer at Shopos AI",
  name: "Vikas Kapadiya",
  description:
    "AI Engineer at Shopos AI building agent systems, LLM tooling, and production web infrastructure.",
};

const socialLinks = {
  twitter: "https://x.com/kapadiyavikas",
  github: "https://github.com/vikas5914/",
  instagram: "https://www.instagram.com/kapadiyavikas",
  linkedin: "https://www.linkedin.com/in/vikaskapadiya/",
  email: "mailto:vikas@kapadiya.net",
  bluesky: "https://bsky.app/profile/kapadiya.net",
};

const skillGroups = [
  {
    title: "AI / LLM",
    items: ["Claude API", "Agents", "RAG", "MCP"],
  },
  {
    title: "Production Build",
    items: ["TypeScript", "Python", "React", "Node.js"],
  },
  {
    title: "Systems",
    items: ["AWS", "Docker", "MySQL", "Postgres", "Redis"],
  },
  {
    title: "Web Roots",
    items: ["PHP", "Laravel", "Astro", "Tailwind"],
  },
];

const projects = [
  {
    name: "google-photos-backup",
    description: "Back up a Google Photos library with Playwright automation.",
    stars: "260+",
    url: "https://github.com/vikas5914/google-photos-backup",
    tags: ["Playwright", "Node.js", "Automation"],
  },
  {
    name: "helium-drm-fixer",
    description: "TypeScript CLI that restores Widevine support in the Helium browser.",
    stars: "75+",
    url: "https://github.com/vikas5914/helium-drm-fixer",
    tags: ["TypeScript", "CLI", "Browser"],
  },
  {
    name: "astro-takumi",
    description: "Open Graph image generation for Astro — this site uses it.",
    stars: "30",
    url: "https://github.com/vikas5914/astro-takumi",
    tags: ["Astro", "OG Images", "TypeScript"],
  },
  {
    name: "sumie",
    description: "Mobile-first manga reader for iOS, built with NativePHP Mobile.",
    stars: "2",
    url: "https://github.com/vikas5914/sumie",
    tags: ["PHP", "NativePHP", "iOS"],
  },
];

const careerTimeline = [
  {
    era: "01",
    title: "PHP foundations",
    detail: "Laravel and full-stack web apps — learning how production systems actually behave.",
  },
  {
    era: "02",
    title: "Full-stack systems",
    detail: "Node.js, React, databases, and the infrastructure it takes to keep products shipping.",
  },
  {
    era: "03",
    title: "AI engineering",
    detail: "Agent workflows and LLM tooling at Shopos AI — where models meet real products.",
  },
];

const writingTopics = [
  "TypeScript tooling",
  "Agent workflows",
  "Production systems",
  "Open-source notes",
];

export {
  metaData,
  socialLinks,
  skillGroups,
  projects,
  careerTimeline,
  writingTopics,
};
