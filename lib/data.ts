import type {
  CarModel,
  Category,
  CategoryGroup,
  ModelSlug,
  Product,
} from "./types";

/* ------------------------------------------------------------------ */
/*  МОДЕЛИ                                                              */
/* ------------------------------------------------------------------ */

export const models: CarModel[] = [
  {
    slug: "l6",
    name: "Li Auto L6",
    short: "L6",
    tagline: "Среднеразмерный премиальный SUV",
    years: "2024 — н.в.",
    body: "SUV",
    accent: "#2b6cb0",
  },
  {
    slug: "l7",
    name: "Li Auto L7",
    short: "L7",
    tagline: "Пятиместный флагманский SUV",
    years: "2023 — н.в.",
    body: "SUV",
    accent: "#3a3f46",
  },
  {
    slug: "l9",
    name: "Li Auto L9",
    short: "L9",
    tagline: "Шестиместный полноразмерный SUV",
    years: "2022 — н.в.",
    body: "SUV",
    accent: "#141619",
  },
];

export function getModel(slug: string): CarModel | undefined {
  return models.find((m) => m.slug === slug);
}

/* ------------------------------------------------------------------ */
/*  ГРУППЫ И КАТЕГОРИИ                                                  */
/* ------------------------------------------------------------------ */

export const categoryGroups: CategoryGroup[] = [
  {
    slug: "body",
    title: "Кузовные детали",
    categories: [
      "front-bumper",
      "rear-bumper",
      "hood",
      "left-fender",
      "right-fender",
      "left-front-door",
      "right-front-door",
      "left-rear-door",
      "right-rear-door",
      "front-lower-trim",
      "rear-lower-trim",
    ],
  },
  {
    slug: "optics",
    title: "Оптика",
    categories: [
      "left-headlight",
      "right-headlight",
      "left-rear-light",
      "right-rear-light",
      "left-rear-bumper-light",
      "right-rear-bumper-light",
      "reflectors",
    ],
  },
  {
    slug: "mirrors",
    title: "Зеркала",
    categories: [
      "left-mirror-high",
      "right-mirror-high",
      "left-mirror-low",
      "right-mirror-low",
    ],
  },
  {
    slug: "liners",
    title: "Подкрылки",
    categories: ["left-fender-liner", "right-fender-liner"],
  },
  {
    slug: "cooling",
    title: "Система охлаждения",
    categories: ["radiator", "ac-radiator", "fan", "fan-shroud"],
  },
  {
    slug: "reinforcements",
    title: "Усилители и крепления",
    categories: ["bumper-reinforcement", "front-frame", "brackets"],
  },
  {
    slug: "misc",
    title: "Дополнительно",
    categories: ["door-handles", "plastic-parts", "wiring", "nosecut"],
  },
];

