/**
 * Баннеры сайта. Пока дизайнер не прислал файлы, src = null и показывается
 * реальное фото со склада (fallback). Чтобы поставить баннер:
 *   1) положить файлы в public/banners/ (имена ниже)
 *   2) прописать src (и srcMobile, если есть мобильная версия)
 *
 * Размеры (в 2 раза больше места на экране — для чётких Retina-экранов):
 *   home-hero           1120×840  (4:3)   главная, первый экран справа
 *   home-hero (моб.)     780×585  (4:3)   необязательно, иначе ужмётся десктопная
 *   model-card-l6/l7/l9  800×500  (16:10) главная, карточки «Выберите модель»
 *   model-hero-l6/l7/l9 1080×720  (3:2)   страница модели /catalog/l6 и т.д., справа
 *   about-hero          1120×840  (4:3)   страница «О компании», справа
 */
export interface BannerSlot {
  src: string | null;
  srcMobile?: string | null;
  alt: string;
}

export const banners: Record<string, BannerSlot> = {
  "home-hero": { src: null, alt: "Оригинальные запчасти Li Auto в Алматы — RS Auto Parts" },
  "model-card-l6": { src: null, alt: "Запчасти Li Auto L6" },
  "model-card-l7": { src: null, alt: "Запчасти Li Auto L7" },
  "model-card-l9": { src: null, alt: "Запчасти Li Auto L9" },
  "model-hero-l6": { src: null, alt: "Запчасти Li Auto L6 в наличии" },
  "model-hero-l7": { src: null, alt: "Запчасти Li Auto L7 в наличии" },
  "model-hero-l9": { src: null, alt: "Запчасти Li Auto L9 в наличии" },
  "about-hero": { src: null, alt: "Склад RS Auto Parts в Алматы" },
};
