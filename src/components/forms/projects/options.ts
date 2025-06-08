export type GoodBriefOption = {
  name: string;
  value: string;
};

export type GroupedOption = {
  name: string;
  options: {
    name: string;
    value: string;
  }[];
};

export type TypeOptions = GoodBriefOption[] | GroupedOption[];

export const typeOptions = [
  {
    name: "Desain",
    options: [
      { name: "Logo", value: "logo-design" },
      { name: "Branding", value: "branding" },
      { name: "Poster", value: "poster-design" },
      { name: "Feed Instagram", value: "instagram-feed-design" },
      { name: "Packaging", value: "packaging" },
      { name: "Desain Website", value: "website-design" },
      { name: "Desain Aplikasi", value: "app-design" },
      { name: "Illustrasi", value: "illustration" },
    ],
  },
  {
    name: "Website & App",
    options: [
      { name: "Landing Page", value: "landing-page" },
      { name: "UX/UI Audit", value: "ux-ui-audit" },
      { name: "Frontend Developer", value: "frontend-developer" },
      { name: "Backend Developer", value: "backend-developer" },
      { name: "Full Stack Developer", value: "full-stack-developer" },
    ],
  },
  {
    name: "Marketing & Campaign",
    options: [
      { name: "Kampanye Media Sosial", value: "social-media-campaign" },
      { name: "Email Marketing", value: "email-marketing" },
      { name: "Penulisan Naskah Iklan", value: "copywriting" },
    ],
  },
  {
    name: "Media & Produksi",
    options: [
      { name: "Motion Graphic", value: "motion-graphic" },
      { name: "Iklan Video", value: "video-ad" },
      { name: "Fotografi Produk", value: "product-photography" },
    ],
  },
];

export const industryOptions = [
  {
    name: "Technology",
    value: "technology",
  },
  {
    name: "Finance",
    value: "finance",
  },
  {
    name: "Food",
    value: "food",
  },
  {
    name: "Fashion",
    value: "fashion",
  },
  {
    name: "Healthcare",
    value: "healthcare",
  },
  {
    name: "Education",
    value: "education",
  },
  {
    name: "Retail",
    value: "retail",
  },
  {
    name: "Manufacturing",
    value: "manufacturing",
  },
  {
    name: "Transportation",
    value: "transportation",
  },
];

export const goodBriefTypeOptions = [
  {
    name: "Logo",
    value: "logo",
  },
  {
    name: "Brand Identity",
    value: "brandid",
  },
  {
    name: "Illustration",
    value: "illus",
  },
  {
    name: "Packaging",
    value: "packaging",
  },
  {
    name: "Billboard",
    value: "billboard",
  },
  {
    name: "Website",
    value: "website",
  },
];

export const goodBriefIndustryOptions = [
  {
    name: "Technology",
    value: "tech",
  },
  {
    name: "Food",
    value: "food",
  },
  {
    name: "Retail Store",
    value: "store",
  },
  {
    name: "Entertaiment",
    value: "ent",
  },
  {
    name: "Fashion",
    value: "fashion",
  },
  {
    name: "Sports",
    value: "sports",
  },
  {
    name: "Education",
    value: "edu",
  },
  {
    name: "Transportation",
    value: "transp",
  },
  {
    name: "Travel",
    value: "travel",
  },
];

export const vibeOptions = [
  { name: "Fun & Absurd", value: "fun" },
  { name: "Corporate & Professional", value: "corporate" },
  { name: "Casual & Friendly", value: "casual" },
  { name: "Startup & Visionary", value: "startup" },
];
