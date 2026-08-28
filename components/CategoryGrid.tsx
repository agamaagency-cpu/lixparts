import Link from "next/link";
import { categories, getCategory } from "@/lib/data";
import { ArrowRight, CategoryGlyph } from "./Icons";

/**
 * Сетка категорий. Ссылка ведёт в каталог с предвыбранной категорией.
 * modelSlug опционален — если задан, ссылка ведёт в каталог модели.
 */
export default function CategoryGrid({
  slugs,
  modelSlug,
}: {
  slugs?: string[];
  modelSlug?: string;
}) {
  const list = (slugs ?? categories.map((c) => c.slug))
    .map((s) => getCategory(s))
    .filter(Boolean);

  const hrefFor = (slug: string) =>
    modelSlug
      ? `/catalog/${modelSlug}?category=${slug}`
      : `/catalog?category=${slug}`;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {list.map((c, i) => (
        <Link
          key={c!.slug}
          href={hrefFor(c!.slug)}
          className="group flex flex-col justify-between rounded-2xl border border-graphite-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-graphite-300 hover:shadow-card"
        >
          <span className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-graphite-100 text-graphite-700 transition-colors group-hover:bg-graphite-900 group-hover:text-white">
            <CategoryGlyph name={c!.icon} width={22} height={22} />
          </span>
          <span>
            <span className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-graphite-900">
                {c!.name}
              </span>
              <ArrowRight
                width={16}
                height={16}
                className="shrink-0 text-graphite-300 transition-all group-hover:translate-x-0.5 group-hover:text-graphite-900"
              />
            </span>
            {c!.nameEn && (
              <span className="mt-0.5 block text-[11px] uppercase tracking-wide text-graphite-400">
                {c!.nameEn}
              </span>
            )}
          </span>
        </Link>
      ))}
    </div>
  );
}
