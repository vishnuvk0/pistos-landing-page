export const COMPANY = {
  name: "Pistos",
  tagline: "AI-Powered Credit Ratings. 100x Faster.",
  description:
    "Pistos is building the first full-stack AI credit rating agency for municipal governments and private credit.",
  mission:
    "We believe credit markets deserve better. Legacy rating agencies rely on decades-old methodologies, leaving vast swaths of the market unrated and underserved. Pistos combines frontier AI with deep credit expertise to deliver faster, more accurate, and more transparent ratings — starting with the $4T municipal bond market.",
  contactEmail: "info@pistos.ai",
  social: {
    linkedin: "https://linkedin.com/company/pistos-ai",
    twitter: "https://x.com/pistos_ai",
  },
} as const;

export const STATS = [
  {
    value: "98.8%",
    label: "of muni bonds are unrated or stale-rated",
    description:
      "The vast majority of the $4T municipal bond market lacks current, reliable credit analysis.",
  },
  {
    value: "1/3",
    label: "of issuers have never been rated",
    description:
      "Tens of thousands of municipalities have zero coverage from legacy agencies.",
  },
  {
    value: "$3.5T",
    label: "market underserved by legacy agencies",
    description:
      "Trillions in outstanding municipal debt lack the analytical coverage investors need.",
  },
] as const;

export const FEATURES = [
  {
    title: "AI-Native",
    description:
      "Purpose-built AI models trained on decades of municipal credit data, financial statements, and macroeconomic indicators. Our models analyze in minutes what takes legacy agencies months.",
    icon: "brain",
  },
  {
    title: "Full-Stack",
    description:
      "End-to-end coverage from data ingestion and normalization through credit analysis, rating assignment, and ongoing surveillance. One platform, complete coverage.",
    icon: "layers",
  },
  {
    title: "Municipal & Private Credit",
    description:
      "Starting with the $4T municipal bond market — the largest underserved segment — then expanding into private credit, infrastructure finance, and beyond.",
    icon: "building",
  },
] as const;

export const NAV_LINKS = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const ALUMNI_LOGOS = [
  { name: "Visa", logoPath: "/images/logos/visa.png", height: 32 },
  { name: "Amazon", logoPath: "/images/logos/amazon.png", height: 40 },
  { name: "Tesla", logoPath: "/images/logos/tesla.png", height: 32 },
  { name: "Goldman Sachs", logoPath: "/images/logos/goldman-sachs.png", height: 32 },
  { name: "Google", logoPath: "/images/logos/google.png", height: 32 },
  { name: "American Express", logoPath: "/images/logos/american-express.svg", height: 44 },
] as const;

export const SECTIONS = {
  problem: {
    heading: "The Credit Rating Gap",
    description:
      "The municipal bond market is massive — yet chronically underserved by legacy rating agencies that lack the technology and incentives to provide broad coverage.",
  },
  solution: {
    heading: "A New Kind of Rating Agency",
    description:
      "Pistos combines frontier AI with deep credit expertise to deliver faster, more accurate, and more transparent credit analysis.",
  },
  about: {
    heading: `About ${COMPANY.name}`,
  },
} as const;
