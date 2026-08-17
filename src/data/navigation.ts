export interface NavLink {
  href: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
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
    links: [
      { label: "Features", href: "#features" },
      { label: "Why Nitro", href: "#why" },
      { label: "Showcase", href: "#showcase" },
      { label: "Changelog", href: "https://github.com/Nitro-OS/nitro-os.github.io/releases" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { label: "NitroVim", href: "#tools", href: "https://github.com/NitroVim/NitroVim" },
      { label: "NPK", href: "#tools", href: "https://github.com/Nitro-OS/NitroPkg" },
      { label: "Launcher", href: "#tools" },
      { label: "Documentation", href: "https://github.com/Nitro-OS/nitro-os.github.io#readme" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/Nitro-OS" },
      { label: "Forum", href: "https://github.com/Nitro-OS/nitro-os.github.io/discussions" },
    ],
  },
];
