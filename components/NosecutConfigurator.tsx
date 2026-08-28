"use client";

import { useMemo, useState } from "react";
import { nosecutKits, nosecutParts } from "@/lib/data";
import { CheckIcon, CloseIcon } from "./Icons";

type KitKey = (typeof nosecutKits)[number]["key"];

export default function NosecutConfigurator() {
  const [kit, setKit] = useState<KitKey>("standard");

  const groups = useMemo(() => {
    const map = new Map<string, typeof nosecutParts>();
    for (const p of nosecutParts) {
      if (!map.has(p.group)) map.set(p.group, []);
      map.get(p.group)!.push(p);
    }
    return Array.from(map.entries());
  }, []);

  const included = nosecutParts.filter((p) => p[kit]).length;

  return (
    <div>
      {/* Выбор комплектации */}
      <div className="flex flex-wrap gap-3">
        {nosecutKits.map((k) => (
          <button
            key={k.key}
            onClick={() => setKit(k.key)}
            className={`flex-1 rounded-2xl border p-5 text-left transition-all ${
              kit === k.key
                ? "border-graphite-900 bg-graphite-900 text-white shadow-card"
                : "border-graphite-200 bg-white hover:border-graphite-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">{k.title}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  kit === k.key ? "bg-white/15 text-white" : "bg-graphite-100 text-graphite-600"
                }`}
              >
                {nosecutParts.filter((p) => p[k.key]).length} деталей
              </span>
            </div>
            <p
              className={`mt-1 text-sm ${
                kit === k.key ? "text-graphite-300" : "text-graphite-500"
              }`}
            >
              {k.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Таблица-конструктор */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-graphite-200 bg-white">
        {groups.map(([groupName, parts]) => (
          <div key={groupName} className="border-b border-graphite-100 last:border-0">
            <div className="bg-graphite-50 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-graphite-500">
              {groupName}
            </div>
            <ul>
              {parts.map((p) => {
                const on = p[kit];
                return (
                  <li
                    key={p.name}
                    className="flex items-center justify-between gap-4 px-5 py-3 text-sm"
                  >
                    <span
                      className={on ? "font-medium text-graphite-900" : "text-graphite-400"}
                    >
                      {p.name}
                    </span>
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        on
                          ? "bg-emerald-500 text-white"
                          : "bg-graphite-100 text-graphite-400"
                      }`}
                    >
                      {on ? <CheckIcon width={15} height={15} /> : <CloseIcon width={13} height={13} />}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <div className="flex items-center justify-between bg-graphite-900 px-5 py-4 text-white">
          <span className="text-sm font-medium">Итого в комплекте «{nosecutKits.find((k) => k.key === kit)?.title}»</span>
          <span className="text-lg font-semibold">{included} деталей</span>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <strong className="font-semibold">Важно:</strong> комплектация конкретного
        ноуската зависит от поступления. Полный состав уточняйте по фотографиям или у
        менеджера — набор выше показан как типовой пример.
      </div>
    </div>
  );
}
