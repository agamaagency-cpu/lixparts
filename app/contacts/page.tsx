import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import Map2GIS from "@/components/Map2GIS";
import { SectionHeading } from "@/components/ui";
import { contacts } from "@/lib/data";
import {
  ClockIcon,
  MailIcon,
  InstagramGlyph,
  MapPin,
  PhoneIcon,
  WhatsAppGlyph,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "RS Auto Parts в Алматы: Биокомбинатская, 7А. Телефон и WhatsApp +7 747 411 69 02, почта, график работы и карта 2ГИС. Поможем подобрать запчасти Li Auto L6, L7, L9.",
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  const rows = [
    { icon: PhoneIcon, label: "Телефон", value: contacts.phone, href: contacts.phoneHref },
    { icon: WhatsAppGlyph, label: "WhatsApp", value: contacts.whatsapp, href: contacts.whatsappHref },
    { icon: InstagramGlyph, label: "Instagram", value: contacts.instagram, href: contacts.instagramHref },
    { icon: MailIcon, label: "Почта", value: contacts.email, href: contacts.emailHref },
    { icon: MapPin, label: "Адрес", value: contacts.address, href: contacts.twoGisHref },
    { icon: ClockIcon, label: "График работы", value: contacts.hours },
  ];

  return (
    <div className="container-x py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Контакты" }]} />
      <div className="mt-6">
        <SectionHeading
          title="Контакты"
          subtitle="Напишите или позвоните — поможем с подбором, проверим совместимость и подскажем по наличию."
        />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            {rows.map((r) => {
              const inner = (
                <div className="flex h-full items-start gap-3 rounded-2xl border border-graphite-200 bg-white p-5 transition-colors hover:border-graphite-300">
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

          <div className="mt-4">
            <Map2GIS />
          </div>
        </div>

        <LeadForm
          fields={["name", "phone", "model", "part", "comment"]}
          title="Оставить заявку"
          submitLabel="Отправить"
          source="Форма на странице контактов"
        />
      </div>
    </div>
  );
}
