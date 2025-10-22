/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  // 모바일 최적화를 위한 설정
  poweredByHeader: false,
  compress: true,
  // 애니메이션 성능 최적화
  swcMinify: true,
  // 모바일에서 더 나은 성능을 위한 설정
  reactStrictMode: true,
}

module.exports = nextConfig