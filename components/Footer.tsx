import Link from "next/link";
import { brand, contacts, models } from "@/lib/data";
import {
  InstagramGlyph,
  MapPin,
  PhoneIcon,
  TelegramGlyph,
  WhatsAppGlyph,
} from "./Icons";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="mt-24 border-t border-graphite-200 bg-graphite-50">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-graphite-900 text-sm font-bold text-white">
                LX
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-graphite-900">
                {brand.name}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-graphite-500">
              Оригинальные б/у кузовные и технические запчасти Li Auto L6, L7 и L9.
              В наличии и под заказ из Китая. Помощь с подбором.
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={contacts.whatsappHref}
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-graphite-600 ring-1 ring-graphite-200 hover:text-graphite-900"
              >
                <WhatsAppGlyph width={18} height={18} />
              </a>
              <a
                href={contacts.telegramHref}
                aria-label="Telegram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-graphite-600 ring-1 ring-graphite-200 hover:text-graphite-900"
              >
                <TelegramGlyph width={18} height={18} />
              </a>
              <a
                href={contacts.instagramHref}
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-graphite-600 ring-1 ring-graphite-200 hover:text-graphite-900"
              >
                <InstagramGlyph width={18} height={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-graphite-900">Каталог</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-graphite-500">
              <li>
                <Link href="/catalog" className="hover:text-graphite-900">
                  Весь каталог
                </Link>
              </li>
              {models.map((m) => (
                <li key={m.slug}>
                  <Link href={`/catalog/${m.slug}`} className="hover:text-graphite-900">
                    Запчасти {m.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/nosecut" className="hover:text-graphite-900">
                  Ноускаты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-graphite-900">Компания</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-graphite-500">
              <li><Link href="/about" className="hover:text-graphite-900">О компании</Link></li>
              <li><Link href="/partners" className="hover:text-graphite-900">Для СТО и мастеров</Link></li>
              <li><Link href="/delivery" className="hover:text-graphite-900">Доставка и оплата</Link></li>
              <li><Link href="/contacts" className="hover:text-graphite-900">Контакты</Link></li>
              <li><Link href="/privacy" className="hover:text-graphite-900">Политика конфиденциальности</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-graphite-900">Контакты</h3>
            <ul className="mt-4 space-y-3 text-sm text-graphite-500">
              <li className="flex items-start gap-2.5">
                <PhoneIcon width={17} height={17} className="mt-0.5 shrink-0 text-graphite-400" />
                <a href={contacts.phoneHref} className="hover:text-graphite-900">{contacts.phone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin width={17} height={17} className="mt-0.5 shrink-0 text-graphite-400" />
                <span>{contacts.address}</span>
              </li>
              <li className="text-graphite-400">{contacts.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-graphite-200 pt-6 text-xs text-graphite-400 sm:flex-row sm:items-center">
          <p>© {year} {brand.name}. Все права защищены.</p>
          <p className="max-w-xl">
            Li Auto и Lixiang — торговые марки соответствующих правообладателей. Сайт
            не является официальным дилером. Продаются оригинальные б/у детали.
          </p>
        </div>
      </div>
    </footer>
  );
}
