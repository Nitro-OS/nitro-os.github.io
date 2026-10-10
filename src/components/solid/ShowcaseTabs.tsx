import { createEffect, createSignal, onMount, onCleanup, For, Show } from "solid-js";
import { TABS, type Subtab } from "../../data/showcase";

type TabId = (typeof TABS)[number]["id"];
const SCREENSHOTS = TABS.flatMap<Subtab>((tab) => [...tab.subtabs]);

interface KeyConfig {
  flex: string;
  bg?: string;
  isPower?: boolean;
}

const KEYBOARD_ROWS: { height: string; keys: KeyConfig[] }[] = [
  // Function row (12 function keys + 1 power key)
  {
    height: "h-[14%]",
    keys: [
      ...Array.from({ length: 12 }, () => ({ flex: "flex-1", bg: "bg-[#141916]" })),
      { flex: "flex-1", bg: "bg-[#141916]", isPower: true },
    ],
  },
  // Number row
  {
    height: "h-[17%]",
    keys: [
      { flex: "flex-[1.5]", bg: "bg-[#161c18]" },
      ...Array.from({ length: 11 }, () => ({ flex: "flex-1", bg: "bg-[#161c18]" })),
      { flex: "flex-[1.8]", bg: "bg-[#161c18]" },
    ],
  },
  // QWERTY row
  {
    height: "h-[17%]",
    keys: [
      { flex: "flex-[1.6]", bg: "bg-[#161c18]" },
      ...Array.from({ length: 11 }, () => ({ flex: "flex-1", bg: "bg-[#161c18]" })),
      { flex: "flex-[1.5]", bg: "bg-[#161c18]" },
    ],
  },
  // ASDF row
  {
    height: "h-[17%]",
    keys: [
      { flex: "flex-[1.9]", bg: "bg-[#161c18]" },
      ...Array.from({ length: 10 }, () => ({ flex: "flex-1", bg: "bg-[#161c18]" })),
      { flex: "flex-[2.1]", bg: "bg-[#161c18]" },
    ],
  },
  // Spacebar and modifiers row
  {
    height: "h-[18%]",
    keys: [
      { flex: "flex-[1.3]", bg: "bg-[#141916]" },
      { flex: "flex-1", bg: "bg-[#141916]" },
      { flex: "flex-[1.2]", bg: "bg-[#141916]" },
      { flex: "flex-[6]", bg: "bg-[#171e19]" },
      { flex: "flex-[1.2]", bg: "bg-[#141916]" },
      { flex: "flex-1", bg: "bg-[#141916]" },
      { flex: "flex-[1.5]", bg: "bg-[#141916]" },
    ],
  },
];

