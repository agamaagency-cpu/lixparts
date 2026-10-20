import { banners } from "@/lib/banners";

/**
 * Слот под баннер дизайнера. Нет файла — показывает fallback (реальное фото детали).
 * ratio задаёт пропорции слота, чтобы вёрстка не прыгала при загрузке.
 */
export default function Banner({
  slot,
  fallback,
  ratio,
  className = "",
  eager = false,
}: {
  slot: string;
  fallback?: string;
  ratio: string;
  className?: string;
  eager?: boolean;
}) {
  const b = banners[slot];
  const src = b?.src ?? fallback;
  if (!src) return <div className={`${ratio} bg-graphite-100 ${className}`} />;
  return (
    <div className={`relative overflow-hidden bg-graphite-100 ${ratio} ${className}`} data-banner={slot}>
      <picture>
        {b?.src && b.srcMobile && <source media="(max-width: 640px)" srcSet={b.srcMobile} />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={b?.alt ?? ""}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      {b?.src && b.credit && (
        <span className="pointer-events-none absolute bottom-1.5 right-2 rounded bg-black/35 px-1.5 py-0.5 text-[10px] leading-none text-white/85">
          {b.credit}
        </span>
      )}
    </div>
  );
}
