export interface NavLink {
  href: string;
  label: string;
}

export interface FooterColumn {
  heading: string;
  links: string[];
}

export const links: NavLink[] = [
  { href: "#features", label: "Features" },
  { href: "#why", label: "Why Nitro" },
  { href: "#tools", label: "Tools" },
  { href: "#showcase", label: "Showcase" },
];

export const footerCols: FooterColumn[] = [
  {
    heading: "Product",
    links: ["Features", "Why Nitro", "Showcase", "Changelog"],
  },
  {
    heading: "Tools",
    links: ["NitroVim", "NPK", "Launcher", "Documentation"],
  },
  {
    heading: "Community",
    links: ["GitHub", "Discord", "Forum"],
  },
];
