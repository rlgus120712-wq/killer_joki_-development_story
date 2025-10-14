export interface Skill {
  category: string;
  items: {
    name: string;
    level: number;
    icon?: string;
  }[];
}

export const skills: Skill[] = [
  {
    category: "Frontend Framework",
    items: [
      { name: "Vue 3", level: 95 },
      { name: "React", level: 85 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript (ES6+)", level: 95 },
    ],
  },
  {
    category: "UI/UX Libraries",
    items: [
      { name: "Vuetify", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "SCSS/SASS", level: 85 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    category: "State Management",
    items: [
      { name: "Pinia", level: 90 },
      { name: "TanStack Query (Vue Query)", level: 85 },
      { name: "Vuex", level: 80 },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "Oracle", level: 85 },
      { name: "MS-SQL", level: 85 },
      { name: "MySQL", level: 90 },
      { name: "PostgreSQL", level: 75 },
    ],
  },
  {
    category: "Build Tools & Architecture",
    items: [
      { name: "Vite", level: 90 },
      { name: "NX Monorepo", level: 85 },
      { name: "pnpm", level: 90 },
      { name: "Webpack", level: 85 },
      { name: "Module Federation", level: 85 },
    ],
  },
  {
    category: "Architecture & Design Patterns",
    items: [
      { name: "Feature-Sliced Design (FSD)", level: 90 },
      { name: "Module Federation", level: 85 },
      { name: "Component-Driven Development", level: 95 },
      { name: "Clean Architecture", level: 85 },
      { name: "Design System", level: 85 },
      { name: "Micro-Frontend", level: 80 },
    ],
  },
  {
    category: "API & Integration",
    items: [
      { name: "Axios", level: 95 },
      { name: "REST API", level: 90 },
      { name: "GraphQL", level: 70 },
      { name: "MCP (Model Context Protocol)", level: 85 },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "Docker", level: 80 },
      { name: "CI/CD", level: 75 },
      { name: "Git", level: 95 },
      { name: "Husky (Git Hooks)", level: 85 },
    ],
  },
  {
    category: "Integration Tools",
    items: [
      { name: "Atlassian (Jira/Confluence)", level: 85 },
      { name: "GitHub API", level: 85 },
      { name: "Notion API", level: 80 },
      { name: "Figma API", level: 75 },
      { name: "Swagger/OpenAPI", level: 85 },
    ],
  },
];