export const categories: Category[] = [
  // Кузов
  { slug: "front-bumper", name: "Передний бампер", nameEn: "Front Bumper", group: "body", icon: "bumper" },
  { slug: "rear-bumper", name: "Задний бампер", nameEn: "Rear Bumper Assembly", group: "body", icon: "bumper" },
  { slug: "hood", name: "Капот", nameEn: "Hood", group: "body", icon: "hood" },
  { slug: "left-fender", name: "Левое крыло", nameEn: "Left Fender", group: "body", icon: "fender" },
  { slug: "right-fender", name: "Правое крыло", nameEn: "Right Fender", group: "body", icon: "fender" },
  { slug: "left-front-door", name: "Передняя левая дверь", nameEn: "Left Front Door", group: "body", icon: "door" },
  { slug: "right-front-door", name: "Передняя правая дверь", nameEn: "Right Front Door", group: "body", icon: "door" },
  { slug: "left-rear-door", name: "Задняя левая дверь", nameEn: "Left Rear Door", group: "body", icon: "door" },
  { slug: "right-rear-door", name: "Задняя правая дверь", nameEn: "Right Rear Door", group: "body", icon: "door" },
  { slug: "front-lower-trim", name: "Передняя нижняя накладка", nameEn: "Front Bumper Lower Trim Plate", group: "body", icon: "trim" },
  { slug: "rear-lower-trim", name: "Задняя нижняя накладка", nameEn: "Rear Bumper Lower Trim Plate", group: "body", icon: "trim" },
  // Оптика
  { slug: "left-headlight", name: "Левая передняя фара", nameEn: "Left Headlight", group: "optics", icon: "light" },
  { slug: "right-headlight", name: "Правая передняя фара", nameEn: "Right Headlight", group: "optics", icon: "light" },
  { slug: "left-rear-light", name: "Левый задний фонарь", nameEn: "Left Rear Light", group: "optics", icon: "light" },
  { slug: "right-rear-light", name: "Правый задний фонарь", nameEn: "Right Rear Light", group: "optics", icon: "light" },
  { slug: "left-rear-bumper-light", name: "Левая подсветка бампера", nameEn: "Left Rear Bumper Light", group: "optics", icon: "light" },
  { slug: "right-rear-bumper-light", name: "Правая подсветка бампера", nameEn: "Right Rear Bumper Light", group: "optics", icon: "light" },
  { slug: "reflectors", name: "Катафоты", nameEn: "Reflectors", group: "optics", icon: "light" },
  // Зеркала
  { slug: "left-mirror-high", name: "Левое зеркало High Config", nameEn: "Left Rearview Mirror High Config", group: "mirrors", icon: "mirror" },
  { slug: "right-mirror-high", name: "Правое зеркало High Config", nameEn: "Right Rearview Mirror High Config", group: "mirrors", icon: "mirror" },
  { slug: "left-mirror-low", name: "Левое зеркало Low Config", nameEn: "Left Rearview Mirror Low Config", group: "mirrors", icon: "mirror" },
  { slug: "right-mirror-low", name: "Правое зеркало Low Config", nameEn: "Right Rearview Mirror Low Config", group: "mirrors", icon: "mirror" },
  // Подкрылки
  { slug: "left-fender-liner", name: "Левый подкрылок", nameEn: "Left Fender Liner", group: "liners", icon: "liner" },
  { slug: "right-fender-liner", name: "Правый подкрылок", nameEn: "Right Fender Liner", group: "liners", icon: "liner" },
  // Охлаждение
  { slug: "radiator", name: "Радиатор охлаждения", nameEn: "Cooling Radiator", group: "cooling", icon: "radiator" },
  { slug: "ac-radiator", name: "Радиатор кондиционера", nameEn: "A/C Radiator", group: "cooling", icon: "radiator" },
  { slug: "fan", name: "Вентилятор охлаждения", nameEn: "Cooling Fan", group: "cooling", icon: "fan" },
  { slug: "fan-shroud", name: "Диффузор вентилятора", nameEn: "Fan Shroud", group: "cooling", icon: "fan" },
  // Усилители
  { slug: "bumper-reinforcement", name: "Усилитель бампера", nameEn: "Bumper Reinforcement", group: "reinforcements", icon: "beam" },
  { slug: "front-frame", name: "Рамка передней части", nameEn: "Front Frame / Radiator Support", group: "reinforcements", icon: "frame" },
  { slug: "brackets", name: "Кронштейны и крепления", nameEn: "Brackets", group: "reinforcements", icon: "bracket" },
  // Прочее
  { slug: "door-handles", name: "Ручки дверей", nameEn: "Door Handles", group: "misc", icon: "handle" },
  { slug: "plastic-parts", name: "Пластиковые элементы", nameEn: "Plastic Parts", group: "misc", icon: "plastic" },
  { slug: "wiring", name: "Проводка и разъёмы", nameEn: "Wiring & Connectors", group: "misc", icon: "wiring" },
  { slug: "nosecut", name: "Ноускат (Nosecut)", nameEn: "Nosecut", group: "misc", icon: "nosecut" },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getGroupForCategory(slug: string): CategoryGroup | undefined {
  return categoryGroups.find((g) => g.categories.includes(slug));
}

/* Популярные категории для главной */
export const popularCategorySlugs = [
  "front-bumper",
  "rear-bumper",
  "left-front-door",
  "hood",
  "left-fender",
  "left-mirror-high",
  "left-headlight",
  "radiator",
  "fan",
  "nosecut",
];

/* ------------------------------------------------------------------ */
/*  ЦВЕТА                                                               */
/* ------------------------------------------------------------------ */

export const colorPalette: { name: string; hex: string }[] = [
  { name: "Чёрный", hex: "#1a1a1c" },
  { name: "Белый", hex: "#f2f3f4" },
  { name: "Серебристый", hex: "#c7ccd1" },
  { name: "Серый", hex: "#7d838a" },
  { name: "Синий", hex: "#2b4a7a" },
  { name: "Зелёный", hex: "#3c5647" },
];

/* ------------------------------------------------------------------ */
/*  ТОВАРЫ (демо)                                                       */
/* ------------------------------------------------------------------ */

interface DemoSeed {
  category: string;
  name: string;
  side: Product["side"];
  location: string;
  paintReady?: boolean;
}

const seed: DemoSeed[] = [
  { category: "nosecut", name: "Nosecut (ноускат в сборе)", side: "front", location: "Передняя часть" },
  { category: "rear-bumper", name: "Rear Bumper Assembly", side: "rear", location: "Задняя часть", paintReady: true },
  { category: "front-bumper", name: "Front Bumper", side: "front", location: "Передняя часть", paintReady: true },
  { category: "left-front-door", name: "Left Front Door", side: "left", location: "Передняя левая", paintReady: true },
  { category: "right-front-door", name: "Right Front Door", side: "right", location: "Передняя правая", paintReady: true },
  { category: "left-rear-door", name: "Left Rear Door", side: "left", location: "Задняя левая", paintReady: true },
  { category: "right-rear-door", name: "Right Rear Door", side: "right", location: "Задняя правая", paintReady: true },
  { category: "left-rear-light", name: "Left Rear Light", side: "left", location: "Задняя левая" },
  { category: "right-rear-light", name: "Right Rear Light", side: "right", location: "Задняя правая" },
  { category: "hood", name: "Hood", side: "front", location: "Передняя часть", paintReady: true },
  { category: "left-mirror-high", name: "Left Rearview Mirror High Config", side: "left", location: "Передняя левая" },
  { category: "right-mirror-high", name: "Right Rearview Mirror High Config", side: "right", location: "Передняя правая" },
  { category: "left-mirror-low", name: "Left Rearview Mirror Low Config", side: "left", location: "Передняя левая" },
  { category: "right-mirror-low", name: "Right Rearview Mirror Low Config", side: "right", location: "Передняя правая" },
  { category: "left-fender-liner", name: "Left Fender Liner", side: "left", location: "Передняя левая" },
  { category: "right-fender-liner", name: "Right Fender Liner", side: "right", location: "Передняя правая" },
  { category: "left-fender", name: "Left Fender", side: "left", location: "Передняя левая", paintReady: true },
  { category: "right-fender", name: "Right Fender", side: "right", location: "Передняя правая", paintReady: true },
  { category: "left-rear-bumper-light", name: "Left Rear Bumper Light", side: "left", location: "Задняя левая" },
  { category: "right-rear-bumper-light", name: "Right Rear Bumper Light", side: "right", location: "Задняя правая" },
  { category: "front-lower-trim", name: "Front Bumper Lower Trim Plate", side: "front", location: "Передняя часть" },
  { category: "rear-lower-trim", name: "Rear Bumper Lower Trim Plate", side: "rear", location: "Задняя часть" },
  { category: "door-handles", name: "Door Handles (комплект)", side: "none", location: "Кузов" },
];

const conditions = ["Отличное", "Отличное", "Хорошее", "Отличное"];
const statusCycle: Product["status"][] = ["in_stock", "in_stock", "on_order", "in_stock", "sold"];

function priceFor(category: string): number | null {
  const map: Record<string, number> = {
    nosecut: 0,
    "rear-bumper": 78000,
    "front-bumper": 82000,
    "left-front-door": 96000,
    "right-front-door": 96000,
    "left-rear-door": 92000,
    "right-rear-door": 92000,
    "left-rear-light": 34000,
    "right-rear-light": 34000,
    hood: 88000,
    "left-mirror-high": 41000,
    "right-mirror-high": 41000,
    "left-mirror-low": 32000,
    "right-mirror-low": 32000,
    "left-fender-liner": 9000,
    "right-fender-liner": 9000,
    "left-fender": 46000,
    "right-fender": 46000,
    "left-rear-bumper-light": 14000,
    "right-rear-bumper-light": 14000,
    "front-lower-trim": 16000,
    "rear-lower-trim": 16000,
    "door-handles": 12000,
    radiator: 38000,
    "ac-radiator": 34000,
    fan: 29000,
  };
  const base = map[category];
  if (base === undefined) return null;
  if (base === 0) return null; // ноускат — цена по запросу
  return base;
}

function slugify(model: ModelSlug, category: string): string {
  return `${model}-${category}`;
}

/**
 * Товары генерируются из демо-списка по всем трём моделям.
 * Такой data-driven подход позволяет добавлять модели и категории без правок интерфейса.
 */
export const products: Product[] = (() => {
  const list: Product[] = [];
  let i = 0;
  for (const model of models) {
    for (const s of seed) {
      const color = colorPalette[i % colorPalette.length];
      const status = statusCycle[i % statusCycle.length];
      const cat = getCategory(s.category);
      const price = priceFor(s.category);
      // небольшая наценка/разброс по модели, чтобы данные выглядели живо
      const modelFactor = model.slug === "l9" ? 1.18 : model.slug === "l7" ? 1.08 : 1;
      list.push({
        id: `${model.slug}-${s.category}-${i}`,
        slug: slugify(model.slug, s.category),
        name: s.name,
        categorySlug: s.category,
        model: model.slug,
        condition: conditions[i % conditions.length],
        color: color.name,
        colorHex: color.hex,
        sku: `LX-${model.short}-${s.category.toUpperCase().replace(/-/g, "").slice(0, 6)}-${(100 + i).toString()}`,
        price: price === null ? null : Math.round((price * modelFactor) / 1000) * 1000,
        status,
        side: s.side,
        location: s.location,
        manufacturer: "Original OEM",
        paintReady: s.paintReady,
        description:
          `${s.name} для ${model.name}. Оригинальная деталь OEM, снята с автомобиля с минимальным пробегом. ` +
          (s.paintReady
            ? "Кузовной элемент в заводском состоянии — при совпадении цвета возможна установка без покраски. "
            : "") +
          `Каждая позиция фотографируется отдельно, состояние описывается честно. Категория: ${cat?.name ?? s.name}.`,
        featured: i % 3 === 0,
      });
      i++;
    }
  }
  return list;
})();

export function getProductsByModel(model: string): Product[] {
  return products.filter((p) => p.model === model);
}

/** Список slug категорий, для которых у модели есть демо-товар (для статических путей). */
export function seedCategorySlugsForModel(model: string): string[] {
  return Array.from(
    new Set(products.filter((p) => p.model === model).map((p) => p.categorySlug))
  );
}

export function getProductBySlug(model: string, category: string): Product | undefined {
  return products.find((p) => p.model === model && p.categorySlug === category);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.status === "in_stock").slice(0, limit);
}

