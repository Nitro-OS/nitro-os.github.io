export interface WhyNitroRow {
  key: string;
  title: string;
  desc: string;
}

export const whyNitroRows: WhyNitroRow[] = [
  {
    key: "configs",
    title: "Thoughtfully tuned, not just defaulted",
    desc: "Every config ships reviewed and tested — not a stock file with the comments left in.",
  },
  {
    key: "launcher",
    title: "One consistent launcher, everywhere",
    desc: "Every launcher surface shares the same polish, motion, and keyboard model.",
  },
  {
    key: "editor",
    title: "NitroVim, included",
    desc: "A modal editor tuned for speed, with sane keybinds from the first keystroke.",
  },
  {
    key: "packages",
    title: "NPK for software management",
    desc: "Install, update, and remove software with one predictable command.",
  },
  {
    key: "defaults",
    title: "Smooth defaults, advanced control",
    desc: "Everything works on day one. Everything is still yours to override.",
  },
  {
    key: "workflow",
    title: "Built for productivity and speed",
    desc: "Fewer clicks, fewer context switches, less time spent fighting the system.",
  },
];
