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
/*
 * Источники временных фото (Wikimedia Commons), до съёмки своих:
 *   L6, L9 и главная: «Li Auto L6 II 001», «Li Auto L9 II 001», автор JustAnotherCarDesigner, CC0
 *   L7: «Li Auto L7 001», автор JustAnotherCarDesigner, CC BY-SA 4.0 (подпись обязательна, поле credit)
 */
export interface BannerSlot {
  src: string | null;
  srcMobile?: string | null;
  alt: string;
  /** Подпись автора для фото под лицензией CC BY / CC BY-SA (обязательна по лицензии). */
  credit?: string;
}

export const banners: Record<string, BannerSlot> = {
  "home-hero": { src: "/banners/home-hero.jpg", alt: "Оригинальные запчасти Li Auto в Алматы — RS Auto Parts" },
  "model-card-l6": { src: "/banners/model-card-l6.jpg", alt: "Запчасти Li Auto L6" },
  "model-card-l7": { src: "/banners/model-card-l7.jpg", alt: "Запчасти Li Auto L7", credit: "Фото: JustAnotherCarDesigner, CC BY-SA 4.0" },
  "model-card-l9": { src: "/banners/model-card-l9.jpg", alt: "Запчасти Li Auto L9" },
  "model-hero-l6": { src: "/banners/model-hero-l6.jpg", alt: "Запчасти Li Auto L6 в наличии" },
  "model-hero-l7": { src: "/banners/model-hero-l7.jpg", alt: "Запчасти Li Auto L7 в наличии", credit: "Фото: JustAnotherCarDesigner, CC BY-SA 4.0" },
  "model-hero-l9": { src: "/banners/model-hero-l9.jpg", alt: "Запчасти Li Auto L9 в наличии" },
  "about-hero": { src: null, alt: "Склад RS Auto Parts в Алматы" },
};
