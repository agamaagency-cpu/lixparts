"use client";

import { useEffect, useState } from "react";
import PartImage from "./PartImage";
import { CloseIcon } from "./Icons";

export interface GalleryItem {
  label: string;
  sub?: string;
}

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (active !== null && e.key === "ArrowRight")
        setActive((active + 1) % items.length);
      if (active !== null && e.key === "ArrowLeft")
        setActive((active - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, items.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="group relative overflow-hidden rounded-xl border border-graphite-200 text-left transition-all hover:shadow-card"
          >
            <PartImage label={item.label} sub={item.sub} tone={i} ratio="aspect-square" />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/40 to-transparent p-3 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              {item.label}
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">
                Увеличить
              </span>
            </span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-graphite-950/85 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setActive(null)}
            aria-label="Закрыть"
          >
            <CloseIcon width={22} height={22} />
          </button>
          <div
            className="w-full max-w-3xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <PartImage
              label={items[active].label}
              sub={items[active].sub}
              tone={active}
              ratio="aspect-[4/3]"
              big
            />
          </div>
        </div>
      )}
    </>
  );
}
