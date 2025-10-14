import { 
  Zap, 
  Palette, 
  Package, 
  Cloud, 
  GitBranch, 
  Shield 
} from 'lucide-react';

export const portfolioTechStack = [
  {
    name: 'Next.js 14',
    icon: Zap,
    description: 'React 프레임워크로 SSR, SSG, 최적화 제공',
    features: [
      'App Router 아키텍처',
      '자동 코드 스플리팅',
      '이미지 최적화'
    ]
  },
  {
    name: 'TypeScript',
    icon: Shield,
    description: '타입 안정성과 개발 생산성 향상',
    features: [
      '강력한 타입 시스템',
      'IDE 자동완성 지원',
      '런타임 오류 사전 방지'
    ]
  },
  {
    name: 'Tailwind CSS',
    icon: Palette,
    description: '유틸리티 우선 CSS 프레임워크',
    features: [
      '빠른 스타일링',
      '반응형 디자인',
      '다크모드 지원'
    ]
  },
  {
    name: 'Framer Motion',
    icon: Package,
    description: '부드럽고 현대적인 애니메이션',
    features: [
      'Scroll 기반 애니메이션',
      'Gesture 인터랙션',
      '레이아웃 애니메이션'
    ]
  },
  {
    name: 'Vercel',
    icon: Cloud,
    description: '자동 배포 및 호스팅 플랫폼',
    features: [
      'Git Push 자동 배포',
      'Edge Network CDN',
      '무료 SSL 인증서'
    ]
  },
  {
    name: 'GitHub Actions',
    icon: GitBranch,
    description: 'CI/CD 파이프라인 자동화',
    features: [
      '코드 품질 검사',
      '자동 빌드 테스트',
      '배포 자동화'
    ]
  }
];
