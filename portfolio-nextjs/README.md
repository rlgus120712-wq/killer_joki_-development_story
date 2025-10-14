# 조기현 - Frontend Developer Portfolio

## 🚀 Next.js 14로 제작된 포트폴리오

이 포트폴리오는 최신 웹 기술을 활용하여 제작된 개인 포트폴리오입니다.

## 🛠 기술 스택

### 핵심 프레임워크
- **Next.js 14** - React 프레임워크, App Router, SSG, SEO 최적화
- **React 18** - 최신 React, Hooks, Suspense
- **TypeScript 5** - 타입 안정성, 컴파일 타임 에러 방지

### 스타일링 & 애니메이션
- **Tailwind CSS 3** - 유틸리티 우선 CSS 프레임워크
- **Framer Motion 11** - 부드러운 애니메이션 및 인터랙티브 UX

### 배포 & DevOps
- **Vercel** - Edge Network 배포, 글로벌 CDN, 자동 배포
- **GitHub Actions** - CI/CD 파이프라인

### 개발 도구
- **ESLint & Prettier** - 코드 품질 관리
- **Git** - 버전 관리

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
cd portfolio-nextjs
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 🌐 Vercel 배포

### 1. Vercel 계정 생성
1. [Vercel](https://vercel.com) 접속
2. GitHub 계정으로 로그인

### 2. 프로젝트 배포
1. Vercel 대시보드에서 "Add New Project" 클릭
2. GitHub 저장소 선택: `killer_joki_-development_story`
3. Root Directory 설정: `portfolio-nextjs`
4. "Deploy" 클릭

### 3. 자동 배포
- `main` 브랜치에 push하면 자동으로 배포됩니다
- Pull Request마다 프리뷰 배포가 생성됩니다

## 📁 프로젝트 구조

```
portfolio-nextjs/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx       # 레이아웃 및 메타데이터
│   │   ├── page.tsx         # 메인 페이지
│   │   └── globals.css      # 글로벌 스타일
│   ├── components/          # React 컴포넌트
│   │   ├── Hero.tsx         # 히어로 섹션
│   │   ├── About.tsx        # 소개 섹션
│   │   ├── Skills.tsx       # 기술 스택
│   │   ├── Projects.tsx     # 프로젝트
│   │   ├── TechStack.tsx    # 포트폴리오 기술 스택
│   │   └── Contact.tsx      # 연락처
│   └── data/                # 데이터 파일
│       ├── skills.ts        # 기술 스택 데이터
│       ├── projects.ts      # 프로젝트 데이터
│       └── portfolioTech.ts # 포트폴리오 기술 스택
├── public/                  # 정적 파일
│   └── profile.jpg          # 프로필 이미지
├── next.config.js           # Next.js 설정
├── tailwind.config.ts       # Tailwind CSS 설정
└── tsconfig.json            # TypeScript 설정
```

## ✨ 주요 기능

### 1. 반응형 디자인
- 모바일, 태블릿, 데스크톱 모든 화면 크기 지원
- Tailwind CSS breakpoints 활용

### 2. 부드러운 애니메이션
- Framer Motion을 활용한 페이지 전환
- Scroll-based animations
- Hover effects

### 3. SEO 최적화
- Next.js 메타데이터 API
- Open Graph 태그
- Semantic HTML

### 4. 성능 최적화
- Static Site Generation (SSG)
- Image Optimization
- Code Splitting

### 5. 접근성
- Semantic HTML
- ARIA labels
- Keyboard navigation

## 🎨 커스터마이징

### 프로필 이미지 변경
`public/profile.jpg` 파일을 교체하세요.

### 데이터 수정
- 기술 스택: `src/data/skills.ts`
- 프로젝트: `src/data/projects.ts`
- 포트폴리오 기술: `src/data/portfolioTech.ts`

### 색상 테마 변경
`tailwind.config.ts`에서 `primary` 색상을 수정하세요.

## 📝 라이선스

MIT License

## 📧 연락처

- **Email**: rlgus120712@gmail.com
- **GitHub**: [@rlgus120712-wq](https://github.com/rlgus120712-wq)

---

Made with ❤️ by 조기현
