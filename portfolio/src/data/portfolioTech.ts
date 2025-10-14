export interface TechStackItem {
  name: string;
  description: string;
  icon: string;
  category: 'core' | 'styling' | 'animation' | 'deployment' | 'tooling';
}

export const portfolioTechStack: TechStackItem[] = [
  {
    name: 'React 18',
    description: '최신 React - Hooks, Suspense',
    icon: '⚛️',
    category: 'core',
  },
  {
    name: 'Vite 6',
    description: '최신 빌드 도구 - 빠른 HMR',
    icon: '⚡',
    category: 'core',
  },
  {
    name: 'TypeScript 5',
    description: '타입 안정성 - 컴파일 타임 에러 방지',
    icon: '📘',
    category: 'core',
  },
  {
    name: 'Tailwind CSS 3',
    description: '유틸리티 우선 CSS - 빠른 스타일링',
    icon: '🎨',
    category: 'styling',
  },
  {
    name: 'Framer Motion 11',
    description: '부드러운 애니메이션 - 인터랙티브 UX',
    icon: '✨',
    category: 'animation',
  },
  {
    name: 'GitHub Pages',
    description: '무료 호스팅 - GitHub 통합',
    icon: '🚀',
    category: 'deployment',
  },
  {
    name: 'GitHub Actions',
    description: 'CI/CD 파이프라인 - 자동화된 빌드 & 배포',
    icon: '🔄',
    category: 'tooling',
  },
  {
    name: 'ESLint & Prettier',
    description: '코드 품질 관리 - 일관된 코딩 스타일',
    icon: '🔍',
    category: 'tooling',
  },
];
