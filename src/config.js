const metaData = {
  baseUrl: "https://kapadiya.net",
  title: "Vikas Kapadiya - AI Engineer",
  name: "Vikas Kapadiya",
  description:
    "AI Engineer at Shopos AI. A decade of shipping on the web — now building agents and the LLM tooling around them.",
};

const socialLinks = {
  twitter: "https://x.com/kapadiyavikas",
  github: "https://github.com/vikas5914/",
  instagram: "https://www.instagram.com/kapadiyavikas",
  linkedin: "https://www.linkedin.com/in/vikaskapadiya/",
  email: "mailto:vikas@kapadiya.net",
  bluesky: "https://bsky.app/profile/kapadiya.net",
};

// TEMPORARY: still imported by SkillsSection.astro; removed in the skills rebuild task.
const skills = [
  { name: "PHP/Laravel", level: 95 },
  { name: "Node.js", level: 88 },
  { name: "React/TypeScript", level: 90 },
  { name: "MySQL", level: 85 },
  { name: "Tailwind CSS", level: 92 },
  { name: "AWS/DevOps", level: 78 },
];

const skillGroups = [
  {
    title: "AI / LLM",
    items: ["Claude API", "Agents", "RAG", "MCP"],
  },
  {
    title: "Languages",
    items: ["TypeScript", "Python", "PHP"],
  },
  {
    title: "Web",
    items: ["React", "Node.js", "Astro", "Laravel", "Tailwind"],
  },
  {
    title: "Infra",
    items: ["AWS", "Docker", "MySQL", "Postgres", "Redis"],
  },
];

const projects = [
  {
    name: "google-photos-backup",
    description: "Backup your Google Photos library using Playwright automation.",
    stars: "261",
    url: "https://github.com/vikas5914/google-photos-backup",
  },
  {
    name: "helium-drm-fixer",
    description: "TypeScript tooling that repairs DRM-broken media libraries.",
    stars: "78",
    url: "https://github.com/vikas5914/helium-drm-fixer",
  },
  {
    name: "astro-takumi",
    description: "Open Graph image generation for Astro — this site uses it.",
    stars: "30",
    url: "https://github.com/vikas5914/astro-takumi",
  },
  {
    name: "sumie",
    description: "Mobile-first manga reader for iOS, built with NativePHP Mobile.",
    stars: "2",
    url: "https://github.com/vikas5914/sumie",
  },
];

export { metaData, socialLinks, skills, skillGroups, projects };
