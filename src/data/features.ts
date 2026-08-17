import type { AstroComponent } from "@lucide/astro";
import { Zap, Shield, Sliders, Monitor, Gauge, Code2 } from "@lucide/astro";

export interface FeatureItem {
  title: string;
  desc: string;
  icon: AstroComponent;
}

export const features: FeatureItem[] = [
  {
    title: "Fast and lightweight",
    desc: "Boots in seconds and stays out of the way. No background bloat, no wasted cycles.",
    icon: Zap,
  },
  {
    title: "Minimal by default",
    desc: "A clean surface from first login. Nothing to strip out, nothing you didn't ask for.",
    icon: Shield,
  },
  {
    title: "Highly customizable",
    desc: "Every layer is yours to reshape — theming, keybinds, launcher behavior, and more.",
    icon: Sliders,
  },
  {
    title: "Modern desktop",
    desc: "A composited, responsive desktop that feels current without chasing trends.",
    icon: Monitor,
  },
  {
    title: "Performance-focused",
    desc: "A scheduler and power profile tuned for real workloads, not benchmarks.",
    icon: Gauge,
  },
  {
    title: "Built for developers",
    desc: "NitroVim, a real terminal workflow, and NPK — the tools you already reach for.",
    icon: Code2,
  },
];
