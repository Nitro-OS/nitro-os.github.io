import { createSignal, onMount, onCleanup } from "solid-js";
import { Sun, Moon } from "lucide-solid";

export default function ThemeToggle() {
  const [isLight, setIsLight] = createSignal<boolean>(false);

  const syncState = () => {
    if (typeof document !== "undefined") {
      setIsLight(document.documentElement.classList.contains("light"));
    }
  };

  onMount(() => {
    syncState();

    const handleThemeChange = () => syncState();
    window.addEventListener("theme-change", handleThemeChange);
    window.addEventListener("storage", handleThemeChange);

    onCleanup(() => {
      window.removeEventListener("theme-change", handleThemeChange);
      window.removeEventListener("storage", handleThemeChange);
    });
  });

  const toggle = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isCurrentlyLight = typeof document !== "undefined" && document.documentElement.classList.contains("light");
    const nextLight = !isCurrentlyLight;

    if (typeof document !== "undefined") {
      if (nextLight) {
        document.documentElement.classList.add("light");
        try {
          localStorage.setItem("theme", "light");
        } catch {}
      } else {
        document.documentElement.classList.remove("light");
        try {
          localStorage.setItem("theme", "dark");
        } catch {}
      }
    }

    setIsLight(nextLight);
    window.dispatchEvent(new CustomEvent("theme-change", { detail: { isLight: nextLight } }));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      class="relative z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-text-muted hover:text-text hover:bg-surface-2/60 transition-colors active:scale-90 shrink-0 select-none outline-none focus:outline-none"
    >
      <span class="pointer-events-none flex items-center justify-center">
        {isLight() ? (
          <Moon size={16} strokeWidth={2.2} />
        ) : (
          <Sun size={16} strokeWidth={2.2} />
        )}
      </span>
    </button>
  );
}
