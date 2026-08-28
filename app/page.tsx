import Link from "next/link";
import {
  brand,
  contacts,
  faqs,
  getFeaturedProducts,
  models,
  popularCategorySlugs,
} from "@/lib/data";
import { Button, SectionHeading } from "@/components/ui";
import CarSilhouette from "@/components/CarSilhouette";
import CategoryGrid from "@/components/CategoryGrid";
import ComparisonTable from "@/components/ComparisonTable";
import FAQ from "@/components/FAQ";
import Gallery from "@/components/Gallery";
import LeadForm from "@/components/LeadForm";
import ProductCard from "@/components/ProductCard";
import {
  ArrowRight,
  BoxIcon,
  CameraIcon,
  CheckIcon,
  ClockIcon,
  InstagramGlyph,
  MapPin,
  PaintIcon,
  PhoneIcon,
  ShieldIcon,
  SparkIcon,
  TagIcon,
  TelegramGlyph,
  TruckIcon,
  WhatsAppGlyph,
} from "@/components/Icons";

const heroBadges = [
  { icon: ShieldIcon, label: "Оригинальные детали" },
  { icon: BoxIcon, label: "В наличии" },
  { icon: TruckIcon, label: "Под заказ из Китая" },
  { icon: CameraIcon, label: "Реальные фотографии" },
];

const advantages = [
  {
    icon: ShieldIcon,
    title: "Оригинальные детали",
    text: "Все основные детали — оригинальные OEM, снятые с автомобилей Li Auto.",
  },
  {
    icon: SparkIcon,
    title: "Отличное состояние",
    text: "Детали сняты с автомобилей с небольшими пробегами и проходят визуальную проверку.",
  },
  {
    icon: PaintIcon,
    title: "Установка без покраски",
    text: "Если цвет совпадает, многие кузовные детали можно установить сразу.",
  },
  {
    icon: CameraIcon,
    title: "Реальные фотографии",
    text: "Каждая позиция фотографируется отдельно — вы видите именно свою деталь.",
  },
  {
    icon: TruckIcon,
    title: "В наличии и под заказ",
    text: "Большой ассортимент плюс доставка нужной детали из Китая за 5–10 дней по договору.",
  },
  {
    icon: TagIcon,
    title: "Выгодная цена",
    text: "Стоимость значительно привлекательнее новых оригинальных деталей.",
  },
];

const steps = [
  { n: "01", title: "Выбираете модель", text: "L6, L7 или L9 — переходите в нужный каталог." },
  { n: "02", title: "Находите деталь", text: "Через фильтры, поиск или популярные категории." },
  { n: "03", title: "Отправляете заявку", text: "Через форму или WhatsApp в один клик." },
  { n: "04", title: "Подтверждаем наличие", text: "Присылаем реальные фото и стоимость." },
  { n: "05", title: "Выдача или доставка", text: "Организуем удобный способ получения." },
];

const galleryItems = [
  { label: "Склад деталей", sub: "Li Auto" },
  { label: "Двери разных цветов", sub: "L7 / L9" },
  { label: "Передние бамперы", sub: "L6" },
  { label: "Капоты", sub: "L9" },
  { label: "Крылья", sub: "L7" },
  { label: "Радиаторы", sub: "Cooling" },
  { label: "Зеркала High Config", sub: "L9" },
  { label: "Упаковка и отправка", sub: "Logistics" },
];

const trustFacts = [
  { icon: CameraIcon, title: "Реальные фотографии", text: "Показываем каждую деталь до покупки." },
  { icon: ShieldIcon, title: "Оригинальные детали", text: "OEM с автомобилей Li Auto." },
  { icon: TruckIcon, title: "Наличие и заказ", text: "Есть на складе или привезём из Китая." },
  { icon: SparkIcon, title: "Помощь с подбором", text: "Проверим совместимость по VIN." },
  { icon: CheckIcon, title: "Прозрачное состояние", text: "Честно описываем каждую позицию." },
];