export const statusLabels: Record<Product["status"], string> = {
  in_stock: "В наличии",
  on_order: "Под заказ",
  sold: "Продано",
};

/* ------------------------------------------------------------------ */
/*  FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faqs: { q: string; a: string }[] = [
  {
    q: "Все ли детали оригинальные?",
    a: "Да. Основные кузовные и технические детали — оригинальные OEM, снятые с автомобилей Li Auto. Если по позиции есть нюансы, мы указываем это в описании честно.",
  },
  {
    q: "Это новые или б/у запчасти?",
    a: "Преимущественно это оригинальные б/у детали, снятые с тестовых автомобилей с минимальными пробегами. Большинство кузовных элементов находятся в состоянии, максимально близком к новым.",
  },
  {
    q: "Можно ли подобрать деталь по VIN?",
    a: "Да. Отправьте VIN автомобиля — мы поможем подобрать совместимую деталь и проверим её соответствие вашей комплектации.",
  },
  {
    q: "Есть ли доставка?",
    a: "Да. Организуем выдачу на месте или доставку в ваш город. Детали под заказ привозим из Китая, как правило, за 5–10 дней по договору.",
  },
  {
    q: "Можно ли заказать деталь, которой нет в наличии?",
    a: "Конечно. Оставьте заявку с названием детали или VIN — мы найдём и привезём нужную позицию под заказ.",
  },
  {
    q: "Есть ли реальные фотографии именно моей детали?",
    a: "Да. Каждая позиция фотографируется отдельно. Перед покупкой вы получаете фото и, по запросу, видео конкретной детали.",
  },
  {
    q: "Как узнать, подойдёт ли цвет?",
    a: "Отправьте фото автомобиля или код цвета кузова — мы поможем подобрать деталь максимально близкую по оттенку. При совпадении цвета многие кузовные элементы устанавливаются без покраски.",
  },
];

/* ------------------------------------------------------------------ */
/*  НОУСКАТ — конструктор комплектаций                                  */
/* ------------------------------------------------------------------ */

