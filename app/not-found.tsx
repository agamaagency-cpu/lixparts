import Link from "next/link";
import { Button } from "@/components/ui";
import { models } from "@/lib/data";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="text-7xl font-bold tracking-tight text-graphite-200">404</span>
      <h1 className="mt-4 text-2xl font-semibold text-graphite-900">
        Страница не найдена
      </h1>
      <p className="mt-2 max-w-md text-sm text-graphite-500">
        Возможно, деталь ещё не заведена или ссылка устарела. Загляните в каталог или
        напишите нам — поможем найти нужную позицию.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button href="/catalog" icon>В каталог</Button>
        <Button href="/" variant="secondary">На главную</Button>
      </div>
      <div className="mt-8 flex gap-2">
        {models.map((m) => (
          <Link
            key={m.slug}
            href={`/catalog/${m.slug}`}
            className="rounded-full bg-graphite-100 px-4 py-2 text-sm font-medium text-graphite-700 hover:bg-graphite-200"
          >
            {m.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
