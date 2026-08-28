/** Стилизованный силуэт SUV Li Auto для hero и баннеров моделей. */
export default function CarSilhouette({
  className = "",
  color = "#23262b",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.95" />
          <stop offset="1" stopColor={color} stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9edf1" />
          <stop offset="1" stopColor="#c3ccd4" />
        </linearGradient>
      </defs>

      {/* тень */}
      <ellipse cx="320" cy="228" rx="270" ry="16" fill={color} opacity="0.10" />

      {/* кузов SUV */}
      <path
        d="M70 190 C64 150 92 128 132 120 L176 82 C190 66 210 58 236 56 L392 56 C424 56 452 66 476 90 L520 122 C556 128 584 146 586 186 C587 205 578 210 560 210 L96 210 C78 210 71 204 70 190 Z"
        fill="url(#body)"
      />
      {/* стекло */}
      <path
        d="M196 92 C206 78 220 72 238 71 L388 71 C412 71 434 79 452 96 L470 116 L206 116 Z"
        fill="url(#glass)"
        opacity="0.9"
      />
      <path d="M320 71 L320 116" stroke={color} strokeWidth="3" opacity="0.5" />
      {/* нижняя светодиодная полоса */}
      <rect x="96" y="150" width="470" height="6" rx="3" fill="#dfe4e9" opacity="0.5" />

      {/* колёса */}
      <g>
        <circle cx="170" cy="205" r="42" fill="#141619" />
        <circle cx="170" cy="205" r="20" fill="#3a3f46" />
        <circle cx="170" cy="205" r="8" fill="#7d838a" />
      </g>
      <g>
        <circle cx="470" cy="205" r="42" fill="#141619" />
        <circle cx="470" cy="205" r="20" fill="#3a3f46" />
        <circle cx="470" cy="205" r="8" fill="#7d838a" />
      </g>

      {/* фары */}
      <rect x="560" y="150" width="26" height="10" rx="5" fill="#eef2f6" />
      <rect x="74" y="152" width="20" height="8" rx="4" fill="#f4b942" opacity="0.85" />
    </svg>
  );
}
