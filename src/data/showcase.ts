export interface Subtab {
  readonly id: string;
  readonly label: string;
  readonly src: string;
}

export interface ShowcaseTab {
  readonly id: string;
  readonly label: string;
  readonly subtabs: readonly Subtab[];
}

export const TABS = [
  {
    id: "desktop",
    label: "Desktop",
    subtabs: [
      { id: "wallpaper", label: "Wallpaper Manager", src: "/images/wallpaper-manager.webp" },
      { id: "lockscreen", label: "Lock Screen", src: "/images/lockscreen.webp" },
    ],
  },
  {
    id: "launcher",
    label: "Launcher",
    subtabs: [
      { id: "launcher", label: "App Launcher", src: "/images/applauncher.webp" },
    ],
  },
  {
    id: "dev",
    label: "Dev workflow",
    subtabs: [
      { id: "nitrovim-code", label: "NitroVim Code", src: "/images/nitrovim-code.webp" },
      { id: "nitrovim-start", label: "NitroVim Start", src: "/images/nitrovim.webp" },
    ],
  },
  {
    id: "npk",
    label: "NPK & System",
    subtabs: [
      { id: "fastfetch", label: "Fastfetch Terminal", src: "/images/fastfetch.webp" },
    ],
  },
  {
    id: "settings",
    label: "Look & Feel",
    subtabs: [
      { id: "feel", label: "Design Language", src: "/images/feel.webp" },
      { id: "overview", label: "System Overview", src: "/images/example.webp" },
    ],
  },
] as const satisfies readonly ShowcaseTab[];
