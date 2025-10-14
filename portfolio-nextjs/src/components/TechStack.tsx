'use client'

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { portfolioTechStack } from '@/data/portfolioTech';
import { Code2 } from 'lucide-react';

const TechStack = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const categoryColors = {
    core: 'from-blue-500 to-cyan-500',
    styling: 'from-purple-500 to-pink-500',
    animation: 'from-yellow-500 to-orange-500',
    deployment: 'from-green-500 to-emerald-500',
    tooling: 'from-red-500 to-rose-500',
  };

  const categoryNames = {
    core: '핵심 프레임워크',
    styling: '스타일링',
    animation: '애니메이션',
    deployment: '배포',
    tooling: '개발 도구',
  };

  return (
    <section id="tech-stack" className="py-20 px-4 bg-black/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="w-12 h-12 text-primary-500" />
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              Portfolio Tech Stack
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            이 포트폴리오는 다음의 최신 기술들로 제작되었습니다<br />
            <span className="text-primary-400 font-semibold">
              Next.js 14 + React 18 + TypeScript 5 + Tailwind CSS 3 + Framer Motion 11
            </span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioTechStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="glass p-6 rounded-xl hover:bg-white/10 transition-all h-full">
                {/* Gradient Border Effect */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${
                    categoryColors[tech.category]
                  } opacity-0 group-hover:opacity-20 transition-opacity blur-xl`}
                />

                {/* Content */}
                <div className="relative">
                  <div className="text-4xl mb-3">{tech.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    {tech.description}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${
                      categoryColors[tech.category]
                    } text-white`}
                  >
                    {categoryNames[tech.category]}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why These Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 glass p-8 rounded-xl"
        >
          <h3 className="text-2xl font-bold mb-6 text-white text-center">
            왜 이 기술들을 선택했나요?
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-semibold text-primary-400 mb-1">
                    성능 최적화
                  </h4>
                  <p className="text-sm">
                    Next.js의 Static Site Generation과 Image Optimization으로
                    빠른 로딩 속도를 실현했습니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎨</span>
                <div>
                  <h4 className="font-semibold text-primary-400 mb-1">
                    모던한 디자인
                  </h4>
                  <p className="text-sm">
                    Tailwind CSS와 Framer Motion으로 아름답고 인터랙티브한
                    UI/UX를 구현했습니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔍</span>
                <div>
                  <h4 className="font-semibold text-primary-400 mb-1">
                    SEO 최적화
                  </h4>
                  <p className="text-sm">
                    Next.js의 메타데이터 API와 서버 사이드 렌더링으로 검색
                    엔진 최적화를 달성했습니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <h4 className="font-semibold text-primary-400 mb-1">
                    자동화된 배포
                  </h4>
                  <p className="text-sm">
                    Vercel의 Git 통합으로 푸시만 하면 자동으로 배포되는
                    워크플로우를 구축했습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* GitHub Repository Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 text-center"
        >
          <a
            href="https://github.com/rlgus120712-wq/killer_joki_-development_story"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all group"
          >
            <Code2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>소스 코드 보기</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
