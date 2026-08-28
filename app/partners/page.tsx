import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import { SectionHeading } from "@/components/ui";
import {
  BoxIcon,
  CameraIcon,
  CheckIcon,
  TagIcon,
  TruckIcon,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Для СТО и кузовных мастеров — оптовые поставки Li Auto",
  description:
    "Оригинальные кузовные детали Li Auto для сервисов и частных мастеров: оптовые заявки, регулярные поставки, прайс-лист и быстрый подбор деталей.",
  alternates: { canonical: "/partners" },
};

const perks = [
  { icon: TagIcon, title: "Специальные условия", text: "Оптовые цены для сервисов и регулярных клиентов." },
  { icon: TruckIcon, title: "Регулярные поставки", text: "Формируем поставки под ваш поток заказов." },
  { icon: CameraIcon, title: "Фото и видео деталей", text: "Присылаем реальные материалы до отгрузки." },
  { icon: BoxIcon, title: "Подбор под ремонт", text: "Быстро находим кузовные детали под конкретный кейс." },
];

const bullets = [
  "Оригинальные кузовные детали Li Auto L6, L7, L9",
  "Приоритетный подбор по VIN и коду цвета",
  "Помощь с попаданием в цвет — установка без покраски",
  "Отсрочка и договор для постоянных партнёров",
];

export default function PartnersPage() {
  return (
    <div>
      <section className="border-b border-graphite-200 bg-graphite-50">
        <div className="container-x py-12 sm:py-16">
          <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Для СТО" }]} />
          <div className="mt-6 max-w-2xl">
            <span className="inline-flex rounded-full bg-graphite-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Партнёрам
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-graphite-900 sm:text-5xl">
              Работаете в кузовном ремонте?
            </h1>
            <p className="mt-4 text-lg text-graphite-500">
              Предлагаем оригинальные кузовные детали Li Auto для сервисов и частных
              мастеров. Оптовые заявки, регулярные поставки и быстрый подбор.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => (
            <div key={p.title} className="rounded-2xl border border-graphite-200 bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-graphite-900 text-white">
                <p.icon width={22} height={22} />
              </span>
              <h3 className="mt-5 text-base font-semibold text-graphite-900">{p.title}</h3>
              <p className="mt-2 text-sm text-graphite-500">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-graphite-200 bg-graphite-50">
        <div className="container-x py-16">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Сотрудничество"
                title="Что получают партнёры"
              />
              <ul className="mt-6 space-y-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-graphite-600">
                    <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-emerald-600" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <LeadForm
              fields={["name", "company", "phone", "model", "comment"]}
              title="Получить прайс-лист"
              submitLabel="Получить прайс"
              source="Заявка от СТО"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