export default function HomePage() {
  const featured = getFeaturedProducts(8);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-graphite-200 bg-white">
        <div className="absolute inset-0 grid-pattern opacity-70" />
        <div className="absolute -right-40 top-10 h-[400px] w-[600px] rounded-full bg-graphite-100/60 blur-3xl" />
        <div className="container-x relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="reveal">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-graphite-200 bg-white px-3.5 py-1.5 text-xs font-medium text-graphite-600 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Оригинальные запчасти Li Auto · L6 · L7 · L9
              </div>
              <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-graphite-900 sm:text-5xl lg:text-6xl">
                Оригинальные запчасти{" "}
                <span className="text-graphite-400">Li Auto</span> L6 · L7 · L9
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-graphite-500 sm:text-lg">
                Оригинальные б/у детали из Китая в отличном состоянии. Большинство
                кузовных элементов практически не отличаются от новых и могут быть
                установлены без покраски при совпадении цвета.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/catalog" icon>
                  Смотреть каталог
                </Button>
                <a
                  href={contacts.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
                >
                  <WhatsAppGlyph width={18} height={18} />
                  Написать в WhatsApp
                </a>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {heroBadges.map((b) => (
                  <div
                    key={b.label}
                    className="flex items-center gap-2.5 rounded-xl border border-graphite-200 bg-white/70 px-3 py-3"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-graphite-100 text-graphite-700">
                      <b.icon width={17} height={17} />
                    </span>
                    <span className="text-xs font-medium leading-tight text-graphite-700">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="reveal relative">
              <div className="relative overflow-hidden rounded-3xl border border-graphite-200 bg-gradient-to-br from-graphite-50 to-graphite-100 p-8 shadow-card">
                <div className="absolute right-5 top-5 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-graphite-500">
                  Li Auto L9
                </div>
                <CarSilhouette className="mt-6 w-full" />
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {models.map((m) => (
                    <Link
                      key={m.slug}
                      href={`/catalog/${m.slug}`}
                      className="rounded-xl bg-white/80 px-3 py-2.5 text-center text-sm font-semibold text-graphite-800 ring-1 ring-graphite-200 transition-colors hover:bg-white"
                    >
                      {m.short}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ВЫБОР МОДЕЛИ ============ */}
      <section className="container-x py-20">
        <SectionHeading
          eyebrow="Выберите модель"
          title="Запчасти по вашей модели Li Auto"
          subtitle="Каждая модель — отдельный каталог с кузовом, оптикой, зеркалами и техническими комплектующими."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {models.map((m, i) => (
            <Link
              key={m.slug}
              href={`/catalog/${m.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-graphite-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div
                className="relative flex items-center justify-center p-8"
                style={{
                  background: `linear-gradient(135deg, ${m.accent}0d, ${m.accent}1a)`,
                }}
              >
                <span className="absolute left-5 top-5 text-5xl font-bold tracking-tight text-graphite-900/10">
                  {m.short}
                </span>
                <CarSilhouette className="w-full max-w-[280px]" color={m.accent} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-graphite-900">{m.name}</h3>
                <p className="mt-1 text-sm text-graphite-500">{m.tagline}</p>
                <p className="mt-1 text-xs text-graphite-400">{m.years}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-graphite-900">
                  Перейти в каталог
                  <ArrowRight
                    width={16}
                    height={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ ПОЧЕМУ ВЫБИРАЮТ НАС ============ */}
      <section className="border-y border-graphite-200 bg-graphite-50">
        <div className="container-x py-20">
          <SectionHeading
            eyebrow="Почему выбирают нас"
            title="Оригинал, состояние и честность"
            subtitle="Мы делаем ставку на прозрачность: реальные фото, честное описание и оригинальные детали."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-graphite-200 bg-white p-6 transition-shadow hover:shadow-card"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-graphite-900 text-white">
                  <a.icon width={22} height={22} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-graphite-900">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite-500">
                  {a.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ КАК МЫ РАБОТАЕМ ============ */}
      <section className="container-x py-20">
        <SectionHeading
          eyebrow="Как мы работаем"
          title="Путь от выбора до установки"
          center
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="rounded-2xl border border-graphite-200 bg-white p-6">
                <span className="text-3xl font-bold tracking-tight text-graphite-200">
                  {s.n}
                </span>
                <h3 className="mt-3 text-base font-semibold text-graphite-900">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-graphite-500">
                  {s.text}
                </p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight
                  width={20}
                  height={20}
                  className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-graphite-300 lg:block"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ============ ПОПУЛЯРНЫЕ КАТЕГОРИИ ============ */}
      <section className="border-y border-graphite-200 bg-graphite-50">
        <div className="container-x py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Категории"
              title="Популярные категории запчастей"
            />
            <Button href="/catalog" variant="secondary" icon>
              Весь каталог
            </Button>
          </div>
          <div className="mt-10">
            <CategoryGrid slugs={popularCategorySlugs} />
          </div>
        </div>
      </section>

      {/* ============ РЕАЛЬНЫЕ ФОТОГРАФИИ ============ */}
      <section className="container-x py-20">
        <SectionHeading
          eyebrow="Реальные фотографии"
          title="Как выглядит наш склад"
          subtitle="Мы показываем детали такими, какие они есть. Нажмите на фото, чтобы увеличить."
        />
        <div className="mt-10">
          <Gallery items={galleryItems} />
        </div>
      </section>

      {/* ============ В НАЛИЧИИ ПРЯМО СЕЙЧАС ============ */}
      <section className="border-y border-graphite-200 bg-graphite-50">
        <div className="container-x py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Наличие" title="В наличии прямо сейчас" />
            <Button href="/catalog" variant="secondary" icon>
              Смотреть всё
            </Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ VIN + ЦВЕТ ============ */}
      <section className="container-x py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-graphite-200 bg-graphite-900 p-8 text-white sm:p-10">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide">
              Проверка по VIN
            </span>
            <h3 className="mt-5 text-2xl font-semibold">Подберём деталь по VIN</h3>
            <p className="mt-3 text-sm leading-relaxed text-graphite-300">
              Отправьте VIN автомобиля, и мы поможем подобрать совместимую деталь под
              вашу комплектацию.
            </p>
            <div className="mt-6">
              <LeadForm
                fields={["vin", "phone", "comment"]}
                submitLabel="Проверить по VIN"
                source="Проверка по VIN"
                compact
              />
            </div>
          </div>

          <div className="flex flex-col rounded-3xl border border-graphite-200 bg-white p-8 sm:p-10">
            <span className="inline-flex w-fit rounded-full bg-graphite-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-graphite-600">
              Проверка цвета
            </span>
            <h3 className="mt-5 text-2xl font-semibold text-graphite-900">
              Поможем попасть в цвет
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-graphite-500">
              Отправьте фото автомобиля или код цвета — подберём кузовную деталь
              максимально близкую по оттенку. При совпадении — установка без покраски.
            </p>
            <div className="mt-6 flex flex-1 flex-col justify-end">
              <LeadForm
                fields={["model", "color", "phone"]}
                submitLabel="Подобрать по цвету"
                source="Проверка цвета"
                compact
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA: НЕ НАШЛИ ДЕТАЛЬ ============ */}
      <section className="border-y border-graphite-200 bg-graphite-50">
        <div className="container-x py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="Под заказ"
                title="Не нашли нужную запчасть?"
                subtitle="Мы привозим оригинальные запчасти Li Auto из Китая под заказ. Отправьте нам название детали или VIN автомобиля — найдём и доставим."
              />
              <ul className="mt-6 space-y-3">
                {[
                  "Доставка из Китая за 5–10 дней по договору",
                  "Проверка совместимости перед заказом",
                  "Реальные фото детали до оплаты",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-graphite-600">
                    <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-emerald-600" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <LeadForm
              fields={["name", "phone", "model", "vin", "part"]}
              title="Оставить заявку на подбор"
              submitLabel="Оставить заявку"
              source="Заявка на подбор детали"
            />
          </div>
        </div>
      </section>

      {/* ============ ПОЧЕМУ ОРИГИНАЛ ВЫГОДНЕЕ ============ */}
      <section className="container-x py-20">
        <SectionHeading
          eyebrow="Сравнение"
          title="Почему оригинал выгоднее"
          subtitle="Нейтральное сравнение вариантов, чтобы вы могли принять взвешенное решение."
        />
        <div className="mt-10">
          <ComparisonTable />
        </div>
      </section>

      {/* ============ ПОЧЕМУ НАМ ДОВЕРЯЮТ ============ */}
      <section className="border-y border-graphite-200 bg-graphite-900">
        <div className="container-x py-20">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-graphite-400">
              <span className="h-px w-6 bg-graphite-600" />
              Почему нам доверяют
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Факты вместо громких обещаний
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {trustFacts.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                  <f.icon width={20} height={20} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm text-graphite-400">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="container-x py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Вопросы и ответы"
            title="Частые вопросы"
            subtitle="Не нашли ответ? Напишите нам в WhatsApp — подскажем по вашей ситуации."
          />
          <FAQ items={faqs} />
        </div>
      </section>

      {/* ============ КОНТАКТЫ ============ */}
      <HomeContacts />
    </>
  );
}

function HomeContacts() {
  const rows = [
    { icon: PhoneIcon, label: "Телефон", value: contacts.phone, href: contacts.phoneHref },
    { icon: WhatsAppGlyph, label: "WhatsApp", value: contacts.whatsapp, href: contacts.whatsappHref },
    { icon: TelegramGlyph, label: "Telegram", value: contacts.telegram, href: contacts.telegramHref },
    { icon: InstagramGlyph, label: "Instagram", value: contacts.instagram, href: contacts.instagramHref },
    { icon: MapPin, label: "Адрес", value: contacts.address },
    { icon: ClockIcon, label: "График работы", value: contacts.hours },
  ];
  return (
    <section id="contacts" className="border-t border-graphite-200 bg-graphite-50">
      <div className="container-x py-20">
        <SectionHeading eyebrow="Контакты" title="Свяжитесь с нами" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="grid gap-3 sm:grid-cols-2">
            {rows.map((r) => {
              const inner = (
                <div className="flex items-start gap-3 rounded-2xl border border-graphite-200 bg-white p-5 transition-colors hover:border-graphite-300">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-graphite-100 text-graphite-700">
                    <r.icon width={19} height={19} />
                  </span>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-graphite-400">
                      {r.label}
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-graphite-900">
                      {r.value}
                    </div>
                  </div>
                </div>
              );
              return r.href ? (
                <a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={r.label}>{inner}</div>
              );
            })}
          </div>
          <div className="overflow-hidden rounded-2xl border border-graphite-200 bg-white">
            <div className="relative flex h-full min-h-[300px] items-center justify-center bg-graphite-100">
              <div className="absolute inset-0 grid-pattern opacity-60" />
              <div className="relative text-center">
                <MapPin width={32} height={32} className="mx-auto text-graphite-400" />
                <p className="mt-3 text-sm font-medium text-graphite-600">
                  Карта появится здесь
                </p>
                <p className="mt-1 text-xs text-graphite-400">{contacts.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
