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
      { id: "wallpaper", label: "Wallpaper Manager", src: "/images/wallpaper-manager.png" },
      { id: "lockscreen", label: "Lock Screen", src: "/images/lockscreen.png" },
    ],
  },
  {
    id: "launcher",
    label: "Launcher",
    subtabs: [
      { id: "launcher", label: "App Launcher", src: "/images/applauncher.png" },
    ],
  },
  {
    id: "dev",
    label: "Dev workflow",
    subtabs: [
      { id: "nitrovim-code", label: "NitroVim Code", src: "/images/nitrovim-code.png" },
      { id: "nitrovim-start", label: "NitroVim Start", src: "/images/nitrovim.png" },
    ],
  },
  {
    id: "npk",
    label: "NPK & System",
    subtabs: [
      { id: "fastfetch", label: "Fastfetch Terminal", src: "/images/fastfetch.png" },
    ],
  },
  {
    id: "settings",
    label: "Look & Feel",
    subtabs: [
      { id: "feel", label: "Design Language", src: "/images/feel.png" },
      { id: "overview", label: "System Overview", src: "/images/example.png" },
    ],
  },
] as const satisfies readonly ShowcaseTab[];
