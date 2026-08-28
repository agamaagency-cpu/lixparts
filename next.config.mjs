/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Статический экспорт: на выходе чистые HTML/CSS/JS в папке out/ — то, что нужно Cloudflare Pages
  output: "export",
  // Экспорт не умеет в серверную оптимизацию картинок
  images: { unoptimized: true },
};

export default nextConfig;
