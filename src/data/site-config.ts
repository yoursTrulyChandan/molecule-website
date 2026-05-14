export const SITE = {
  name: "Molecule Ventures",
  logo: "/images/logo.png",
  sebiReg: "IN/P000/00/7216",
  identNo: "AAT-9683",
  email: "info@moleculeventures.in",
  phone: "+91 75749 60783",
  linkedin: "https://www.linkedin.com/company/molecule-ventures-llp/",
  twitter: "https://twitter.com/MoleculeLLP",
  offices: [
    {
      city: "Surat",
      lines: [
        "B 904-906, Swastik Universal Building,",
        "Opposite Central Mall,",
        "Besides Valentine Cinema,",
        "Piplod, Surat – 395007.",
      ],
    },
    {
      city: "Mumbai",
      lines: [
        "1302, B-wing, Naman Midtown,",
        "Senapati Bapat Marg,",
        "Elphinstone (west),",
        "Mumbai 400013.",
      ],
    },
  ],
};

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "About Us",
    href: "/about-us",
    children: [
      { label: "Founders", href: "/about-us#founders" },
      { label: "Team", href: "/about-us#team" },
      { label: "Portfolio Performance", href: "/about-us#portfolio-performance" },
    ],
  },
  {
    label: "Investment Approach",
    href: "/investment-approach",
    children: [
      { label: "Investment Philosophy", href: "/investment-approach#investment-philosophy" },
      { label: "Portfolio Construction", href: "/investment-approach#portfolio-construction" },
      { label: "Investment Process", href: "/investment-approach#investment-process" },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
    children: [
      { label: "In The News", href: "/insights#in-the-news" },
      { label: "Newsletters", href: "/insights#newsletters" },
      { label: "Blogs", href: "/insights#blogs" },
    ],
  },
  {
    label: "Investors",
    href: "/complaints",
    children: [
      { label: "PMS Fees Calculator", href: "/documents/Performance-Fee-Calculator.xlsx", download: true },
      { label: "Investor Charter", href: "/documents/Investor-Charter.pdf", download: true },
      { label: "Register a Complaint", href: "/complaints" },
      { label: "Complaint Report", href: "/compliant-report" },
    ],
  },
  { label: "Disclosure Document", href: "/documents/Disclosure-Document.pdf", download: true },
  { label: "Contact Us", href: "/contact-us" },
];
