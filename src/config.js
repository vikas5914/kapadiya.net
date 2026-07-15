const metaData = {
  baseUrl: "https://kapadiya.net",
  title: "Vikas Kapadiya — AI Engineer Who Ships",
  name: "Vikas Kapadiya",
  description:
    "AI engineer at Shopos AI shipping agents, LLM tooling, TypeScript, and open source.",
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
    description:
      "Pull a full Google Photos library down with Playwright. No official bulk export that didn't suck.",
    stars: "261",
    proof: "32 forks",
    url: "https://github.com/vikas5914/google-photos-backup",
    tags: ["Playwright", "Node.js", "Automation"],
  },
  {
    name: "helium-drm-fixer",
    description:
      "CLI that puts Widevine back into the Helium browser so Netflix and friends work.",
    stars: "82",
    proof: "11 forks",
    url: "https://github.com/vikas5914/helium-drm-fixer",
    tags: ["TypeScript", "CLI", "Browser"],
  },
  {
    name: "astro-takumi",
    description: "OG image generation for Astro. This site runs on it.",
    stars: "32",
    proof: "This site runs on it",
    url: "https://github.com/vikas5914/astro-takumi",
    tags: ["Astro", "OG Images", "TypeScript"],
  },
  {
    name: "sumie",
    description:
      "Manga reader for iOS. Built with NativePHP Mobile because I wanted PHP on a phone.",
    stars: "2",
    proof: "Native iOS app",
    url: "https://github.com/vikas5914/sumie",
    tags: ["PHP", "NativePHP", "iOS"],
  },
];

export {
  metaData,
  socialLinks,
  skillGroups,
  projects,
};
