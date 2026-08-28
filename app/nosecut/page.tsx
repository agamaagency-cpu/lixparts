import type { Metadata } from "next";
import { models, products } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import NosecutConfigurator from "@/components/NosecutConfigurator";
import ProductCard from "@/components/ProductCard";
import LeadForm from "@/components/LeadForm";
import { SectionHeading } from "@/components/ui";
import PartImage from "@/components/PartImage";

export const metadata: Metadata = {
  title: "Ноускаты (Nosecut) Li Auto L6, L7, L9",
  description:
    "Ноускаты Li Auto — передняя часть в сборе: бампер, капот, крылья, оптика, радиаторы, усилители. Конструктор комплектаций с указанием состава. В наличии и под заказ.",
  alternates: { canonical: "/nosecut" },
};

export default function NosecutPage() {
  const nosecuts = products.filter((p) => p.categorySlug === "nosecut");

  return (
    <div>
      <section className="border-b border-graphite-200 bg-graphite-900 text-white">
        <div className="container-x py-12 sm:py-16">
          <Breadcrumbs
            items={[{ label: "Главная", href: "/" }, { label: "Ноускаты" }]}
          />
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                Nosecut · передняя часть в сборе
              </span>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Ноускаты Li Auto
              </h1>
              <p className="mt-3 max-w-xl text-graphite-300">
                Ноускат — это передняя часть автомобиля в сборе: бампер, капот, крылья,
                оптика, система охлаждения и усилители. Ниже — конструктор, где галочками
                видно, какие детали входят в конкретный комплект.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <PartImage label="Nosecut в сборе" sub="Li Auto" ratio="aspect-[4/3]" big />
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <SectionHeading
          eyebrow="Конструктор комплектаций"
          title="Что входит в ноускат"
          subtitle="Выберите тип комплектации — состав отметится галочками. Это типовой ориентир: фактический набор зависит от поступления."
        />
        <div className="mt-10">
          <NosecutConfigurator />
        </div>
      </section>

      {nosecuts.length > 0 && (
        <section className="border-y border-graphite-200 bg-graphite-50">
          <div className="container-x py-16">
            <SectionHeading eyebrow="В наличии и под заказ" title="Ноускаты по моделям" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {nosecuts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-x py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Заявка"
            title="Уточнить состав и цену ноуската"
            subtitle="Оставьте заявку — пришлём реальные фотографии конкретного ноуската и точный состав по вашей модели."
          />
          <LeadForm
            fields={["name", "phone", "model", "vin", "comment"]}
            title="Запрос по ноускату"
            submitLabel="Отправить запрос"
            source="Запрос по ноускату"
          />
        </div>
      </section>
    </div>
  );
}
