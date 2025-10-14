'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { portfolioTechStack } from '../data/portfolioTech';

export default function TechStack() {
  return (
    <section id="tech-stack" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Portfolio Tech Stack</h2>
          <p className="section-subtitle">
            이 포트폴리오 웹사이트 구축에 사용된 기술들
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioTechStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-xl hover:scale-105 transition-transform"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <tech.icon className="w-8 h-8 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{tech.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{tech.description}</p>
                    {tech.features && (
                      <ul className="space-y-1">
                        {tech.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-gray-500">
                            <CheckCircle2 className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 glass p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why These Technologies?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-primary-400">⚡ 성능 최적화</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Next.js App Router로 Server-Side Rendering</li>
                  <li>• 이미지 자동 최적화 및 Lazy Loading</li>
                  <li>• 코드 스플리팅으로 초기 로딩 속도 개선</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary-400">🔍 SEO 최적화</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• 메타데이터 자동 생성</li>
                  <li>• 검색 엔진 크롤링 최적화</li>
                  <li>• Open Graph & Twitter Card 지원</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary-400">🚀 자동 배포</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Vercel을 통한 CI/CD 자동화</li>
                  <li>• Git Push 즉시 프로덕션 배포</li>
                  <li>• Edge Network로 글로벌 성능</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary-400">🎨 현대적 UI</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Tailwind CSS로 빠른 스타일링</li>
                  <li>• Framer Motion 애니메이션</li>
                  <li>• 반응형 디자인 & 다크모드</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <a
                href="https://github.com/rlgus120712-wq/killer_joki_-development_story/tree/main/portfolio-nextjs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                소스 코드 보기
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
