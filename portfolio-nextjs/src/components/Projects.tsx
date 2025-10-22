'use client'

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '@/data/projects';
import { ExternalLink, Calendar, Briefcase, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // 모바일에서는 애니메이션을 단순화
  const animationProps = isMobile ? {
    initial: { opacity: 0 },
    animate: inView ? { opacity: 1 } : {},
    transition: { duration: 0.3 }
  } : {
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6 }
  };

  const projectAnimationProps = isMobile ? {
    initial: { opacity: 0 },
    animate: inView ? { opacity: 1 } : {},
    transition: { duration: 0.3 }
  } : {
    initial: { opacity: 0, y: 50 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay: 0.2 }
  };

  return (
    <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          {...animationProps}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Projects
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            주요 프로젝트 및 성과물
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              {...projectAnimationProps}
              className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden hover:from-white/10 hover:to-white/15 transition-all duration-300"
              style={{
                minHeight: isMobile ? 'auto' : 'auto',
                display: 'block',
                visibility: 'visible'
              }}
            >
              <div className="p-4 sm:p-6 md:p-8">
                {/* 프로젝트 제목과 링크 */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight flex-1 pr-3">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 p-2 bg-primary-500/20 hover:bg-primary-500/30 rounded-lg transition-colors group"
                    >
                      <ExternalLink className="w-4 h-4 text-primary-400 group-hover:text-primary-300 transition-colors" />
                    </a>
                  )}
                </div>

                {/* 프로젝트 메타데이터 - 한 줄로 정리 */}
                <div className="mb-4">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                    {project.company && (
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-primary-400" />
                        <span className="whitespace-nowrap">{project.company}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-primary-400" />
                      <span className="whitespace-nowrap">{project.role}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-primary-400" />
                      <span className="whitespace-nowrap">{project.period}</span>
                    </div>
                  </div>
                </div>

                {/* 프로젝트 설명 */}
                <div className="mb-4">
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* 주요 성과 섹션 */}
                <div className="mb-4">
                  <h4 className="text-primary-400 font-semibold mb-3 text-sm sm:text-base">
                    주요 성과
                  </h4>
                  <div className="space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-1.5 h-1.5 bg-primary-400 rounded-full mt-2"></div>
                        <p className={`text-xs sm:text-sm leading-relaxed ${
                          highlight.startsWith('📊 성과:')
                            ? 'text-green-400 font-semibold'
                            : 'text-gray-300'
                        }`}>
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 기술 스택 - 작은 태그로 변경 */}
                <div>
                  <h4 className="text-primary-400 font-semibold mb-3 text-sm sm:text-base">
                    기술 스택
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded-md text-xs font-medium border border-primary-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;