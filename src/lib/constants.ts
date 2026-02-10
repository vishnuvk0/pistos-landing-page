export const COMPANY = {
  name: "Pistos",
  tagline: "Credit Ratings. Minutes, Not Months.",
  description: "The first AI credit rating agency.",
  contactEmail: "info@pistos.ai",
  social: {
    linkedin: "https://linkedin.com/company/pistos-ai",
    twitter: "https://x.com/pistos_ai",
  },
} as const;

export const STATS = [
  {
    value: "98.8%",
    label: "controlled by three firms",
    description: "Slow, biased, and unchanged since 2008.",
  },
  {
    value: "1/3",
    label: "of muni offerings go unrated",
    description: "Issuers can't afford the fees.",
  },
  {
    value: "$3.5T",
    label: "private credit left underserved",
    description: "No transparent rating standard exists.",
  },
] as const;

export const PROCESS_STEPS = [
  "Importing from Excel",
  "Parsing existing models",
  "Running credit analysis",
  "Rating delivered",
] as const;

export const NAV_LINKS = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
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
    description: "Slow, biased, and manual.",
  },
  solution: {
    heading: "How Pistos Works",
    description: "Your agents talk to our agents.",
  },
} as const;
