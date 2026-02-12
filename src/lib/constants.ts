export const COMPANY = {
  name: "PistOS",
  tagline: "Agentic Credit Intelligence"
  description: "For municipalities, startups, and private credit.",
  contactEmail: "info@pistosai.com",
  social: {
    linkedin: "https://linkedin.com/company/pistos-ai",
    twitter: "https://x.com/pistos_ai",
  },
} as const;

export const STATS = [
  {
    value: "98.8%",
    label: "controlled by three firms",
    description: "Moody's, S&P, and Fitch control the entire market.",
  },
  {
    value: "1/3",
    label: "of muni offerings go unrated",
    description: "Issuers can't afford high fees, opportunities are lost.",
  },
  {
    value: "$3.5T",
    label: "private credit left underserved",
    description: "Accurate risk assessment in the fastest growing asset class globally is still opaque.",
  },
] as const;

export const PROCESS_STEPS = [
  "Importing from Excel",
  "Parsing existing models",
  "Running credit analysis",
  "Rating delivered",
] as const;

export const ALUMNI_LOGOS = [
  { name: "Google", logoPath: "/images/logos/google.png", height: 32 },
  { name: "Goldman Sachs", logoPath: "/images/logos/goldman-sachs.png", height: 32 },
  { name: "Georgia Tech", logoPath: "/images/logos/georgia_tech.png", height: 32 },
  { name: "Tesla", logoPath: "/images/logos/tesla.png", height: 32, offsetY: -2 },
  { name: "Amazon", logoPath: "/images/logos/amazon.png", height: 40, offsetY: 3 },
  { name: "Visa", logoPath: "/images/logos/visa.png", height: 32 },
  { name: "American Express", logoPath: "https://www.americanexpress.com/content/dam/amex/us/merchant/supplies-uplift/product/images/img-WEBLOGO1-01.jpg", height: 40, filterClass: "logo-white-jpg" as const },
] as const;

export const SECTIONS = {
  problem: {
    heading: "Disrupting an Oligopoly",
    description: "Slow, biased, and manual processes have plagued ratings for decades.",
  },
  solution: {
    heading: "How Pistos Works",
    description: "Your Agents talk to our Agents. Get your ratings and analysis instantly.",
  },
} as const;
