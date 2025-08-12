export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year: string | number;
  tags: string[];
  links?: { github?: string; demo?: string };
};

export type Experience = {
  period: string;
  role: string;
  company: string;
  stack?: string;
  desc: string;
};

export const socials = {
  github: 'https://github.com/your-id',
  linkedin: 'https://www.linkedin.com/in/your-id',
  email: 'your@email.com',
};

export const skills = [
  'Vue 3', 'TypeScript', 'Vuetify', 'Pinia', 'Vite', 'Ionic',
  'Node.js', 'Express', 'NestJS', 'GraphQL', 'REST', 'WebSocket',
  'PostgreSQL', 'MongoDB', 'Prisma', 'Docker', 'Kubernetes', 'CI/CD',
  'Playwright', 'Vitest', 'Jest', 'Clean Architecture', 'DDD'
];

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Observa – 모니터링 대시보드',
    subtitle: '실시간 인프라 모니터링과 알림',
    description: 'vSphere 메모리 임계치 경고 등 중요 메트릭을 직관적으로 보여주고, 글로벌 경고 모달로 즉시 액션을 유도하는 대시보드.',
    year: '2025',
    tags: ['Vue', 'Vuetify', 'Pinia', 'WebSocket'],
    links: { github: 'https://github.com/your-id/observa', demo: '#' },
  },
  {
    id: 'p2',
    title: 'Service Maestro',
    subtitle: '서비스 카탈로그와 변경 신청 관리',
    description: '블루 그라데이션 UI, 테이블 기반 목록/상세/모달 워크플로로 생산성과 사용성을 함께 개선.',
    year: '2024',
    tags: ['Vue', 'Vuetify', 'TypeScript'],
    links: { github: 'https://github.com/your-id/maestro', demo: '#' },
  },
  {
    id: 'p3',
    title: 'Insight Mobile',
    subtitle: 'Ionic 기반 하이브리드 앱',
    description: '반응형 탭바와 인사이트 탭, 정교한 배지 배치 등 모바일 UX 최적화.',
    year: '2024',
    tags: ['Ionic', 'Vue', 'Capacitor'],
    links: { github: 'https://github.com/your-id/insight-mobile' },
  },
];

export const experiences: Experience[] = [
  {
    period: '2023 - 현재',
    role: 'Full-Stack Developer',
    company: 'Freelance / Side Projects',
    stack: 'Vue 3, TypeScript, Node.js, PostgreSQL, Docker',
    desc: '사용자 가치 중심의 제품 설계와 기능 개발, 성능 최적화, 자동화된 테스트 파이프라인 구축.',
  },
  {
    period: '2021 - 2023',
    role: 'Frontend Developer',
    company: 'Startup',
    stack: 'Vue, Quasar → Vuetify 마이그레이션',
    desc: '디자인 시스템 정립, 컴포넌트 마이그레이션, 레이아웃 및 내비게이션 개선.',
  },
];
