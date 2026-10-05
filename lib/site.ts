// Единая точка правды по домену.
// На проде задаётся переменной окружения NEXT_PUBLIC_SITE_URL (в настройках Cloudflare Pages),
// по умолчанию — боевой домен rsautoparts.kz.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rsautoparts.kz"
).replace(/\/$/, "");
