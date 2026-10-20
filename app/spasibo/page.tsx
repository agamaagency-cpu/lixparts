import type { Metadata } from "next";
import Link from "next/link";
import { contacts } from "@/lib/data";
import { CheckIcon, InstagramGlyph, PhoneIcon, WhatsAppGlyph } from "@/components/Icons";
import ThanksGreeting from "./ThanksGreeting";

// Страница благодарности: цель конверсии для рекламы. Закрыта от индексации и не попадает в sitemap.
export const metadata: Metadata = {
  title: "Заявка принята",
  robots: { index: false, follow: false },
};

const steps = [
  { t: "Проверяем наличие", d: "Смотрим деталь на складе в Алматы или находим у поставщиков в Китае." },
  { t: "Сверяем совместимость", d: "По модели, году и VIN, если вы его указали. Уточним цвет и комплектацию." },
  { t: "Связываемся с вами", d: "Пришлём реальные фото детали, цену и срок." },
];

export default function ThanksPage() {
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-700 text-white">
          <CheckIcon width={32} height={32} />
        </span>
        <ThanksGreeting />
        <p className="mt-4 text-base leading-relaxed text-graphite-500">
          Менеджер свяжется с вами в рабочее время: {contacts.hours}. Если вы оставили заявку
          в нерабочее время, ответим в начале следующего рабочего дня.
        </p>
      </div>

      <ol className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.t} className="rounded-2xl border border-graphite-200 bg-white p-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-graphite-900 text-sm font-semibold text-white">
              {i + 1}
            </span>
            <h3 className="mt-4 font-semibold text-graphite-900">{s.t}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-graphite-500">{s.d}</p>
          </li>
        ))}
      </ol>

      <div className="mx-auto mt-12 max-w-2xl rounded-3xl bg-graphite-50 p-6 text-center sm:p-8">
        <h2 className="text-lg font-semibold text-graphite-900">Срочно?</h2>
        <p className="mt-1 text-sm text-graphite-500">Напишите или позвоните, ответим быстрее.</p>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={contacts.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-800"
          >
            <WhatsAppGlyph width={18} height={18} /> Написать в WhatsApp
          </a>
          <a
            href={contacts.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-graphite-900 ring-1 ring-inset ring-graphite-300 hover:bg-graphite-50"
          >
            <PhoneIcon width={18} height={18} /> {contacts.phone}
          </a>
        </div>
        <a
          href={contacts.instagramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm text-graphite-500 hover:text-graphite-900"
        >
          <InstagramGlyph width={16} height={16} /> Свежие поступления в Instagram {contacts.instagram}
        </a>
      </div>

      <div className="mt-10 text-center">
        <Link href="/catalog" className="text-sm font-medium text-graphite-700 underline underline-offset-4 hover:text-graphite-900">
          Вернуться в каталог
        </Link>
      </div>
    </section>
  );
}
