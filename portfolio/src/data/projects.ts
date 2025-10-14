export interface Project {
  title: string;
  description: string;
  tech: string[];
  role: string;
  highlights: string[];
  period: string;
  link?: string;
}

export const projects: Project[] = [
  {
    title: "Okestro Cloud Management Platform (CMP)",
    description: "엔터프라이즈급 클라우드 관리 플랫폼의 프론트엔드 개발",
    tech: [
      "Vue 3",
      "TypeScript",
      "Vuetify",
      "Pinia",
      "TanStack Query",
      "NX Monorepo",
      "Feature-Sliced Design",
    ],
    role: "Frontend Developer",
    highlights: [
      "NX 기반 Monorepo 아키텍처로 다중 앱/패키지 관리",
      "Feature-Sliced Design 패턴 적용으로 확장 가능한 구조 설계",
      "Workspace 관리, Governance, Inventory, Monitoring 등 핵심 기능 개발",
      "공통 UI 컴포넌트 라이브러리 구축 및 Storybook 문서화",
      "TanStack Query를 활용한 효율적인 서버 상태 관리",
    ],
    period: "2024 - Present",
  },
  {
    title: "MCP Integration Hub",
    description: "AI 도구와 외부 서비스 통합을 위한 MCP(Model Context Protocol) 허브 아키텍처 설계",
    tech: [
      "TypeScript",
      "MCP Protocol",
      "Docker",
      "Atlassian API",
      "GitHub API",
      "Notion API",
      "Swagger/OpenAPI",
      "Figma API",
    ],
    role: "Integration Architect & Developer",
    highlights: [
      "Atlassian (Jira/Confluence) MCP 서버 연동",
      "GitHub MCP 서버를 통한 저장소 관리 자동화",
      "Swagger/OpenAPI MCP 서버로 API 문서 자동 연동",
      "Figma MCP 서버를 통한 디자인-개발 워크플로우 연결",
      "통합 MCP 허브 아키텍처 설계 및 구현",
    ],
    period: "2025",
    link: "https://github.com/rlgus120712-wq/killer_joki_-development_story",
  },
  {
    title: "Design System & Component Library",
    description: "재사용 가능한 UI 컴포넌트 라이브러리 구축",
    tech: [
      "Vue 3",
      "TypeScript",
      "Vuetify",
      "Storybook",
      "SCSS",
      "Design Tokens",
    ],
    role: "Frontend Developer",
    highlights: [
      "CmpXXX.vue 네이밍 컨벤션 기반 공통 컴포넌트 개발",
      "Storybook을 통한 컴포넌트 문서화 및 인터랙티브 데모",
      "Design Tokens 시스템으로 일관된 디자인 언어 구축",
      "300+ 재사용 가능 컴포넌트 라이브러리 제공",
      "접근성(A11y) 및 반응형 디자인 지원",
    ],
    period: "2024 - Present",
  },
  {
    title: "Vuetify 3 Project Portfolio",
    description: "Vuetify 3 기반 프로젝트 및 실험적 기능 구현",
    tech: ["Vue 3", "Vuetify 3", "TypeScript", "Vite", "ESLint", "PostCSS"],
    role: "Frontend Developer",
    highlights: [
      "Vuetify 3의 최신 기능 및 컴포넌트 활용",
      "반응형 레이아웃 및 테마 커스터마이징",
      "ESLint 및 코드 품질 관리",
      "Vite 기반 빠른 개발 환경 구축",
    ],
    period: "2024 - Present",
    link: "https://github.com/rlgus120712-wq/killer_joki_-development_story/tree/main/vuetify-project",
  },
];
