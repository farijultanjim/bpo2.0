"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Palette } from "lucide-react";

export interface ThemeOption {
  id: "forest" | "coral" | "cobalt" | "canary";
  name: string;
  primary: string;
  accent: string;
}

export const THEMES: ThemeOption[] = [
  {
    id: "forest",
    name: "Forest Lime",
    primary: "#183c31",
    accent: "#c9f36a",
  },
  {
    id: "coral",
    name: "Twilight Coral",
    primary: "#1E2548",
    accent: "#FF5A4E",
  },
  {
    id: "cobalt",
    name: "Sapphire Cyan",
    primary: "#083270",
    accent: "#00E5FF",
  },
  {
    id: "canary",
    name: "Electric Canary",
    primary: "#006BFF",
    accent: "#FFF100",
  },
];

export function ThemeSwitcher({
  className = "",
  showName = false,
  compact = false,
}: {
  className?: string;
  showName?: boolean;
  compact?: boolean;
}) {
  const [activeTheme, setActiveTheme] = useState<ThemeOption["id"]>("forest");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("spectra-brand-theme") as ThemeOption["id"] | null;
    if (saved && THEMES.some((t) => t.id === saved)) {
      setActiveTheme(saved);
      document.documentElement.setAttribute("data-theme", saved === "forest" ? "" : saved);
    }
  }, []);

  const selectTheme = (id: ThemeOption["id"]) => {
    setActiveTheme(id);
    localStorage.setItem("spectra-brand-theme", id);
    if (id === "forest") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", id);
    }
    setIsOpen(false);
  };

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const currentTheme = THEMES.find((t) => t.id === activeTheme) || THEMES[0];

  return (
    <div ref={containerRef} className={`relative inline-flex items-center ${className}`}>
      {/* Ultra-compact Trigger Pill */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Switch Theme: currently ${currentTheme.name}`}
        title={`Theme: ${currentTheme.name}`}
        className="group relative flex h-9 sm:h-10 items-center justify-center gap-1.5 rounded-full border border-white/20 bg-primary/80 backdrop-blur-xl px-2.5 sm:px-3 text-xs font-bold text-background transition-all duration-300 hover:border-accent hover:bg-primary cursor-pointer shadow-md shrink-0"
      >
        <Palette size={14} className="text-accent transition-transform duration-300 group-hover:rotate-45 shrink-0" />

        {/* Dual color dot swatch */}
        <span className="flex items-center -space-x-1 shrink-0" aria-hidden="true">
          <span
            className="size-3 rounded-full border border-white/40 shadow-sm"
            style={{ backgroundColor: currentTheme.primary }}
          />
          <span
            className="size-3 rounded-full border border-white/40 shadow-sm"
            style={{ backgroundColor: currentTheme.accent }}
          />
        </span>

        {showName && (
          <span className="text-[11px] font-bold uppercase tracking-wider hidden xl:inline-block">
            {currentTheme.name.split(" ")[0]}
          </span>
        )}
      </button>

      {/* Sleek Compact Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Select website brand theme"
          className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-2xl border border-white/20 bg-primary/95 p-1 shadow-2xl shadow-black/80 backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="space-y-0.5">
            {THEMES.map((theme) => {
              const isSelected = theme.id === activeTheme;
              return (
                <button
                  key={theme.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => selectTheme(theme.id)}
                  className={`w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-white/15 text-background font-bold shadow-sm"
                      : "text-background/80 hover:bg-white/10 hover:text-background"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {/* Color Swatches */}
                    <div className="flex items-center -space-x-1 shrink-0">
                      <span
                        className="size-3 rounded-full border border-white/30"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <span
                        className="size-3 rounded-full border border-white/30"
                        style={{ backgroundColor: theme.accent }}
                      />
                    </div>

                    <span className="text-[11px] leading-tight truncate">
                      {theme.name}
                    </span>
                  </div>

                  {isSelected && (
                    <Check size={13} className="text-accent shrink-0 ml-1.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
