"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  categories,
  categoryGroups,
  colorPalette,
  models,
  statusLabels,
} from "@/lib/data";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import { CloseIcon, FilterIcon, SearchIcon } from "./Icons";

type SortKey = "relevance" | "price_asc" | "price_desc";

const sides = [
  { key: "front", label: "Передняя часть" },
  { key: "rear", label: "Задняя часть" },
  { key: "left", label: "Левая" },
  { key: "right", label: "Правая" },
];

const conditionOptions = ["Отличное", "Хорошее", "Новое"];

export default function CatalogBrowser({
  products,
  lockedModel,
}: {
  products: Product[];
  lockedModel?: string;
}) {
  const params = useSearchParams();
  const initialCategory = params.get("category") || "";

  const [query, setQuery] = useState("");
  const [model, setModel] = useState<string>(lockedModel || "");
  const [group, setGroup] = useState<string>("");
  const [category, setCategory] = useState<string>(initialCategory);
  const [side, setSide] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [sort, setSort] = useState<SortKey>("relevance");
  const [mobileOpen, setMobileOpen] = useState(false);

  const availableCategories = useMemo(() => {
    if (!group) return categories;
    const g = categoryGroups.find((x) => x.slug === group);
    return categories.filter((c) => g?.categories.includes(c.slug));
  }, [group]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (model && p.model !== model) return false;
      if (category && p.categorySlug !== category) return false;
      if (group) {
        const g = categoryGroups.find((x) => x.slug === group);
        if (!g?.categories.includes(p.categorySlug)) return false;
      }
      if (side && p.side !== side) return false;
      if (color && p.color !== color) return false;
      if (condition && p.condition !== condition) return false;
      if (status && p.status !== status) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = `${p.name} ${p.model} ${p.sku} ${p.location} ${p.color}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (sort === "price_asc")
      list = [...list].sort((a, b) => (a.price ?? 1e12) - (b.price ?? 1e12));
    if (sort === "price_desc")
      list = [...list].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    return list;
  }, [products, model, category, group, side, color, condition, status, query, sort]);

  const activeCount =
    (model && !lockedModel ? 1 : 0) +
    (group ? 1 : 0) +
    (category ? 1 : 0) +
    (side ? 1 : 0) +
    (color ? 1 : 0) +
    (condition ? 1 : 0) +
    (status ? 1 : 0);

  const reset = () => {
    if (!lockedModel) setModel("");
    setGroup("");
    setCategory("");
    setSide("");
    setColor("");
    setCondition("");
    setStatus("");
  };

  const Filters = (
    <div className="space-y-6">
      {!lockedModel && (
        <FilterBlock title="Модель">
          <div className="flex flex-wrap gap-2">
            {models.map((m) => (
              <Chip
                key={m.slug}
                active={model === m.slug}
                onClick={() => setModel(model === m.slug ? "" : m.slug)}
              >
                {m.short}
              </Chip>
            ))}
          </div>
        </FilterBlock>
      )}

      <FilterBlock title="Раздел">
        <div className="flex flex-wrap gap-2">
          {categoryGroups.map((g) => (
            <Chip
              key={g.slug}
              active={group === g.slug}
              onClick={() => {
                setGroup(group === g.slug ? "" : g.slug);
                setCategory("");
              }}
            >
              {g.title}
            </Chip>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Категория">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-graphite-200 bg-white px-3 py-2.5 text-sm text-graphite-800 outline-none focus:border-graphite-400"
        >
          <option value="">Все категории</option>
          {availableCategories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </FilterBlock>

      <FilterBlock title="Расположение">
        <div className="flex flex-wrap gap-2">
          {sides.map((s) => (
            <Chip
              key={s.key}
              active={side === s.key}
              onClick={() => setSide(side === s.key ? "" : s.key)}
            >
              {s.label}
            </Chip>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Цвет">
        <div className="flex flex-wrap gap-2">
          {colorPalette.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(color === c.name ? "" : c.name)}
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs transition-colors ${
                color === c.name
                  ? "border-graphite-900 bg-graphite-900 text-white"
                  : "border-graphite-200 text-graphite-600 hover:border-graphite-400"
              }`}
            >
              <span
                className="h-3 w-3 rounded-full ring-1 ring-black/10"
                style={{ background: c.hex }}
              />
              {c.name}
            </button>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Состояние">
        <div className="flex flex-wrap gap-2">
          {conditionOptions.map((c) => (
            <Chip
              key={c}
              active={condition === c}
              onClick={() => setCondition(condition === c ? "" : c)}
            >
              {c}
            </Chip>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Наличие">
        <div className="flex flex-wrap gap-2">
          {(["in_stock", "on_order"] as const).map((s) => (
            <Chip
              key={s}
              active={status === s}
              onClick={() => setStatus(status === s ? "" : s)}
            >
              {statusLabels[s]}
            </Chip>
          ))}
        </div>
      </FilterBlock>

      {activeCount > 0 && (
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-sm font-medium text-graphite-500 hover:text-graphite-900"
        >
          <CloseIcon width={15} height={15} />
          Сбросить фильтры ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div>
      {/* Поиск + сортировка */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon
            width={18}
            height={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-graphite-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию, модели или артикулу…"
            className="w-full rounded-full border border-graphite-200 bg-white py-3 pl-11 pr-4 text-sm text-graphite-900 outline-none transition-colors placeholder:text-graphite-400 focus:border-graphite-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-graphite-200 bg-white px-4 py-3 text-sm text-graphite-800 outline-none focus:border-graphite-400"
          >
            <option value="relevance">По релевантности</option>
            <option value="price_asc">Дешевле</option>
            <option value="price_desc">Дороже</option>
          </select>
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-2 rounded-full border border-graphite-200 bg-white px-4 py-3 text-sm font-medium text-graphite-800 lg:hidden"
          >
            <FilterIcon width={18} height={18} />
            Фильтры
            {activeCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-graphite-900 text-[10px] text-white">
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Десктоп-фильтры */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-graphite-200 bg-white p-6">
            {Filters}
          </div>
        </aside>

        {/* Результаты */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-graphite-500">
              Найдено{" "}
              <span className="font-semibold text-graphite-900">{filtered.length}</span>{" "}
              {plural(filtered.length)}
            </p>
          </div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-graphite-300 bg-graphite-50 p-12 text-center">
              <p className="text-base font-medium text-graphite-700">
                Ничего не найдено
              </p>
              <p className="mt-1.5 text-sm text-graphite-500">
                Попробуйте изменить фильтры или оставьте заявку — привезём под заказ.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Мобильная панель фильтров */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-graphite-950/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-[86%] max-w-sm overflow-y-auto bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-graphite-900">Фильтры</h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-graphite-100"
              >
                <CloseIcon width={20} height={20} />
              </button>
            </div>
            {Filters}
            <button
              onClick={() => setMobileOpen(false)}
              className="mt-8 w-full rounded-full bg-graphite-900 py-3 text-sm font-medium text-white"
            >
              Показать {filtered.length} {plural(filtered.length)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-graphite-400">
        {title}
      </h4>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-graphite-900 bg-graphite-900 text-white"
          : "border-graphite-200 text-graphite-600 hover:border-graphite-400"
      }`}
    >
      {children}
    </button>
  );
}

function plural(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "деталь";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "детали";
  return "деталей";
}
