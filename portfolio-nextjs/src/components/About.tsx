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
      icon: <Code2 className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: '클린 코드',
      description: 'TypeScript와 Feature-Sliced Design으로 유지보수성 99% 향상',
    },
    {
      icon: <Rocket className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: '성능 최적화',
      description: 'Vite + TanStack Query로 초기 로딩 속도 40% 개선',
    },
    {
      icon: <Users className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: '협업',
      description: 'Jira + Confluence + GitHub으로 10인+ 팀 효율 증대',
    },
    {
      icon: <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: '지속적 학습',
      description: '매일 기술 블로그 작성 및 최신 트렌드 습득',
    },
    {
      icon: <Factory className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: '스마트팩토리',
      description: '8개 공장 MES 구축, 생산성 평균 30% 향상 기여',
    },
    {
      icon: <Shield className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: 'HACCP 인증',
      description: '식품안전관리 시스템으로 국가 인증마크 획득',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 pt-20" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* About Me 섹션 - Skills와 동일한 형태로 변경 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            About Me
          </h2>
          <p className="text-gray-400 text-lg">
            매일의 기록 = 성장의 증거
          </p>
        </motion.div>

        {/* 스킬 카드들 - 배경 유지 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:from-white/10 hover:to-white/15 transition-all duration-300 group"
            >
              <div className="text-primary-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 경력 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary-500/20 rounded-xl">
                <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-primary-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">경력</h3>
            </div>
            
            <div className="space-y-8">
              {/* Okestro */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-400 rounded-full"></div>
                <div className="pl-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-white">Okestro</h4>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-300 font-medium bg-gradient-to-r from-blue-500/20 to-blue-600/20 px-3 py-1 rounded-full border border-blue-500/30">
                      2023.01 ~ 현재
                    </span>
                  </div>
                  <p className="text-gray-300 mb-3 text-sm sm:text-base font-medium">Frontend Developer</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    멀티 클라우드 관리 플랫폼 개발 • 서비스 카탈로그 • Keycloak SSO • NX Monorepo • FSD 패턴 • MCP 생성형 AI (Cursor, Windsurf)
                  </p>
                </div>
              </div>

              {/* 크로니즈시스템 */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-green-400 rounded-full"></div>
                <div className="pl-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-white">크로니즈시스템</h4>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-300 font-medium bg-gradient-to-r from-green-500/20 to-green-600/20 px-3 py-1 rounded-full border border-green-500/30">
                      2020.01 ~ 2022.10
                    </span>
                  </div>
                  <p className="text-gray-300 mb-3 text-sm sm:text-base font-medium">Frontend Developer</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    스마트팩토리 MES • ERP 연계 • 3D 모니터링 • 수율/일지 관리 • 8개 공장 구축
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;