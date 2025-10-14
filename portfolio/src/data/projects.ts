export interface Project {
  title: string;
  description: string;
  tech: string[];
  role: string;
  highlights: string[];
  period: string;
  company?: string;
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
    company: "Okestro",
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
    title: "CJ 올리브네트웍스 - 스마트 HACCP 인증 공정 시스템",
    description: "식품안전관리인증기준(HACCP) 인증을 위한 스마트 공정 관리 시스템 개발",
    tech: [
      "Vue.js",
      "TypeScript",
      "Oracle",
      "MS-SQL",
      "REST API",
      "Chart.js",
    ],
    role: "Frontend Developer",
    company: "CJ 올리브네트웍스",
    highlights: [
      "인천화요 공장 스마트 HACCP 인증마크 획득 기여",
      "실시간 공정 모니터링 대시보드 구현",
      "HACCP 7원칙 기반 위해요소 관리 시스템 개발",
      "온도, 습도 등 CCP(Critical Control Point) 자동 기록 및 알람 시스템",
      "식품안전관리 보고서 자동 생성 기능 구현",
    ],
    period: "2022 - 2023",
  },
  {
    title: "농심엔지니어링 - 정식품 스마트팩토리 MES",
    description: "정식품 공장의 제조실행시스템(MES) 구축 및 1차, 2차 고도화 프로젝트",
    tech: [
      "Vue.js",
      "JavaScript",
      "Oracle",
      "MySQL",
      "MES",
      "SCADA",
    ],
    role: "Frontend Developer",
    company: "농심엔지니어링",
    highlights: [
      "정식품 공장 MES 시스템 초기 구축 참여",
      "1차 고도화: 생산 계획 및 실적 관리 기능 개선",
      "2차 고도화: 품질 관리 및 추적성 강화",
      "실시간 설비 모니터링 및 OEE(Overall Equipment Effectiveness) 분석",
      "생산 공정별 작업 지시 및 실적 수집 자동화",
      "원자재 입고부터 완제품 출하까지 전 공정 가시화",
    ],
    period: "2021 - 2023",
  },
  {
    title: "농심엔지니어링 - 동원F&B 스마트팩토리",
    description: "동원F&B의 생산 공정 디지털화 및 스마트팩토리 구축",
    tech: [
      "Vue.js",
      "TypeScript",
      "MS-SQL",
      "MES",
      "IoT Integration",
    ],
    role: "Frontend Developer",
    company: "농심엔지니어링",
    highlights: [
      "생산 공정 실시간 모니터링 시스템 구축",
      "설비 데이터 자동 수집 및 분석 대시보드 개발",
      "품질 검사 데이터 관리 시스템 구현",
      "공정 이상 감지 및 알람 시스템 개발",
      "생산성 향상을 위한 데이터 분석 리포트 기능",
    ],
    period: "2022 - 2023",
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
    company: "Okestro",
    highlights: [
      "CmpXXX.vue 네이밍 컨벤션 기반 공통 컴포넌트 개발",
      "Storybook을 통한 컴포넌트 문서화 및 인터랙티브 데모",
      "Design Tokens 시스템으로 일관된 디자인 언어 구축",
      "300+ 재사용 가능 컴포넌트 라이브러리 제공",
      "접근성(A11y) 및 반응형 디자인 지원",
    ],
    period: "2024 - Present",
  },
];
