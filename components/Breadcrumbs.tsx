import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-graphite-400">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className="hover:text-graphite-700">
                  {item.label}
                </Link>
              ) : (
                <span className={last ? "text-graphite-700" : ""}>{item.label}</span>
              )}
              {!last && <span className="text-graphite-300">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
