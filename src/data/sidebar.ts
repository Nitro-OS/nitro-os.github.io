export interface SidebarSubItem {
  title: string;
  href: string;
}

export interface SidebarSectionItem {
  id: string;
  title: string;
  iconName: string;
  items: SidebarSubItem[];
}

export const sidebar: SidebarSectionItem[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    iconName: "rocket",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Installation Guide", href: "/docs/installation" },
      { title: "Quickstart Checklist", href: "/docs/quickstart" },
    ],
  },
  {
    id: "hyprland",
    title: "Hyprland & Keybindings",
    iconName: "layers",
    items: [
      { title: "Hyprland in Nitro OS", href: "/docs/hyprland-overview" },
      { title: "All Keybindings Cheatsheet", href: "/docs/keybindings" },
      { title: "Adding Custom Keybinds", href: "/docs/custom-keybinds" },
      { title: "Changing Default Apps", href: "/docs/change-default-apps" },
      { title: "hyprctl Commands & IPC", href: "/docs/hypr-commands" },
      { title: "hyprland.conf Config", href: "/docs/hypr-config" },
    ],
  },
  {
    id: "npk",
    title: "NPK Package Manager",
    iconName: "package",
    items: [
      { title: "NPK Overview", href: "/docs/npk-overview" },
      { title: "All NPK Commands & Flags", href: "/docs/npk-commands" },
      { title: "Configuration & Mirrors", href: "/docs/npk-config" },
      { title: "Packaging (NPKBUILD)", href: "/docs/npk-packaging" },
    ],
  },
  {
    id: "developer-stack",
    title: "Developer Stack",
    iconName: "code",
    items: [
      { title: "NitroVim Editor", href: "/docs/nitrovim" },
      { title: "NitroHttp CLI", href: "/docs/nitrohttp" },
      { title: "Terminal & System Tools", href: "/docs/ecosystem-tools" },
    ],
  },
  {
    id: "system",
    title: "System & Troubleshooting",
    iconName: "settings",
    items: [
      { title: "GPU & Graphics Drivers", href: "/docs/gpu-graphics" },
      { title: "Screen Sharing & Portals", href: "/docs/screen-sharing" },
      { title: "Installing KDE & GNOME", href: "/docs/desktop-environments" },
      { title: "Troubleshooting & FAQ", href: "/docs/troubleshooting" },
    ],
  },
];
