import Link from "next/link";
import type { ReactNode } from "react";
import { statusLabels } from "@/lib/data";
import type { ProductStatus } from "@/lib/types";
import { ArrowRight } from "./Icons";

/* Кнопки ------------------------------------------------------------ */

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  className?: string;
  full?: boolean;
  icon?: boolean;
  target?: string;
  rel?: string;
};

const buttonStyles: Record<string, string> = {
  primary:
    "bg-graphite-900 text-white hover:bg-graphite-800 focus-visible:ring-graphite-900",
  dark: "bg-white text-graphite-900 hover:bg-graphite-100 focus-visible:ring-white",
  secondary:
    "bg-white text-graphite-900 ring-1 ring-inset ring-graphite-300 hover:bg-graphite-50 focus-visible:ring-graphite-400",
  ghost:
    "bg-transparent text-graphite-700 hover:text-graphite-900 hover:bg-graphite-100",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  full,
  icon,
  target,
  rel,
}: ButtonProps) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
    buttonStyles[variant]
  } ${full ? "w-full" : ""} ${className}`;
  const content = (
    <>
      {children}
      {icon && (
        <ArrowRight
          width={16}
          height={16}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );
  if (href) {
    const external = href.startsWith("http") || href.startsWith("tel");
    if (external) {
      return (
        <a href={href} className={cls} target={target} rel={rel}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return <button className={cls}>{content}</button>;
}

/* Заголовок секции -------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && (
        <div
          className={`mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-graphite-400 ${
            center ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-6 bg-graphite-300" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-graphite-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-graphite-500">{subtitle}</p>
      )}
    </div>
  );
}

/* Статус товара ----------------------------------------------------- */

export function StatusBadge({ status }: { status: ProductStatus }) {
  const map: Record<ProductStatus, string> = {
    in_stock: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    on_order: "bg-amber-50 text-amber-700 ring-amber-600/20",
    sold: "bg-graphite-100 text-graphite-500 ring-graphite-500/20",
  };
  const dot: Record<ProductStatus, string> = {
    in_stock: "bg-emerald-500",
    on_order: "bg-amber-500",
    sold: "bg-graphite-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${map[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status]}`} />
      {statusLabels[status]}
    </span>
  );
}

/* Пилюля-тег -------------------------------------------------------- */

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-graphite-100 px-2.5 py-1 text-xs font-medium text-graphite-600">
      {children}
    </span>
  );
}

/* Цена -------------------------------------------------------------- */

export function formatPrice(price: number | null): string {
  if (price === null) return "Цена по запросу";
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
}
