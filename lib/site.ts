// Единая точка правды по домену.
// На проде задаётся переменной окружения NEXT_PUBLIC_SITE_URL (в настройках Cloudflare Pages),
// локально и до покупки домена используется значение по умолчанию.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lixparts.pages.dev"
).replace(/\/$/, "");
