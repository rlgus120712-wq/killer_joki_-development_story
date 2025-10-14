'use client'

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Rocket, Users, Sparkles, Factory, Shield, Briefcase, Building2 } from 'lucide-react';

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass p-8 rounded-xl mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-7 h-7 text-primary-500" />
            <h3 className="text-2xl font-bold text-white">경력</h3>
          </div>
          
          <div className="space-y-8">
            <div className="border-l-4 border-blue-500 pl-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-500" />
                  <h4 className="text-xl font-bold text-white">Okestro</h4>
                </div>
                <span className="text-sm text-gray-400">2023.01 ~ 현재</span>
              </div>
              <p className="text-gray-300 mb-2">Frontend Developer</p>
              <p className="text-gray-400 text-sm">
                멀티 클라우드 관리 플랫폼 개발 • 서비스 카탈로그 • Keycloak SSO • NX Monorepo • FSD 패턴 • MCP 생성형 AI (Cursor, Windsurf)
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-green-500" />
                  <h4 className="text-xl font-bold text-white">크로니즈시스템</h4>
                </div>
                <span className="text-sm text-gray-400">2020.01 ~ 2022.10</span>
              </div>
              <p className="text-gray-300 mb-2">Frontend Developer</p>
              <p className="text-gray-400 text-sm">
                스마트팩토리 MES • ERP 연계 • 3D 모니터링 • 수율/일지 관리 • 8개 공장 구축
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-500" />
                  <h4 className="text-xl font-bold text-white">이너뷰</h4>
                </div>
                <span className="text-sm text-gray-400">2019 ~ 2020</span>
              </div>
              <p className="text-gray-300 mb-2">Frontend Developer</p>
              <p className="text-gray-400 text-sm">
                웹 애플리케이션 개발 • Vue.js SPA 구축
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
