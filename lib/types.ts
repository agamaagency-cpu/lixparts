export type ModelSlug = "l6" | "l7" | "l9";

export type ProductStatus = "in_stock" | "on_order" | "sold";

export type PartSide = "front" | "rear" | "left" | "right" | "none";

export interface CarModel {
  slug: ModelSlug;
  name: string; // Li Auto L6
  short: string; // L6
  tagline: string;
  years: string;
  body: string; // тип кузова
  accent: string; // hex для акцента карточки
}

export interface CategoryGroup {
  slug: string;
  title: string;
  categories: string[]; // slugs категорий, входящих в группу
}

export interface Category {
  slug: string;
  name: string; // русское название
  nameEn?: string;
  group: string; // slug группы
  icon: string; // ключ иконки
}

export interface Product {
  id: string;
  slug: string;
  name: string; // отображаемое название (как в ТЗ)
  categorySlug: string;
  model: ModelSlug;
  condition: string; // Отличное / Хорошее / Новое
  color: string;
  colorHex?: string;
  sku: string;
  price: number | null; // null = «по запросу»
  status: ProductStatus;
  side: PartSide;
  location: string; // Передняя левая и т.п.
  manufacturer: string;
  paintReady?: boolean; // можно ставить без покраски при совпадении цвета
  description: string;
  featured?: boolean;
}
