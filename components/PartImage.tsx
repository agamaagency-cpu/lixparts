import { CameraIcon } from "./Icons";

/**
 * Премиальный плейсхолдер изображения детали.
 * Заменяется на реальные фото простой подстановкой <img src=... />.
 * Пока даёт аккуратный «студийный» фон, чтобы каталог не выглядел пустым.
 */
export default function PartImage({
  label,
  sub,
  tone = 0,
  className = "",
  ratio = "aspect-[4/3]",
  big = false,
}: {
  label: string;
  sub?: string;
  tone?: number;
  className?: string;
  ratio?: string;
  big?: boolean;
}) {
  const tones = [
    "from-graphite-100 to-graphite-200",
    "from-graphite-50 to-graphite-100",
    "from-slate-100 to-slate-200",
    "from-zinc-100 to-graphite-100",
  ];
  const g = tones[Math.abs(tone) % tones.length];

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${g} ${ratio} ${className}`}
    >
      {/* мягкая «студийная» подсветка */}
      <div className="absolute inset-0">
        <div className="absolute -left-1/4 -top-1/3 h-[130%] w-[70%] rotate-12 bg-white/50 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-black/5 to-transparent" />
      </div>
      {/* контурный силуэт детали */}
      <svg
        className="absolute inset-0 h-full w-full text-graphite-400/40"
        viewBox="0 0 200 150"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect
          x="28"
          y="34"
          width="144"
          height="82"
          rx="14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <span className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-graphite-500 shadow-sm">
          <CameraIcon width={18} height={18} />
        </span>
        <span
          className={`font-medium text-graphite-600 ${big ? "text-base" : "text-sm"}`}
        >
          {label}
        </span>
        {sub && (
          <span className="mt-0.5 text-[11px] uppercase tracking-wider text-graphite-400">
            {sub}
          </span>
        )}
        <span className="mt-2 text-[10px] uppercase tracking-widest text-graphite-400/80">
          Реальное фото по запросу
        </span>
      </div>
    </div>
  );
}
