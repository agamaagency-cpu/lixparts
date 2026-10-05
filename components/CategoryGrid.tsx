import Link from "next/link";
import { categories, categoryCoverPhoto, getCategory } from "@/lib/data";
import PartImage from "./PartImage";
import { ArrowRight } from "./Icons";

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
          className="group flex flex-col overflow-hidden rounded-2xl border border-graphite-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-graphite-300 hover:shadow-card"
        >
          <PartImage label={c!.name} src={categoryCoverPhoto(c!.slug)} ratio="aspect-[4/3]" tone={i} />
          <span className="flex items-center justify-between gap-2 px-4 py-3">
            <span className="text-sm font-semibold text-graphite-900">{c!.name}</span>
            <ArrowRight
              width={16}
              height={16}
              className="shrink-0 text-graphite-300 transition-all group-hover:translate-x-0.5 group-hover:text-graphite-900"
            />
          </span>
        </Link>
      ))}
    </div>
  );
}
