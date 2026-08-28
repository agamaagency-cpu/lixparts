import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button, SectionHeading } from "@/components/ui";
import CarSilhouette from "@/components/CarSilhouette";
import {
  CameraIcon,
  CheckIcon,
  PaintIcon,
  ShieldIcon,
  SparkIcon,
  TruckIcon,
} from "@/components/Icons";
import { models } from "@/lib/data";

export const metadata: Metadata = {
  title: "О компании — оригинальные запчасти Li Auto",
  description:
    "Мы поставляем оригинальные б/у кузовные и технические запчасти Li Auto L6, L7 и L9 из Китая. Минимальный износ, реальные фотографии, честное описание состояния.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: ShieldIcon, title: "Оригинал", text: "Работаем с оригинальными OEM деталями Li Auto." },
  { icon: SparkIcon, title: "Минимальный износ", text: "Детали с тестовых авто с небольшими пробегами." },
  { icon: CameraIcon, title: "Прозрачность", text: "Реальные фото и честное описание каждой позиции." },
  { icon: PaintIcon, title: "Экономия", text: "Кузовные элементы часто ставятся без покраски." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-graphite-200">
        <div className="container-x py-12 sm:py-16">
          <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "О компании" }]} />
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-graphite-900 sm:text-5xl">
                Оригинальные запчасти Li Auto из Китая
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-graphite-500">
                Мы специализируемся на оригинальных б/у кузовных и технических запчастях
                для Li Auto (Lixiang) L6, L7 и L9. Большинство деталей снимаются с
                автомобилей с минимальными пробегами и находятся в состоянии,
                максимально близком к новым — особенно это касается кузовных элементов.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/catalog" icon>Перейти в каталог</Button>
                <Button href="/contacts" variant="secondary">Связаться с нами</Button>
              </div>
            </div>
            <div className="rounded-3xl border border-graphite-200 bg-gradient-to-br from-graphite-50 to-graphite-100 p-8">
              <CarSilhouette className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <SectionHeading eyebrow="Наши принципы" title="Что для нас важно" center />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-graphite-200 bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-graphite-900 text-white">
                <v.icon width={22} height={22} />
              </span>
              <h3 className="mt-5 text-base font-semibold text-graphite-900">{v.title}</h3>
              <p className="mt-2 text-sm text-graphite-500">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-graphite-200 bg-graphite-50">
        <div className="container-x py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Что мы предлагаем" title="Услуги и возможности" />
              <ul className="mt-6 space-y-3">
                {[
                  "Запчасти в наличии на складе",
                  "Запчасти под заказ из Китая за 5–10 дней по договору",
                  "Консультацию и помощь с подбором",
                  "Проверку совместимости по VIN",
                  "Реальные фотографии каждой детали",
                  "Честное описание состояния",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-graphite-600">
                    <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-emerald-600" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="Модели" title="С какими авто работаем" />
              <div className="mt-6 grid gap-3">
                {models.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/catalog/${m.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-graphite-200 bg-white p-5 transition-colors hover:border-graphite-300"
                  >
                    <div>
                      <div className="text-base font-semibold text-graphite-900">{m.name}</div>
                      <div className="text-sm text-graphite-500">{m.tagline}</div>
                    </div>
                    <span className="text-sm font-medium text-graphite-700 group-hover:text-graphite-900">
                      Каталог →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="rounded-3xl bg-graphite-900 p-8 text-white sm:p-12">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Нужна конкретная деталь?
              </h2>
              <p className="mt-2 text-graphite-300">
                Отправьте название детали или VIN — подберём и подскажем по наличию.
              </p>
            </div>
            <div className="flex gap-3">
              <Button href="/catalog" variant="dark" icon>Каталог</Button>
              <Button href="/contacts" variant="dark">Контакты</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
