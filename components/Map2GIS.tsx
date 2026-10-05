import { contacts } from "@/lib/data";

/** Карта 2ГИС с карточкой RS Auto Parts (официальный виджет firmsonmap, без скриптов). */
export default function Map2GIS({ height = 360 }: { height?: number }) {
  const options = {
    pos: { lat: contacts.geo.lat, lon: contacts.geo.lon, zoom: 16 },
    opt: { city: "almaty" },
    org: contacts.twoGisFirmId,
  };
  const src = `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(
    JSON.stringify(options)
  )}`;
  return (
    <div className="overflow-hidden rounded-2xl border border-graphite-200 bg-graphite-100">
      <iframe
        src={src}
        title={`RS Auto Parts на карте 2ГИС — ${contacts.address}`}
        width="100%"
        height={height}
        loading="lazy"
        className="block w-full border-0"
        style={{ height }}
      />
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-graphite-200 bg-white px-4 py-3 text-sm">
        <span className="text-graphite-600">{contacts.address}</span>
        <a
          href={contacts.twoGisHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-graphite-900 underline hover:text-graphite-700"
        >
          Открыть в 2ГИС →
        </a>
      </div>
    </div>
  );
}
