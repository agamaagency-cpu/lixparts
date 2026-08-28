"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { brand, contacts } from "@/lib/data";
import { useStore } from "./StoreProvider";
import {
  CloseIcon,
  CompareIcon,
  HeartIcon,
  PhoneIcon,
  WhatsAppGlyph,
} from "./Icons";

const nav = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/catalog/l6", label: "L6" },
  { href: "/catalog/l7", label: "L7" },
  { href: "/catalog/l9", label: "L9" },
  { href: "/nosecut", label: "Ноускаты" },
  { href: "/partners", label: "Для СТО" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { favorites, compare } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-graphite-200 bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-white"
      }`}
    >
      <div className="container-x">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Лого */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-graphite-900 text-sm font-bold text-white">
              LX
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-tight text-graphite-900">
                {brand.name}
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-graphite-400">
                Li Auto Parts
              </span>
            </span>
          </Link>

          {/* Десктоп-навигация */}
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-graphite-100 text-graphite-900"
                    : "text-graphite-600 hover:text-graphite-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Действия */}
          <div className="flex items-center gap-1.5">
            <Link
              href="/favorites"
              aria-label="Избранное"
              className="relative hidden h-9 w-9 items-center justify-center rounded-full text-graphite-600 hover:bg-graphite-100 sm:flex"
            >
              <HeartIcon width={19} height={19} />
              {favorites.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-graphite-900 px-1 text-[10px] font-semibold text-white">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link
              href="/compare"
              aria-label="Сравнение"
              className="relative hidden h-9 w-9 items-center justify-center rounded-full text-graphite-600 hover:bg-graphite-100 sm:flex"
            >
              <CompareIcon width={19} height={19} />
              {compare.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-graphite-900 px-1 text-[10px] font-semibold text-white">
                  {compare.length}
                </span>
              )}
            </Link>
            <a
              href={contacts.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 hidden items-center gap-2 rounded-full bg-graphite-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-graphite-800 md:inline-flex"
            >
              <WhatsAppGlyph width={16} height={16} />
              WhatsApp
            </a>

            {/* Бургер */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Меню"
              className="flex h-9 w-9 items-center justify-center rounded-full text-graphite-700 hover:bg-graphite-100 lg:hidden"
            >
              {open ? (
                <CloseIcon width={22} height={22} />
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {open && (
        <div className="lg:hidden">
          <div className="container-x border-t border-graphite-200 py-4">
            <nav className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-3 text-base font-medium ${
                    isActive(item.href)
                      ? "bg-graphite-100 text-graphite-900"
                      : "text-graphite-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href="/favorites"
                className="flex items-center justify-center gap-2 rounded-full bg-graphite-100 px-4 py-3 text-sm font-medium text-graphite-800"
              >
                <HeartIcon width={16} height={16} /> Избранное ({favorites.length})
              </Link>
              <Link
                href="/compare"
                className="flex items-center justify-center gap-2 rounded-full bg-graphite-100 px-4 py-3 text-sm font-medium text-graphite-800"
              >
                <CompareIcon width={16} height={16} /> Сравнить ({compare.length})
              </Link>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href={contacts.whatsappHref}
                className="flex items-center justify-center gap-2 rounded-full bg-graphite-900 px-4 py-3 text-sm font-medium text-white"
              >
                <WhatsAppGlyph width={16} height={16} /> WhatsApp
              </a>
              <a
                href={contacts.phoneHref}
                className="flex items-center justify-center gap-2 rounded-full ring-1 ring-inset ring-graphite-300 px-4 py-3 text-sm font-medium text-graphite-800"
              >
                <PhoneIcon width={16} height={16} /> Позвонить
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
