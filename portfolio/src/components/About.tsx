import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Rocket, Users, Sparkles, Factory, Shield } from 'lucide-react';

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const features = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: '클린 코드',
      description: 'TypeScript와 모던 아키텍처로 유지보수 가능한 코드 작성',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: '성능 최적화',
      description: '빠른 로딩과 원활한 사용자 경험을 위한 최적화',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '협업',
      description: '팀 내 소통과 협업을 통한 효율적인 개발 프로세스',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: '지속적 학습',
      description: '최신 기술 트렌드 학습과 개선에 대한 열정',
    },
    {
      icon: <Factory className="w-8 h-8" />,
      title: '스마트팩토리',
      description: 'MES 시스템 및 공정 자동화 경험',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'HACCP 인증',
      description: '식품안전관리 시스템 구축 및 인증 획득 경험',
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
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            매일의 기록 = 성장의 증거<br />
            미래의 나와 동료들이 더 빠르게, 더 정확하게 일할 수 있도록 돕는 개발자
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
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass p-8 rounded-xl mb-8"
        >
          <h3 className="text-2xl font-bold mb-4 text-white">현재</h3>
          <div className="space-y-4 text-gray-300">
            <p>
              • <span className="text-primary-500 font-semibold">Okestro CMP</span>에서 프론트엔드 개발자로 근무 중
            </p>
            <p>
              • <span className="text-primary-500 font-semibold">NX Monorepo</span> 기반 대규모 프로젝트 아키텍처 설계 및 개발
            </p>
            <p>
              • <span className="text-primary-500 font-semibold">Feature-Sliced Design</span> 패턴을 통한 확장 가능한 코드베이스 구축
            </p>
            <p>
              • <span className="text-primary-500 font-semibold">MCP (Model Context Protocol)</span> 통합 허브 개발
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="glass p-8 rounded-xl"
        >
          <h3 className="text-2xl font-bold mb-4 text-white">경력 하이라이트</h3>
          <div className="space-y-4 text-gray-300">
            <div>
              <h4 className="text-primary-500 font-semibold mb-2">CJ 올리브네트웍스</h4>
              <p>• 인천화요 공장 <span className="text-primary-400">스마트 HACCP 인증마크</span> 획득 기여</p>
              <p>• 식품안전관리 시스템 개발 및 실시간 공정 모니터링</p>
            </div>
            <div>
              <h4 className="text-primary-500 font-semibold mb-2">농심엔지니어링</h4>
              <p>• <span className="text-primary-400">정식품 스마트팩토리 MES</span> 구축 및 1·2차 고도화</p>
              <p>• <span className="text-primary-400">동원F&B 스마트팩토리</span> 생산 공정 디지털화</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;