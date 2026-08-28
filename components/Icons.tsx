import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export const ChevronDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const WhatsAppGlyph = (p: IconProps) => (
  <svg {...base({ ...p, strokeWidth: 0, fill: "currentColor" })}>
    <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.6-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.3 4.7 2 .8 2.7.9 3.7.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3Z" />
    <path
      d="M12 3.5A8.5 8.5 0 0 0 4.6 16.3L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    />
  </svg>
);

export const TelegramGlyph = (p: IconProps) => (
  <svg {...base({ ...p, strokeWidth: 0, fill: "currentColor" })}>
    <path d="M21.9 4.5 2.8 11.9c-1 .4-1 1.8.1 2.1l4.8 1.5 1.8 5.6c.2.7 1.1.9 1.6.3l2.6-2.6 4.8 3.5c.7.5 1.6.1 1.8-.7l3.2-15.3c.2-1-.8-1.8-1.6-1.3ZM9.9 14.3l8.3-5.2c.2-.1.4.2.2.4l-6.6 6.1c-.2.2-.3.5-.4.8l-.2 1.7-1.3-3.8Z" />
  </svg>
);

export const InstagramGlyph = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6.6 3.5H4.2c-.7 0-1.3.6-1.2 1.4A16.5 16.5 0 0 0 19.1 21c.8 0 1.4-.5 1.4-1.2v-2.4c0-.6-.4-1-1-1.2l-2.6-.6c-.5-.1-1 0-1.3.4l-1 1c-2.4-1.2-4.3-3.1-5.5-5.5l1-1c.4-.3.5-.8.4-1.3l-.6-2.6c-.2-.6-.6-1-1.3-1Z" />
  </svg>
);

export const MapPin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const HeartIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 20s-7-4.4-9.2-8.4C1 8.3 2.6 5 5.9 5c2 0 3.2 1.2 4.1 2.4C10.9 6.2 12.1 5 14.1 5c3.3 0 4.9 3.3 3.1 6.6C19 15.6 12 20 12 20Z" />
  </svg>
);

export const CompareIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h11M4 7l3-3M4 7l3 3M20 17H9M20 17l-3-3M20 17l-3 3" />
  </svg>
);

export const VideoIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="6" width="12" height="12" rx="2" />
    <path d="m15 10 6-3v10l-6-3" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const FilterIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3 5 6v5c0 4.4 3 8 7 10 4-2 7-5.6 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const SparkIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
  </svg>
);

export const CameraIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
    <circle cx="12" cy="13" r="3.2" />
  </svg>
);

export const BoxIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 8l9-4 9 4v8l-9 4-9-4V8Z" />
    <path d="M3 8l9 4 9-4M12 12v8" />
  </svg>
);

export const TruckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
    <circle cx="7" cy="17" r="1.6" />
    <circle cx="17" cy="17" r="1.6" />
  </svg>
);

export const TagIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 12V4h8l9 9-8 8-9-9Z" />
    <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" />
  </svg>
);

export const PaintIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="12" height="10" rx="2" />
    <path d="M16 8h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2v3a2 2 0 0 1-4 0v-3" />
  </svg>
);

export const ListIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
);

/* Универсальный переключатель по ключу иконки категории */
export function CategoryGlyph({ name, ...rest }: { name: string } & IconProps) {
  const map: Record<string, (p: IconProps) => JSX.Element> = {
    bumper: BoxIcon,
    hood: BoxIcon,
    fender: BoxIcon,
    door: BoxIcon,
    trim: ListIcon,
    light: SparkIcon,
    mirror: SearchIcon,
    liner: BoxIcon,
    radiator: ListIcon,
    fan: SparkIcon,
    beam: ListIcon,
    frame: BoxIcon,
    bracket: ListIcon,
    handle: TagIcon,
    plastic: BoxIcon,
    wiring: ListIcon,
    nosecut: TruckIcon,
  };
  const C = map[name] ?? BoxIcon;
  return <C {...rest} />;
}
