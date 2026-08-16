import { createSignal, createEffect } from "solid-js";
import { Sun, Moon } from "lucide-solid";

export default function ThemeToggle() {
  const [isLight, setIsLight] = createSignal<boolean>(false);

  createEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  });

  const toggle = () => {
    const nextLight = !isLight();

    setIsLight(nextLight);

    if (nextLight) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      class="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-colors hover:border-accent/40 hover:text-accent shadow-sm"
    >
      {isLight() ? (
        <Moon size={16} strokeWidth={2.5} />
      ) : (
        <Sun size={16} strokeWidth={2.5} />
      )}
    </button>
  );
}
