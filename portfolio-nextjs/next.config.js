/** @type {import('next').NextConfig} */
const nextConfig = {
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
  
  // GitHub Pages 배포를 위한 설정
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio-nextjs' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-nextjs' : '',
}

module.exports = nextConfig