'use client'

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Rocket, Users, Sparkles, Factory, Shield, Zap, ShoppingCart, Key, TrendingUp, Award } from 'lucide-react';

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const features = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: '클린 코드',
      description: 'TypeScript와 Feature-Sliced Design으로 유지보수성 99% 향상',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: '성능 최적화',
      description: 'Vite + TanStack Query로 초기 로딩 속도 40% 개선',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '협업',
      description: 'Jira + Confluence + GitHub으로 10인+ 팀 효율 증대',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: '지속적 학습',
      description: '매일 기술 블로그 작성 및 최신 트렌드 습득',
    },
    {
      icon: <Factory className="w-8 h-8" />,
      title: '스마트팩토리',
      description: '3개 공장 MES 구축, 생산성 25% 향상 기여',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'HACCP 인증',
      description: '식품안전관리 시스템으로 국가 인증마크 획득',
    },
  ];

  return (
    <section id="about" className="py-20 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            About Me
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto font-semibold">
            매일의 기록 = 성장의 증거<br />
            <span className="text-primary-400">5년차 프론트엔드 개발자</span>로, Vue 3와 React 생태계에서<br />
            <span className="text-primary-400">엔터프라이즈급 웹 애플리케이션</span>을 설계하고 구축합니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-6 rounded-xl hover:bg-white/10 transition-all group"
            >
              <div className="text-primary-500 mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 font-medium">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass p-8 rounded-xl mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-7 h-7 text-green-500" />
            <h3 className="text-2xl font-bold text-white">현재 진행 중</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <p className="mb-3">
                <span className="text-primary-500 font-bold text-lg">🏢 Okestro CMP</span> - 클라우드 관리 플랫폼
              </p>
              <ul className="space-y-2 pl-4">
                <li>• <span className="text-white font-semibold">NX Monorepo</span> 기반 멀티 패키지 아키텍처 설계</li>
                <li>• <span className="text-white font-semibold">300+</span> 재사용 가능한 UI 컴포넌트 라이브러리 구축</li>
                <li>• <span className="text-white font-semibold">Feature-Sliced Design</span> 패턴으로 확장성 확보</li>
                <li>• <span className="text-white font-semibold">TanStack Query</span>로 서버 상태 관리 최적화</li>
              </ul>
            </div>
            <div>
              <p className="mb-3">
                <span className="text-blue-500 font-bold text-lg">🎯 핵심 프로젝트</span>
              </p>
              <ul className="space-y-2 pl-4">
                <li>• <span className="text-white font-semibold">서비스 카탈로그</span> - 클라우드 리소스 자동 프로비저닝</li>
                <li>• <span className="text-white font-semibold">Keycloak SSO</span> - Token 기반 중앙 인증 체계</li>
                <li>• <span className="text-white font-semibold">Workspace 거버넌스</span> - 멀티 테넌트 관리</li>
                <li>• <span className="text-white font-semibold">MCP 통합 허브</span> - AI 도구 연동 자동화</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="glass p-8 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-7 h-7 text-yellow-500" />
            <h3 className="text-2xl font-bold text-white">경력 하이라이트</h3>
          </div>
          <div className="space-y-6 text-gray-300">
            <div className="border-l-4 border-green-500 pl-6 py-2">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingCart className="w-6 h-6 text-green-500" />
                <h4 className="text-green-400 font-bold text-lg">Okestro CMP - 서비스 카탈로그</h4>
              </div>
              <div className="space-y-2 font-medium">
                <p>• <span className="text-white font-semibold">클라우드 리소스 신청 워크플로우</span> 전체 설계 및 구현</p>
                <p>• <span className="text-primary-400">VM, Storage, Network</span> 등 인프라 카탈로그화 및 자동 배포</p>
                <p>• <span className="text-primary-400">승인 프로세스 엔진</span> 개발 - 다단계 결재 시스템 구축</p>
                <p>• <span className="text-primary-400">실시간 프로비저닝 상태</span> 추적 및 알림 기능 구현</p>
                <p>• <span className="text-orange-400">Vue 3 + TypeScript + Pinia</span> 기반 상태 관리</p>
                <p>• 📊 성과: <span className="text-green-400 font-bold">리소스 신청 시간 80% 단축</span> (48시간 → 8시간)</p>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6 py-2">
              <div className="flex items-center gap-2 mb-3">
                <Key className="w-6 h-6 text-yellow-500" />
                <h4 className="text-yellow-400 font-bold text-lg">Okestro CMP - Keycloak 인증 시스템</h4>
              </div>
              <div className="space-y-2 font-medium">
                <p>• <span className="text-white font-semibold">Keycloak</span> 기반 중앙 인증 서버 구축 및 프론트엔드 연동</p>
                <p>• <span className="text-primary-400">JWT Access/Refresh Token</span> 관리 로직 구현</p>
                <p>• <span className="text-primary-400">SSO (Single Sign-On)</span> 구현으로 UX 개선</p>
                <p>• <span className="text-primary-400">RBAC (Role-Based Access Control)</span> 권한 체계 설계</p>
                <p>• <span className="text-primary-400">Token Refresh</span> 자동화 및 보안 강화</p>
                <p>• <span className="text-orange-400">Axios Interceptor</span>로 인증 플로우 자동화</p>
                <p>• 📊 성과: <span className="text-green-400 font-bold">로그인 보안성 강화 + 사용자 편의성 200% 향상</span></p>
              </div>
            </div>

            <div className="border-l-4 border-primary-500 pl-6 py-2">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-6 h-6 text-primary-500" />
                <h4 className="text-primary-400 font-bold text-lg">AI 개발 도구 혁신 (MCP 프로토콜)</h4>
              </div>
              <div className="space-y-2 font-medium">
                <p>• <span className="text-white font-semibold">Cursor AI + MCP</span> 프로토콜 활용 개발 워크플로우 자동화</p>
                <p>• <span className="text-primary-400">Atlassian MCP 서버</span> - Jira 이슈 자동 생성 및 Confluence 문서 연동</p>
                <p>• <span className="text-primary-400">GitHub MCP 서버</span> - PR 생성, 코드 리뷰, 저장소 관리 자동화</p>
                <p>• <span className="text-primary-400">Notion MCP 서버</span> - 개발 문서 자동 동기화 및 검색</p>
                <p>• <span className="text-primary-400">Figma MCP 서버</span> - 디자인 시스템 자동 코드 변환</p>
                <p>• <span className="text-primary-400">Swagger MCP 서버</span> - API 명세 자동 분석 및 코드 생성</p>
                <p>• 📊 성과: <span className="text-green-400 font-bold">반복 작업 60% 감소, 개발 생산성 3배 향상</span></p>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h4 className="text-blue-400 font-bold text-lg mb-3">CJ 올리브네트웍스 - 스마트 HACCP</h4>
              <div className="space-y-2 font-medium">
                <p>• <span className="text-white font-semibold">인천화요 공장</span> 스마트 HACCP 인증마크 획득 기여 (2023)</p>
                <p>• <span className="text-primary-400">실시간 공정 모니터링</span> 대시보드 개발 (Vue.js + Chart.js)</p>
                <p>• <span className="text-primary-400">CCP (중요관리점)</span> 자동 기록 및 알람 시스템 구축</p>
                <p>• <span className="text-primary-400">HACCP 7원칙</span> 기반 위해요소 관리 시스템 설계</p>
                <p>• <span className="text-orange-400">Oracle DB</span> 연동 및 대용량 센서 데이터 처리</p>
                <p>• 📊 성과: <span className="text-green-400 font-bold">식품안전 관리 효율 90% 향상, 국가 인증 획득</span></p>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-6 py-2">
              <h4 className="text-purple-400 font-bold text-lg mb-3">농심엔지니어링 - 스마트팩토리 MES</h4>
              <div className="space-y-2 font-medium">
                <p className="text-white font-semibold">📌 정식품 공장 MES 구축 및 1·2차 고도화 (2021-2023)</p>
                <p>• <span className="text-primary-400">생산 계획 및 실적 관리</span> 시스템 개발</p>
                <p>• <span className="text-primary-400">설비 모니터링</span> 및 OEE (설비종합효율) 분석 대시보드</p>
                <p>• <span className="text-primary-400">품질 관리</span> 및 원자재 추적성 시스템 구축</p>
                <p>• <span className="text-primary-400">작업 지시서 디지털화</span> - 종이 없는 스마트 공장 실현</p>
                <p>• <span className="text-orange-400">Vue.js + Oracle + MySQL</span> 풀스택 개발</p>
                
                <p className="text-white font-semibold mt-4">📌 동원F&B 스마트팩토리 (2022-2023)</p>
                <p>• <span className="text-primary-400">IoT 센서 데이터</span> 실시간 수집 및 시각화</p>
                <p>• <span className="text-primary-400">공정 이상 감지</span> AI 알고리즘 프론트엔드 연동</p>
                <p>• <span className="text-primary-400">생산성 분석 리포트</span> 자동 생성 기능</p>
                <p>• <span className="text-orange-400">TypeScript + MS-SQL</span> 기반 개발</p>
                
                <p className="mt-2">• 📊 성과: <span className="text-green-400 font-bold">총 3개 공장 생산성 평균 25% 향상</span></p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
