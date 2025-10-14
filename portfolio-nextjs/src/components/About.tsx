'use client'

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Rocket, Users, Sparkles, Factory, Shield, Award, Building2, Briefcase, Boxes } from 'lucide-react';

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
      description: '8개 공장 MES 구축, 생산성 평균 30% 향상 기여',
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
            5년차 프론트엔드 개발자로, Vue 3와 React 생태계에서<br />
            엔터프라이즈급 웹 애플리케이션을 설계하고 구축합니다
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

        {/* 경력 하이라이트 - 회사별 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass p-8 rounded-xl mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-7 h-7 text-primary-500" />
            <h3 className="text-2xl font-bold text-white">경력 하이라이트</h3>
          </div>
          <div className="space-y-8 text-gray-300">
            {/* Okestro */}
            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-blue-500" />
                  <h4 className="text-white font-bold text-xl">Okestro</h4>
                </div>
                <span className="text-sm text-gray-400 font-semibold">2022.10 ~ 현재</span>
              </div>
              <p className="text-lg font-bold mb-3 text-blue-400">Frontend Developer - 클라우드 관리 플랫폼</p>
              <div className="space-y-2 font-medium">
                <p className="font-bold text-white">🎯 Cloud Management Platform (CMP) 개발</p>
                <p>• 멀티 클라우드 통합 관리 시스템 구축 (AWS, NCP, OpenStack, vSphere, NSX)</p>
                <p>• Kubernetes 클러스터 관리 및 컨테이너 오케스트레이션 UI 개발</p>
                <p>• 가상머신(VM) 생성/관리 워크플로우 설계 및 구현</p>
                
                <p className="font-bold text-white mt-3">📦 서비스 카탈로그 시스템</p>
                <p>• 클라우드 리소스 신청 포털 개발 (VM, Storage, Network)</p>
                <p>• Terraform 기반 Infrastructure as Code (IaC) 통합</p>
                <p>• YAML 템플릿을 활용한 Kubernetes 리소스 자동 배포</p>
                <p>• 승인 워크플로우 엔진 및 다단계 결재 시스템 구현</p>
                <p>• 실시간 프로비저닝 상태 추적 대시보드</p>
                
                <p className="font-bold text-white mt-3">🔐 인증 및 권한 관리</p>
                <p>• Keycloak 기반 SSO (Single Sign-On) 구현</p>
                <p>• JWT Token 인증 체계 및 RBAC (Role-Based Access Control)</p>
                <p>• 멀티 테넌트 Workspace 거버넌스 시스템</p>
                
                <p className="font-bold text-white mt-3">🏗️ 아키텍처 및 디자인 시스템</p>
                <p>• NX Monorepo 기반 대규모 프론트엔드 아키텍처 설계</p>
                <p>• Feature-Sliced Design (FSD) 패턴 적용</p>
                <p>• 300+ 재사용 가능 UI 컴포넌트 라이브러리 구축 (CmpXXX.vue)</p>
                <p>• Storybook 기반 디자인 시스템 문서화</p>
                
                <p className="font-bold text-white mt-3">🤖 AI 개발 도구 통합</p>
                <p>• MCP (Model Context Protocol) 통합 허브 개발</p>
                <p>• Atlassian (Jira/Confluence), GitHub, Notion, Figma API 연동</p>
                
                <p className="mt-3">• 📊 성과: <span className="text-green-400 font-bold">리소스 신청 시간 80% 단축, 개발 생산성 3배 향상</span></p>
                <p className="text-sm text-gray-400 mt-2">Vue 3, TypeScript, Pinia, TanStack Query, NX Monorepo, Terraform, Kubernetes, Docker</p>
              </div>
            </div>

            {/* 크로니즈시스템 */}
            <div className="border-l-4 border-green-500 pl-6 py-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-green-500" />
                  <h4 className="text-white font-bold text-xl">크로니즈시스템</h4>
                </div>
                <span className="text-sm text-gray-400 font-semibold">2020.01.13 ~ 2022.10</span>
              </div>
              <p className="text-lg font-bold mb-3 text-green-400">Frontend Developer - 스마트팩토리 MES</p>
              <div className="space-y-2 font-medium">
                <p className="font-bold text-white">🏭 스마트팩토리 MES 시스템 구축</p>
                <p>• 제조실행시스템(MES) 전체 프론트엔드 개발</p>
                <p>• 생산 계획, 작업 지시, 실적 수집 자동화 시스템</p>
                <p>• 실시간 설비 모니터링 및 OEE (설비종합효율) 분석</p>
                <p>• 품질 관리 및 원자재 추적성 시스템</p>
                
                <p className="font-bold text-white mt-3">🔗 ERP 연계 시스템</p>
                <p>• MES - ERP 실시간 데이터 연동 인터페이스 개발</p>
                <p>• 생산 실적 자동 전송 및 재고 관리 시스템</p>
                <p>• 원가 계산 및 경영 데이터 통합</p>
                
                <p className="font-bold text-white mt-3">📊 3D 모니터링 시스템</p>
                <p>• 3D 기반 실제 생산라인 시각화</p>
                <p>• 실시간 설비 상태 및 생산량 모니터링</p>
                <p>• 공정별 설비 위치 및 가동 현황 직관적 표시</p>
                
                <p className="font-bold text-white mt-3">📈 수율 관리 시스템</p>
                <p>• 공정별 수율 자동 계산 및 분석 대시보드</p>
                <p>• 불량률 추적 및 원인 분석 리포트</p>
                <p>• 품질 데이터 기반 개선 제안 시스템</p>
                
                <p className="font-bold text-white mt-3">📝 전자 일지 관리 시스템</p>
                <p>• 작업 일보/월보 자동 생성 및 전자 결재</p>
                <p>• 교대 인수인계 디지털화</p>
                <p>• 설비 점검 이력 및 정비 이력 관리</p>
                
                <p className="mt-3">• 📊 성과: <span className="text-green-400 font-bold">8개 공장 MES 구축, 평균 생산성 30% 향상</span></p>
                <p className="text-sm text-gray-400 mt-2">Vue.js, JavaScript, TypeScript, Oracle, MySQL, MS-SQL, Chart.js, 3D.js, SCADA</p>
              </div>
            </div>

            {/* 이너뷰 */}
            <div className="border-l-4 border-purple-500 pl-6 py-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-purple-500" />
                  <h4 className="text-white font-bold text-xl">이너뷰</h4>
                </div>
                <span className="text-sm text-gray-400 font-semibold">2019 ~ 2020</span>
              </div>
              <p className="text-lg font-bold mb-3 text-purple-400">Frontend Developer - 웹 서비스 개발</p>
              <div className="space-y-2 font-medium">
                <p>• 웹 애플리케이션 프론트엔드 개발</p>
                <p>• Vue.js 기반 SPA (Single Page Application) 구축</p>
                <p>• REST API 연동 및 상태 관리</p>
                <p>• 반응형 UI/UX 구현</p>
                
                <p className="text-sm text-gray-400 mt-2">Vue.js, JavaScript, HTML/CSS, REST API</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 프로젝트 성과물 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="glass p-8 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-7 h-7 text-yellow-500" />
            <h3 className="text-2xl font-bold text-white">프로젝트 성과물</h3>
          </div>
          <div className="space-y-6 text-gray-300">
            {/* CJ 올리브네트웍스 */}
            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h4 className="text-white font-bold text-lg mb-3">CJ 올리브네트웍스 - 스마트팩토리 MES (2022-2023)</h4>
              <div className="space-y-3 font-medium">
                <div>
                  <p className="font-bold text-blue-400">📌 컬티 MES 시스템 구축</p>
                  <p>• 발효 공정 특화 MES 시스템 설계 및 구현</p>
                  <p>• 실시간 발효 상태 모니터링 및 데이터 수집 자동화</p>
                  <p>• 품질 관리 및 배치(Batch) 추적 시스템 개발</p>
                </div>
                
                <div>
                  <p className="font-bold text-blue-400">📌 화요공장 MES 및 일지 관리 시스템</p>
                  <p>• 증류 공정 MES 시스템 구축 및 스마트 HACCP 인증 획득</p>
                  <p>• 전자 일지 시스템 개발 - 작업 일보/월보 자동 생성</p>
                  <p>• CCP (중요관리점) 자동 기록 및 알람 시스템</p>
                  <p>• 온도, 습도, pH 등 센서 데이터 실시간 수집 및 분석</p>
                </div>
                
                <div>
                  <p className="font-bold text-blue-400">📌 CJ ONE 스마트팩토리 시스템</p>
                  <p>• 통합 생산 관리 플랫폼 구축</p>
                  <p>• 3D 모니터링을 통한 실제 생산라인 시각화</p>
                  <p>• 실시간 생산량 및 OEE 분석 대시보드 제공</p>
                  <p>• 공정별 설비 상태 모니터링 및 예측 정비 시스템</p>
                </div>

                <p>• 📊 성과: <span className="text-green-400 font-bold">3개 공장 생산 효율 35% 향상, HACCP 인증 획득</span></p>
              </div>
            </div>

            {/* 농심엔지니어링 */}
            <div className="border-l-4 border-pink-500 pl-6 py-2">
              <h4 className="text-white font-bold text-lg mb-3">농심엔지니어링 - 스마트팩토리 MES (2021-2023)</h4>
              <div className="space-y-3 font-medium">
                <div>
                  <p className="font-bold text-pink-400">📌 정식품 공장 MES 1차 고도화 (2021-2022)</p>
                  <p>• 생산 계획 및 실적 관리 시스템 개선</p>
                  <p>• 실시간 설비 모니터링 및 OEE 분석 대시보드 개발</p>
                  <p>• 생산 공정별 작업 지시 및 실적 수집 자동화</p>
                </div>
                
                <div>
                  <p className="font-bold text-pink-400">📌 정식품 공장 MES 2차 고도화 (2022)</p>
                  <p>• 품질 관리 시스템 강화 및 원자재 추적성 구축</p>
                  <p>• 작업 지시서 완전 디지털화 - 종이 없는 스마트 공장</p>
                  <p>• AI 기반 설비 예측 정비 시스템 연동</p>
                </div>
                
                <div>
                  <p className="font-bold text-pink-400">📌 동원F&B 스마트팩토리 도입 (2022-2023)</p>
                  <p>• 생산 공정 디지털 트랜스포메이션 프로젝트</p>
                  <p>• IoT 센서 데이터 실시간 수집 및 시각화</p>
                  <p>• 공정 이상 감지 AI 알고리즘 프론트엔드 연동</p>
                  <p>• 3D 모니터링 기반 실시간 생산라인 가시화</p>
                </div>

                <div>
                  <p className="font-bold text-pink-400">📌 자연과사람들 스마트팩토리 도입 (2023)</p>
                  <p>• 친환경 식품 생산 공정 MES 시스템 구축</p>
                  <p>• 유기농 원료 추적성 및 인증 관리 시스템</p>
                  <p>• 생산성 분석 리포트 자동 생성 기능</p>
                </div>

                <div>
                  <p className="font-bold text-pink-400">📌 녹산 건면 공장 스마트팩토리 도입 (2023)</p>
                  <p>• 면류 제조 특화 MES 시스템 설계 및 구현</p>
                  <p>• 건조 공정 온습도 제어 시스템 개발</p>
                  <p>• 3D 공정 모니터링 및 생산량 실시간 추적</p>
                </div>

                <p>• 📊 성과: <span className="text-green-400 font-bold">총 5개 공장 생산성 평균 30% 향상</span></p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
