import { createSignal, Show, createEffect, For } from "solid-js";
import { Portal } from "solid-js/web";
import { FaBrandsGithub } from "solid-icons/fa";
import { Menu, X } from "lucide-solid";

const LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#why", label: "Why Nitro" },
  { href: "/#tools", label: "Tools" },
  { href: "/#showcase", label: "Showcase" },
  { href: "/docs", label: "Docs" },
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
    <div class="flex items-center shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open()}
        aria-label="Toggle menu"
        class="relative z-[60] flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-text-muted hover:text-text hover:bg-surface-2/60 transition-colors active:scale-90 shrink-0 outline-none focus:outline-none"
      >
        <span class="pointer-events-none flex items-center justify-center">
          {open() ? (
            <X size={17} strokeWidth={1.8} />
          ) : (
            <Menu size={17} strokeWidth={1.8} />
          )}
        </span>
      </button>

      <Show when={open()}>
        <Portal>
          <div 
            onClick={() => setOpen(false)}
            class="fixed inset-0 z-40 bg-black/50 animate-fade-in"
            style={{
              "backdrop-filter": "blur(6px)",
              "-webkit-backdrop-filter": "blur(6px)"
            }}
          />

          <div 
            class="fixed top-18 sm:top-20 left-3 right-3 sm:left-6 sm:right-6 z-50 flex flex-col gap-4 rounded-2xl border border-border bg-surface/95 p-5 sm:p-6 shadow-2xl max-w-md mx-auto animate-fade-in"
            style={{
              "backdrop-filter": "blur(24px)",
              "-webkit-backdrop-filter": "blur(24px)"
            }}
          >
            <div class="flex flex-col divide-y divide-border/40">
              <For each={LINKS}>
                {(link) => (
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    class="flex items-center justify-between py-3.5 px-3 font-medium text-[14px] text-text-muted hover:text-text hover:bg-surface-2/30 transition-colors"
                  >
                    <span>{link.label}</span>
                    <span class="text-accent text-xs font-semibold">❯</span>
                  </a>
                )}
              </For>
            </div>
            
            <div class="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Nitro-OS"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                class="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-muted transition-colors hover:border-accent/40 hover:text-accent shrink-0 shadow-sm"
              >
                <FaBrandsGithub size={18} class="h-4.5 w-4.5" />
              </a>
              <a
                href="#download"
                onClick={() => setOpen(false)}
                class="flex-1 inline-flex items-center justify-center rounded-xl bg-accent py-2.5 text-center font-display text-[13px] font-semibold text-bg transition-colors hover:bg-accent-dim shadow-[0_2px_12px_rgba(41,156,69,0.25)]"
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
