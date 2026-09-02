#!/usr/bin/env node
/**
 * Синхронизация каталога с Google-таблицей «Склад LIXPARTS».
 *
 * Берёт лист «Витрина», опубликованный как CSV, и пишет lib/products.generated.json.
 * Ссылка: Файл → Поделиться → Опубликовать в интернете → лист «Витрина» → CSV.
 * Кладётся в scripts/sheet-url.txt или в переменную окружения SHEET_CSV_URL.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const url =
  process.env.SHEET_CSV_URL ||
  (existsSync(join(root, "scripts/sheet-url.txt"))
    ? readFileSync(join(root, "scripts/sheet-url.txt"), "utf8").trim()
    : "");

if (!url) {
  console.error(
    "\n  Нет ссылки на таблицу.\n" +
      "  Открой таблицу → Файл → Поделиться → Опубликовать в интернете →\n" +
      "  выбери лист «Витрина» и формат «Значения, разделённые запятыми (.csv)» →\n" +
      "  скопируй ссылку и вставь её в файл scripts/sheet-url.txt\n"
  );
  process.exit(1);
}

/* ------------------------------------------------------------------ CSV */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; } else quoted = false;
      } else cell += c;
      continue;
    }
    if (c === '"') { quoted = true; continue; }
    if (c === ",") { row.push(cell); cell = ""; continue; }
    if (c === "\r") continue;
    if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; continue; }
    cell += c;
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

/* --------------------------------------------------------------- словари */
const MODEL = { "li auto l6": "l6", "li auto l7": "l7", "li auto l9": "l9", l6: "l6", l7: "l7", l9: "l9" };
const STATUS = { "в наличии": "in_stock", "под заказ": "on_order", "продано": "sold" };
const SIDE = { "перед": "front", "зад": "rear", "лево": "left", "право": "right", "—": "none", "-": "none", "": "none" };
const YES = new Set(["да", "yes", "true", "1", "+"]);

const norm = (s) => String(s ?? "").trim();
const low = (s) => norm(s).toLowerCase();
const isYes = (s) => YES.has(low(s));
const num = (s) => {
  const v = norm(s).replace(/[^\d.,-]/g, "").replace(/\s/g, "").replace(",", ".");
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : null;
};

/* ------------------------------------------------------------------ main */
let csv;
if (/^https?:\/\//.test(url)) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    console.error(`  Не удалось скачать таблицу: HTTP ${res.status}. Проверь, что лист опубликован.`);
    process.exit(1);
  }
  csv = await res.text();
} else {
  // локальный CSV — удобно для отладки
  csv = readFileSync(url, "utf8");
}
const rows = parseCsv(csv);

// шапка — строка, в которой встречается «SKU»
const headIdx = rows.findIndex((r) => r.some((c) => low(c) === "sku"));
if (headIdx === -1) {
  console.error("  В таблице не найдена строка заголовков с колонкой SKU.");
  process.exit(1);
}
const head = rows[headIdx].map((c) => low(c));
const col = (name) => head.findIndex((h) => h.startsWith(low(name)));

const idx = {
  publish: col("публиковать"),
  sku: col("sku"),
  name: col("название"),
  model: col("модель"),
  categorySlug: col("category_slug"),
  condition: col("состояние"),
  color: col("цвет"),
  hex: col("hex"),
  price: col("цена"),
  status: col("статус"),
  side: col("сторона"),
  location: col("расположение"),
  manufacturer: col("производитель"),
  paintReady: col("без покраски"),
  description: col("описание"),
  images: col("фото"),
  featured: col("на главную"),
};

const valid = new Set(
  readFileSync(join(root, "lib/data.ts"), "utf8")
    .split("\n")
    .filter((l) => l.includes("slug:") && l.includes("group:"))
    .map((l) => l.match(/slug:\s*"([^"]+)"/)?.[1])
    .filter(Boolean)
);

const products = [];
const warnings = [];
const usedSlugs = new Map();

for (let r = headIdx + 1; r < rows.length; r++) {
  const row = rows[r];
  const at = (i) => (i >= 0 ? norm(row[i]) : "");
  const sku = at(idx.sku);
  if (!sku) continue;
  if (!isYes(at(idx.publish))) continue;

  const line = r + 1;
  const model = MODEL[low(at(idx.model))];
  const categorySlug = at(idx.categorySlug);
  if (!model) { warnings.push(`строка ${line} (${sku}): непонятная модель «${at(idx.model)}» — пропущена`); continue; }
  if (!valid.has(categorySlug)) { warnings.push(`строка ${line} (${sku}): категория «${at(idx.categorySlug) || "—"}» не найдена в каталоге — пропущена`); continue; }

  let slug = `${model}-${categorySlug}`;
  const seen = (usedSlugs.get(slug) ?? 0) + 1;
  usedSlugs.set(slug, seen);
  if (seen > 1) slug = `${slug}-${seen}`;

  const images = at(idx.images).split(/[,\s]+/).map((s) => s.trim()).filter((s) => /^https?:\/\//.test(s));

  const name = at(idx.name) || sku;
  const condition = at(idx.condition) || "Отличное";
  const paintReady = isYes(at(idx.paintReady));
  const modelName = { l6: "Li Auto L6", l7: "Li Auto L7", l9: "Li Auto L9" }[model];
  const description =
    at(idx.description) ||
    `${name} для ${modelName}. Оригинальная деталь OEM. Состояние — ${condition.toLowerCase()}` +
      (paintReady ? "; при совпадении цвета ставится без покраски." : ".");

  products.push({
    id: sku,
    slug,
    name,
    categorySlug,
    model,
    condition,
    color: at(idx.color),
    colorHex: at(idx.hex) || undefined,
    sku,
    price: num(at(idx.price)),
    status: STATUS[low(at(idx.status))] ?? "in_stock",
    side: SIDE[low(at(idx.side))] ?? "none",
    location: at(idx.location),
    manufacturer: at(idx.manufacturer) || "Li Auto (оригинал)",
    paintReady: paintReady || undefined,
    description,
    featured: isYes(at(idx.featured)) || undefined,
    images: images.length ? images : undefined,
  });
}

writeFileSync(join(root, "lib/products.generated.json"), JSON.stringify(products, null, 2) + "\n", "utf8");

console.log(`\n  Выгружено позиций: ${products.length}`);
const byStatus = products.reduce((a, p) => ((a[p.status] = (a[p.status] ?? 0) + 1), a), {});
console.log(`  В наличии: ${byStatus.in_stock ?? 0} · под заказ: ${byStatus.on_order ?? 0} · продано: ${byStatus.sold ?? 0}`);
if (warnings.length) {
  console.log("\n  Предупреждения:");
  for (const w of warnings) console.log("   • " + w);
}
console.log(products.length ? "\n  Готово: lib/products.generated.json обновлён.\n" : "\n  Ни одной строки с «Публиковать = Да» — сайт останется на демо-товарах.\n");
