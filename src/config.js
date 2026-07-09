const metaData = {
  baseUrl: "https://kapadiya.net",
  title: "Vikas Kapadiya | AI Engineer at Shopos AI",
  name: "Vikas Kapadiya",
  description:
    "AI engineer at Shopos AI. Agents, LLM tooling, TypeScript, and open source.",
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
    title: "Day to day",
    items: ["TypeScript", "Python", "React", "Node.js"],
  },
  {
    title: "Infra",
    items: ["AWS", "Docker", "MySQL", "Postgres", "Redis"],
  },
  {
    title: "Also",
    items: ["PHP", "Laravel", "Astro", "Tailwind"],
  },
];

const projects = [
  {
    name: "google-photos-backup",
    description: "Pull a full Google Photos library down with Playwright. No official bulk export that didn't suck.",
    stars: "260+",
    url: "https://github.com/vikas5914/google-photos-backup",
    tags: ["Playwright", "Node.js", "Automation"],
  },
  {
    name: "helium-drm-fixer",
    description: "CLI that puts Widevine back into the Helium browser so Netflix and friends work.",
    stars: "75+",
    url: "https://github.com/vikas5914/helium-drm-fixer",
    tags: ["TypeScript", "CLI", "Browser"],
  },
  {
    name: "astro-takumi",
    description: "OG image generation for Astro. This site runs on it.",
    stars: "30",
    url: "https://github.com/vikas5914/astro-takumi",
    tags: ["Astro", "OG Images", "TypeScript"],
  },
  {
    name: "sumie",
    description: "Manga reader for iOS. Built with NativePHP Mobile because I wanted PHP on a phone.",
    stars: "2",
    url: "https://github.com/vikas5914/sumie",
    tags: ["PHP", "NativePHP", "iOS"],
  },
];

const careerTimeline = [
  {
    era: "01",
    title: "PHP & Laravel",
    detail: "Started here. Full-stack apps, MySQL, clients who needed things fixed yesterday.",
  },
  {
    era: "02",
    title: "Full-stack web",
    detail: "Node, React, databases, AWS. Same work, bigger piles of code.",
  },
  {
    era: "03",
    title: "AI at Shopos",
    detail: "Agents, Claude, TypeScript and Python services. Still shipping, just a different stack.",
  },
];

const writingTopics = [
  "TypeScript gotchas",
  "Agent glue code",
  "Deploying LLM stuff",
  "Side projects",
];

export {
  metaData,
  socialLinks,
  skillGroups,
  projects,
  careerTimeline,
  writingTopics,
};
