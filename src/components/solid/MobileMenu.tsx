import { createSignal, Show, createEffect, For } from "solid-js";
import { Portal } from "solid-js/web";
import { FaBrandsGithub } from "solid-icons/fa";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#why", label: "Why Nitro" },
  { href: "#tools", label: "Tools" },
  { href: "#showcase", label: "Showcase" },
];

export default function MobileMenu() {
  const [open, setOpen] = createSignal(false);

  createEffect(() => {
    if (open()) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  return (
    <div class="sm:hidden flex-shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open()}
        aria-label="Toggle menu"
        class="relative z-[60] flex h-9 w-9 cursor-pointer flex-shrink-0 flex-col items-center justify-center gap-[5px] text-text"
      >
        <span
          class="h-px w-5 bg-text transition-transform duration-200"
          style={{
            transform: open() ? "translateY(6px) rotate(45deg)" : "none",
          }}
        />
        <span
          class="h-px w-5 bg-text transition-opacity duration-150"
          style={{ opacity: open() ? 0 : 1 }}
        />
        <span
          class="h-px w-5 bg-text transition-transform duration-200"
          style={{
            transform: open() ? "translateY(-6px) rotate(-45deg)" : "none",
          }}
        />
      </button>

      <Show when={open()}>
        <Portal>
          <div 
            onClick={() => setOpen(false)}
            class="fixed inset-0 z-40 bg-black/40 animate-fade-in"
            style={{
              "backdrop-filter": "blur(4px)",
              "-webkit-backdrop-filter": "blur(4px)"
            }}
          />

          <div 
            class="fixed top-20 left-4 right-4 z-50 flex flex-col gap-4 rounded-2xl border border-border bg-surface/95 p-6 shadow-2xl max-w-md mx-auto animate-fade-in"
            style={{
              "backdrop-filter": "blur(20px)",
              "-webkit-backdrop-filter": "blur(20px)"
            }}
          >
            <div class="flex flex-col gap-1">
              <For each={LINKS}>
                {(link) => (
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    class="flex items-center justify-between border-b border-border/40 py-3.5 font-mono text-[13.5px] text-text-muted hover:text-text transition-colors"
                  >
                    <span>{link.label}</span>
                    <span class="text-accent text-[11px] font-semibold">❯</span>
                  </a>
                )}
              </For>
            </div>
            
            <div class="flex items-center gap-3 mt-2">
              <ThemeToggle />
              <a
                href="https://github.com/Nitro-OS/nitro-os.github.io"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                class="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-colors hover:border-accent/40 hover:text-accent shadow-sm"
              >
                <FaBrandsGithub size={16} class="h-4 w-4" />
              </a>
              <a
                href="#download"
                onClick={() => setOpen(false)}
                class="flex-1 inline-flex items-center justify-center rounded-full bg-accent py-3 text-center font-display text-[13px] font-semibold text-bg transition-colors hover:bg-accent-dim shadow-[0_2px_10px_rgba(41,156,69,0.2)]"
              >
                Download Nitro OS
              </a>
            </div>
          </div>
        </Portal>
      </Show>
    </div>
  );
}
