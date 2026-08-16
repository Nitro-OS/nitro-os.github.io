import { createSignal, For, Show } from "solid-js";

const TABS = [
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
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ShowcaseTabs() {
  const [activeTab, setActiveTab] = createSignal<TabId>("desktop");

  const [activeSubtabs, setActiveSubtabs] = createSignal<Record<TabId, string>>({
    desktop: "wallpaper",
    launcher: "launcher",
    dev: "nitrovim-code",
    npk: "fastfetch",
    settings: "feel",
  });

  const currentTabObj = () => TABS.find((t) => t.id === activeTab());

  const currentSubtabObj = () => {
    const tabObj = currentTabObj();

    if (!tabObj) {
      return null;
    }

    const subId = activeSubtabs()[tabObj.id];

    return tabObj.subtabs.find((s) => s.id === subId) || tabObj.subtabs[0];
  };

  const setSubtab = (tabId: TabId, subtabId: string) => {
    setActiveSubtabs((prev) => ({
      ...prev,
      [tabId]: subtabId,
    }));
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Nitro OS surfaces"
        class="flex flex-col w-full gap-1.5 bg-surface-2/60 p-1.5 rounded-2xl border border-border/80 backdrop-blur-md sm:flex-row sm:w-fit sm:rounded-full sm:p-1 sm:gap-1"
      >
        <For each={TABS}>
          {(tab) => (
            <button
              role="tab"
              aria-selected={activeTab() === tab.id}
              onClick={() => setActiveTab(tab.id)}
              class={`w-full sm:w-auto rounded-xl sm:rounded-full px-5 py-2.5 sm:py-2 font-mono text-[13.5px] tracking-tight text-left sm:text-center transition-all duration-200 ${activeTab() === tab.id
                ? "bg-accent text-bg shadow-sm"
                : "text-text-muted hover:text-text hover:bg-surface-2/40 sm:hover:bg-transparent"
                }`}
            >
              {tab.label}
            </button>
          )}
        </For>
      </div>

      <div class="mt-6 overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
        <Show when={currentTabObj() && currentTabObj()!.subtabs.length > 1}>
          <div class="flex items-center justify-between border-b border-border px-4 py-2.5 bg-bg/50">
            <div class="flex gap-1 bg-surface-2/80 p-0.5 rounded-full border border-border">
              <For each={currentTabObj()!.subtabs}>
                {(sub) => (
                  <button
                    onClick={() => setSubtab(activeTab(), sub.id)}
                    class={`px-3 py-1 rounded-full text-[11.5px] font-mono transition-all duration-200 ${currentSubtabObj()?.id === sub.id
                      ? "bg-accent text-bg"
                      : "text-text-muted hover:text-text"
                      }`}
                  >
                    {sub.label}
                  </button>
                )}
              </For>
            </div>
          </div>
        </Show>

        <div class="relative aspect-video w-full bg-bg overflow-hidden">
          <Show when={currentSubtabObj()}>
            {(sub) => (
              <div class="h-full w-full relative animate-fade-in">
                <img
                  src={sub().src}
                  alt={sub().label}
                  class="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            )}
          </Show>
        </div>
      </div>
    </div>
  );
}
