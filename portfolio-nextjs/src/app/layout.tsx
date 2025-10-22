import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '조기현 | Frontend Developer Portfolio',
  description: 'Vue 3, React, TypeScript 전문 프론트엔드 개발자 조기현의 포트폴리오',
  keywords: ['Frontend Developer', 'React', 'Vue', 'TypeScript', 'Next.js', '조기현'],
  authors: [{ name: '조기현', url: 'https://github.com/rlgus120712-wq' }],
  openGraph: {
    title: '조기현 | Frontend Developer Portfolio',
    description: 'Vue 3, React, TypeScript 전문 프론트엔드 개발자',
    type: 'website',
    locale: 'ko_KR',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}