export interface NosecutPart {
  name: string;
  group: string;
  // в каких типовых комплектах встречается (для «конструктора» с галочками)
  basic: boolean;
  standard: boolean;
  full: boolean;
}

export const nosecutParts: NosecutPart[] = [
  { name: "Передний бампер", group: "Основные кузовные элементы", basic: true, standard: true, full: true },
  { name: "Капот", group: "Основные кузовные элементы", basic: false, standard: true, full: true },
  { name: "Переднее левое крыло", group: "Основные кузовные элементы", basic: false, standard: true, full: true },
  { name: "Переднее правое крыло", group: "Основные кузовные элементы", basic: false, standard: true, full: true },
  { name: "Радиатор охлаждения", group: "Система охлаждения", basic: true, standard: true, full: true },
  { name: "Радиатор кондиционера", group: "Система охлаждения", basic: false, standard: true, full: true },
  { name: "Вентилятор охлаждения", group: "Система охлаждения", basic: true, standard: true, full: true },
  { name: "Диффузор вентилятора", group: "Система охлаждения", basic: false, standard: true, full: true },
  { name: "Левая передняя фара", group: "Передняя оптика", basic: false, standard: true, full: true },
  { name: "Правая передняя фара", group: "Передняя оптика", basic: false, standard: true, full: true },
  { name: "Усилитель переднего бампера", group: "Усилители и крепления", basic: true, standard: true, full: true },
  { name: "Телевизор / рамка передней части", group: "Усилители и крепления", basic: false, standard: true, full: true },
  { name: "Кронштейны", group: "Усилители и крепления", basic: false, standard: false, full: true },
  { name: "Направляющие", group: "Усилители и крепления", basic: false, standard: false, full: true },
  { name: "Крепления", group: "Усилители и крепления", basic: false, standard: true, full: true },
  { name: "Передняя нижняя накладка", group: "Дополнительные элементы", basic: false, standard: false, full: true },
  { name: "Декоративные элементы", group: "Дополнительные элементы", basic: false, standard: false, full: true },
  { name: "Проводка", group: "Дополнительные элементы", basic: false, standard: false, full: true },
  { name: "Разъёмы", group: "Дополнительные элементы", basic: false, standard: false, full: true },
];

export const nosecutKits = [
  { key: "basic", title: "Базовый", desc: "Минимальный набор передней части" },
  { key: "standard", title: "Стандарт", desc: "Наиболее востребованная комплектация" },
  { key: "full", title: "Полный", desc: "Максимально укомплектованный ноускат" },
] as const;

/* ------------------------------------------------------------------ */
/*  КОНТАКТЫ                                                            */
/* ------------------------------------------------------------------ */

export const contacts = {
  phone: "+7 (000) 000-00-00",
  phoneHref: "tel:+70000000000",
  whatsapp: "+7 (000) 000-00-00",
  whatsappHref: "https://wa.me/70000000000",
  telegram: "@liauto_parts",
  telegramHref: "https://t.me/liauto_parts",
  instagram: "@liauto.parts",
  instagramHref: "https://instagram.com/liauto.parts",
  address: "г. Москва, ул. Примерная, 1 (уточняется)",
  hours: "Пн–Сб: 10:00 – 19:00 · Вс: по договорённости",
  email: "info@liauto-parts.example",
};

export const brand = {
  name: "LIXPARTS",
  full: "LIXPARTS — оригинальные запчасти Li Auto",
  tagline: "Оригинальные запчасти Li Auto L6 · L7 · L9",
};
