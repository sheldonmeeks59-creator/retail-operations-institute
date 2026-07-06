export interface NavLink {
  label: string;
  href: string;
}

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Frameworks", href: "/frameworks" },
  { label: "Insights", href: "/insights" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
];

export const footerNav: NavLink[] = [
  ...primaryNav,
  { label: "Contact", href: "/contact" },
];
