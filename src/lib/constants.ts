export const COMPANY = {
  name: "Pistos",
  tagline: "Credit Ratings at the Speed of AI.",
  description:
    "The first agent-native credit rating agency. Ratings in minutes, not months — for municipal governments and private credit.",
  mission:
    "Three companies control 98.8% of all credit ratings globally — using manual, biased processes that helped cause the 2008 financial crisis. Nothing has changed. A third of all municipal bond offerings go unrated because issuers can't afford the fees, and the explosive growth of the $3.5 trillion private credit market has created vast new demand that incumbents are poorly positioned to meet. We're building the rating agency that should already exist: full-stack, agent-native, and always online.",
  contactEmail: "info@pistos.ai",
  social: {
    linkedin: "https://linkedin.com/company/pistos-ai",
    twitter: "https://x.com/pistos_ai",
  },
} as const;

export const STATS = [
  {
    value: "98.8%",
    label: "controlled by three companies",
    description:
      "Moody's, S&P, and Fitch operate as an oligopoly — slow to act, structurally biased, and resistant to change.",
  },
  {
    value: "1/3",
    label: "of muni bond offerings go unrated",
    description:
      "Issuers can't afford exorbitant fees, leaving tens of thousands of municipalities with zero coverage.",
  },
  {
    value: "$3.5T",
    label: "private credit market underserved",
    description:
      "The fastest-growing asset class has no universally adopted, transparent rating standard.",
  },
] as const;

export const FEATURES = [
  {
    title: "Agent-Native Architecture",
    description:
      "Our AI agents connect directly with customers' finance stacks via A2A protocols. Their agents send financials, our agents handle NDAs, legal, regulation, and return a rating — in minutes, not months.",
    icon: "brain",
  },
  {
    title: "Always-Online Models",
    description:
      "Constantly processing geopolitical events, interest rates, and macro changes in real time. When conditions shift, our models react instantly — not weeks later like incumbents.",
    icon: "layers",
  },
  {
    title: "Municipal & Private Credit",
    description:
      "Starting with the $4T municipal bond market and the $3.5T private credit market — the largest underserved segments where borrowers are unrated or lack transparent standards.",
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
  { name: "Amazon", logoPath: "/images/logos/amazon.png", height: 40, offsetY: 3 },
  { name: "Tesla", logoPath: "/images/logos/tesla.png", height: 32, offsetY: -2 },
  { name: "Goldman Sachs", logoPath: "/images/logos/goldman-sachs.png", height: 32 },
  { name: "Google", logoPath: "/images/logos/google.png", height: 32 },
  { name: "American Express", logoPath: "https://www.americanexpress.com/content/dam/amex/us/merchant/supplies-uplift/product/images/img-WEBLOGO1-01.jpg", height: 40, filterClass: "logo-white-jpg" as const },
] as const;

export const SECTIONS = {
  problem: {
    heading: "A Broken Oligopoly",
    description:
      "Three agencies control nearly all credit ratings globally. Their manual, biased processes helped cause the 2008 crisis — and nothing has changed since.",
  },
  solution: {
    heading: "Ratings Should Move at the Speed of AI",
    description:
      "Companies are automating their finance stacks with AI agents. Their credit ratings should move at the same speed. Pistos makes that possible.",
  },
  about: {
    heading: `About ${COMPANY.name}`,
  },
} as const;
