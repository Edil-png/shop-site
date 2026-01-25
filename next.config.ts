// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ru.freepik.com',
        pathname: '/**',
      },
      // Добавьте другие домены по мере необходимости
    ],
    // Или используйте более простой способ (менее безопасный):
    // domains: ['example.com', 'ru.freepik.com', 'img.freepik.com'],
  },
};

module.exports = nextConfig;