export default function ShowcaseTabs() {
  const [activeTab, setActiveTab] = createSignal<TabId>("desktop");
  const [scrollProgress, setScrollProgress] = createSignal<number>(0);
  let sectionRef: HTMLDivElement | undefined;
  const screenImages: HTMLImageElement[] = [];

  const [activeSubtabs, setActiveSubtabs] = createSignal<Record<TabId, string>>({
    desktop: "wallpaper",
    launcher: "launcher",
    dev: "nitrovim-code",
    npk: "fastfetch",
    settings: "feel",
  });

  const updateScroll = () => {
    if (!sectionRef) return;
    const rect = sectionRef.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Start opening when the showcase section is clearly entering the viewport
    const startY = windowHeight * 0.70;
    // Fully open when the showcase section reaches the upper portion of view
    const endY = windowHeight * 0.15;

    const raw = (startY - rect.top) / (startY - endY);
    const clamped = Math.max(0, Math.min(1, raw));
    setScrollProgress(clamped);
  };

  onMount(() => {
    // Cached eager images may finish before Solid attaches load handlers.
    setLoadedSources(new Set(screenImages
      .filter((image) => image.complete && image.naturalWidth > 0)
      .map((image) => image.getAttribute("src")!)));
    // Initial check (starts closed at scrollY = 0)
    updateScroll();

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateScroll();
          rafId = null;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    onCleanup(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    });
  });

  const currentTabObj = () => TABS.find((t) => t.id === activeTab());

  const currentSubtabObj = () => {
    const tabObj = currentTabObj();
    if (!tabObj) return null;
    const subId = activeSubtabs()[tabObj.id];
    return tabObj.subtabs.find((s) => s.id === subId) || tabObj.subtabs[0];
  };

  const [displayedSrc, setDisplayedSrc] = createSignal<string>(SCREENSHOTS[0].src);
  const [loadedSources, setLoadedSources] = createSignal<ReadonlySet<string>>(new Set());

  // Keep the previous screen visible until the latest selection has loaded.
  // Persistent layers let CSS reverse an in-flight transition on rapid clicks.
  createEffect(() => {
    const selected = currentSubtabObj();
    if (selected && loadedSources().has(selected.src)) {
      setDisplayedSrc(selected.src);
    }
  });

  const setSubtab = (tabId: TabId, subtabId: string) => {
    setActiveSubtabs((prev) => ({
      ...prev,
      [tabId]: subtabId,
    }));
  };

  // Interpolated angle from -82deg (closed) to 0deg (fully open)
  const currentAngle = () => {
    const p = scrollProgress();
    return (-82 * (1 - p)).toFixed(2);
  };

  // Screen brightness from 0.35 to 1.0
  const currentBrightness = () => {
    const p = scrollProgress();
    return (0.35 + 0.65 * p).toFixed(3);
  };

  // Glow opacity from 0 to 1.0
  const currentGlow = () => {
    return scrollProgress().toFixed(3);
  };

  return (
    <div ref={sectionRef} class="w-full flex flex-col items-center">
      {/* Tab controls bar (relative z-40 ensures tablet taps are never captured by 3D lid) */}
      <div class="relative z-40 flex flex-col min-[920px]:flex-row items-center justify-between w-full gap-4 mb-8">
        <div
          role="tablist"
          aria-label="Nitro OS surfaces"
          class="flex flex-wrap justify-center w-full min-[920px]:w-fit gap-1.5 bg-surface-2/60 p-1.5 rounded-2xl border border-border/80 backdrop-blur-md sm:flex-row sm:rounded-full sm:p-1 sm:gap-1"
        >
          <For each={TABS}>
            {(tab) => (
              <button
                role="tab"
                aria-selected={activeTab() === tab.id}
                onClick={() => setActiveTab(tab.id)}
                class={`w-full sm:w-auto rounded-xl sm:rounded-full px-4 sm:px-5 py-2 text-[13.5px] font-medium tracking-tight text-center transition-all duration-200 cursor-pointer ${
                  activeTab() === tab.id
                    ? "bg-accent text-white font-semibold shadow-sm"
                    : "text-text-muted hover:text-text hover:bg-surface-2/40 sm:hover:bg-transparent"
                }`}
              >
                {tab.label}
              </button>
            )}
          </For>
        </div>

        {/* Subtabs controls */}
        <Show when={currentTabObj() && currentTabObj()!.subtabs.length > 1}>
          <div class="flex items-center gap-1 bg-surface-2/80 p-0.5 rounded-full border border-border">
            <For each={currentTabObj()!.subtabs}>
              {(sub) => (
                <button
                  onClick={() => setSubtab(activeTab(), sub.id)}
                  aria-pressed={currentSubtabObj()?.id === sub.id}
                  class={`px-3 py-1 rounded-full text-[11.5px] font-medium transition-all duration-200 cursor-pointer ${
                    currentSubtabObj()?.id === sub.id
                      ? "bg-accent text-white font-semibold"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {sub.label}
                </button>
              )}
            </For>
          </div>
        </Show>
      </div>

      {/* 3D Laptop Mockup Stage */}
      <div class="w-full max-w-5xl relative laptop-stage pt-4 pb-12 flex flex-col items-center overflow-visible">
        {/* Ambient glow underneath laptop */}
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-64 bg-accent/15 blur-3xl rounded-full pointer-events-none transition-opacity duration-300"
          style={{ opacity: currentGlow() }}
        />

        {/* Laptop Container */}
        <div class="relative w-full laptop-preserve-3d flex flex-col items-center">
          {/* Laptop Lid (Screen) */}
          <div
            class="relative w-full laptop-lid z-30 shadow-2xl"
            style={{
              transform: `rotateX(${currentAngle()}deg)`,
              transition: "transform 0.12s cubic-bezier(0.2, 0.8, 0.4, 1)",
            }}
          >
            {/* Screen Bezel & Display */}
            <div
              class="relative w-full bg-[#0c0f0d] border-[3px] sm:border-4 border-[#252f28] rounded-t-2xl sm:rounded-t-3xl overflow-hidden flex flex-col shadow-2xl p-2 sm:p-3 pb-1.5"
              style={{
                filter: `brightness(${currentBrightness()})`,
                transition: "filter 0.12s ease-out",
              }}
            >
              {/* Bezel header with realistic hardware webcam module */}
              <div class="relative w-full flex items-center justify-center py-1 sm:py-1.5 shrink-0">
                <div class="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#070a08] border border-white/[0.04]">
                  {/* Left mic pinhole */}
                  <div class="w-1 h-1 rounded-full bg-[#020302] border border-white/10" />
                  {/* Camera lens with multi-coated glass elements */}
                  <div class="relative w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#020403] border border-white/20 shadow-inner flex items-center justify-center">
                    <div class="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#09111e] border border-[#17253a] flex items-center justify-center">
                      <div class="w-0.5 h-0.5 rounded-full bg-white/40" />
                    </div>
                  </div>
                  {/* Right mic / sensor pinhole */}
                  <div class="w-1 h-1 rounded-full bg-[#020302] border border-white/10" />
                </div>
              </div>

              {/* Display Area */}
              <div class="relative aspect-video w-full shrink-0 bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-inner flex flex-col">
                {/* Screenshot Display */}
                <div class="relative flex-1 w-full bg-bg overflow-hidden">
                  <For each={SCREENSHOTS}>
                    {(sub) => (
                      <img
                        ref={(image) => screenImages.push(image)}
                        src={sub.src}
                        alt={sub.label}
                        aria-hidden={displayedSrc() !== sub.src}
                        class="showcase-screen absolute inset-0 h-full w-full object-contain select-none pointer-events-none"
                        style={{ "--screen-offset": `${Math.sign(SCREENSHOTS.indexOf(sub) - SCREENSHOTS.findIndex((screen) => screen.src === displayedSrc())) * 100}%` }}
                        classList={{ "is-active": displayedSrc() === sub.src }}
                        onLoad={() => setLoadedSources((previous) => new Set([...previous, sub.src]))}
                        loading="eager"
                        decoding="async"
                      />
                    )}
                  </For>
                </div>
              </div>

              {/* Bottom Bezel with NitroOS Logo */}
              <div class="relative w-full flex items-center justify-center pt-2 sm:pt-2.5 pb-0.5 shrink-0">
                <div class="flex items-center gap-1.5 opacity-60 hover:opacity-90 transition-opacity select-none">
                  <svg
                    viewBox="0 0 500 500"
                    class="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-300 fill-current shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M 174.3 78.7 L 168.3 95.0 L 152.7 153.0 L 156.8 164.0 L 170.6 179.0 L 174.4 185.5 L 170.0 184.4 L 152.6 173.8 L 148.6 174.1 L 145.8 177.3 L 110.1 319.4 L 113.9 321.1 L 128.7 313.9 L 131.7 314.5 L 110.1 341.0 L 102.8 353.0 L 75.3 420.0 L 69.7 438.0 L 73.7 436.2 L 100.0 411.0 L 124.0 392.1 L 149.0 377.2 L 180.7 364.7 L 186.3 359.8 L 188.0 353.0 L 188.7 243.0 L 190.6 241.2 L 197.0 247.0 L 267.0 353.0 L 272.2 358.8 L 281.0 363.3 L 305.0 366.4 L 329.0 371.9 L 359.0 383.9 L 390.0 403.8 L 429.2 438.6 L 427.6 431.0 L 397.3 356.0 L 386.2 339.0 L 364.3 313.5 L 365.0 312.3 L 386.5 322.1 L 389.5 322.2 L 391.0 320.5 L 371.8 236.7 L 368.9 234.1 L 364.6 234.4 L 350.1 243.6 L 345.7 244.5 L 362.8 222.0 L 365.4 215.0 L 365.5 209.0 L 345.4 133.0 L 330.3 85.2 L 327.6 84.0 L 324.8 89.0 L 299.0 171.0 L 297.8 287.0 L 297.0 291.8 L 295.2 293.2 L 290.4 288.0 L 220.3 167.0 L 179.4 82.1 L 176.7 78.7 Z" />
                  </svg>
                  <span class="text-[9px] sm:text-[10px] font-semibold tracking-widest text-neutral-400 font-display uppercase">
                    Nitro<span class="text-neutral-500 font-normal">OS</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hinge bar at pivot line */}
          <div class="relative w-3/4 h-2 sm:h-2.5 -mt-1 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 rounded-full border border-neutral-800 z-20 shadow-md" />

          {/* LAPTOP BASE (Keyboard Deck, Trackpad & Notch) */}
          <div
            class="relative w-[101%] -mt-1 h-44 sm:h-64 md:h-80 laptop-base bg-gradient-to-b from-[#1b211d] via-[#141815] to-[#0c0f0d] border-2 border-[#2b352e] border-t-[3px] border-t-[#171d19] rounded-b-2xl sm:rounded-b-3xl shadow-[0_35px_70px_rgba(0,0,0,0.9),0_0_60px_rgba(41,156,69,0.18)] flex flex-col items-center px-4 sm:px-8 pt-3 sm:pt-5 z-10"
          >
            {/* Keyboard Deck Well */}
            <div class="w-[92%] h-[56%] bg-[#080b09] rounded-lg border border-[#1e2520] p-1.5 sm:p-2.5 flex flex-col justify-between shadow-inner">
              <For each={KEYBOARD_ROWS}>
                {(row) => (
                  <div class={`flex gap-1 ${row.height} w-full`}>
                    <For each={row.keys}>
                      {(key) => (
                        <div
                          class={`${key.flex} ${key.bg ?? "bg-[#161c18]"} rounded-xs border-b border-[#0a0d0b] relative flex items-center justify-center`}
                        >
                          <Show when={key.isPower}>
                            {/* Power indicator dot */}
                            <span class="w-1 h-1 rounded-full bg-accent shadow-[0_0_3px_#299C45]" />
                          </Show>
                        </div>
                      )}
                    </For>
                  </div>
                )}
              </For>
            </div>

            {/* Glass Trackpad */}
            <div class="w-28 sm:w-44 md:w-56 h-10 sm:h-16 md:h-20 mt-2 sm:mt-3 bg-white/[0.015] border border-white/[0.06] rounded-lg sm:rounded-xl shadow-inner" />

            {/* Front Notch */}
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-1.5 sm:h-2 bg-[#0a0d0b] rounded-t-md border-t border-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
