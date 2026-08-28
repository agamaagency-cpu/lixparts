import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button, SectionHeading } from "@/components/ui";
import { BoxIcon, TruckIcon, TagIcon, CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Доставка и оплата",
  description:
    "Условия доставки и оплаты запчастей Li Auto: выдача на месте, доставка по России, детали под заказ из Китая за 5–10 дней. Оплата удобным способом.",
  alternates: { canonical: "/delivery" },
};

const delivery = [
  { icon: BoxIcon, title: "Самовывоз", text: "Заберите деталь на месте после подтверждения наличия." },
  { icon: TruckIcon, title: "Доставка по России", text: "Отправляем транспортными компаниями в ваш город." },
  { icon: TruckIcon, title: "Под заказ из Китая", text: "Привезём нужную деталь за 5–10 дней по договору." },
];

const payment = [
  "Наличными при получении или самовывозе",
  "Безналичный перевод для физлиц",
  "Оплата по счёту для организаций и СТО",
  "Предоплата для деталей под заказ (по договору)",
];

export default function DeliveryPage() {
  return (
    <div className="container-x py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Доставка и оплата" }]} />
      <div className="mt-6">
        <SectionHeading
          title="Доставка и оплата"
          subtitle="Организуем удобный способ получения детали и оплаты. Все детали проходят проверку и фотографируются перед отправкой."
        />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {delivery.map((d) => (
          <div key={d.title} className="rounded-2xl border border-graphite-200 bg-white p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-graphite-900 text-white">
              <d.icon width={22} height={22} />
            </span>
            <h3 className="mt-5 text-base font-semibold text-graphite-900">{d.title}</h3>
            <p className="mt-2 text-sm text-graphite-500">{d.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-graphite-200 bg-graphite-50 p-8">
          <div className="flex items-center gap-3">
            <TagIcon width={22} height={22} className="text-graphite-700" />
            <h2 className="text-lg font-semibold text-graphite-900">Способы оплаты</h2>
          </div>
          <ul className="mt-5 space-y-3">
            {payment.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-graphite-600">
                <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-emerald-600" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-graphite-200 bg-white p-8">
          <h2 className="text-lg font-semibold text-graphite-900">Как оформить заказ</h2>
          <ol className="mt-5 space-y-4">
            {[
              "Выберите деталь в каталоге или отправьте название/VIN.",
              "Мы подтверждаем наличие и присылаем реальные фото.",
              "Согласовываем стоимость и способ получения.",
              "Оплата и отправка или выдача на месте.",
            ].map((t, i) => (
              <li key={t} className="flex gap-3 text-sm text-graphite-600">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-graphite-900 text-xs font-semibold text-white">
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Button href="/catalog" icon>Перейти в каталог</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
