'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '@/data/projects';
import { ExternalLink, Calendar, Briefcase, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 애니메이션 반응 속도 개선: threshold를 더 낮게 설정
  const { ref, inView } = useInView({
    threshold: 0.05, // 5%만 보여도 애니메이션 시작
    triggerOnce: true,
    rootMargin: '0px 0px -50px 0px', // 하단에서 50px 전에 미리 트리거
  });

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="projects" className="py-12 sm:py-20 px-3 sm:px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} // 애니메이션 속도 개선
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 gradient-text">
            Projects
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            주요 프로젝트 및 성과물
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {projects.map((project, index) => {
            const isExpanded = expandedItems.includes(index);
            
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }} // 지연 시간 단축
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
              >
                {/* 아코디언 헤더 - 클릭 가능한 영역 */}
                <div 
                  className="p-4 sm:p-6 cursor-pointer hover:bg-white/5 transition-colors duration-200"
                  onClick={() => toggleExpanded(index)}
                >
                  <div className="flex items-center justify-between">
                    {/* 왼쪽: 제목과 회사 정보 */}
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                          {project.title}
                        </h3>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-shrink-0 p-1.5 bg-primary-500/20 hover:bg-primary-500/30 rounded-md transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-primary-400" />
                          </a>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                        {project.company && (
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-primary-400" />
                            <span>{project.company}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4 text-primary-400" />
                          <span>{project.role}</span>
                        </div>
                      </div>
                    </div>

                    {/* 오른쪽: 기간과 펼치기 버튼 */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-sm text-gray-400">
                        <Calendar className="w-4 h-4 text-primary-400" />
                        <span className="whitespace-nowrap">{project.period}</span>
                      </div>
                      
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-primary-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-primary-400" />
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* 아코디언 콘텐츠 - 아래로 펼쳐지는 영역 */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden border-t border-white/10"
                    >
                      <div className="px-4 sm:px-6 py-4 sm:py-6">
                        {/* 프로젝트 설명 */}
                        <p className="text-gray-300 text-base sm:text-lg mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        {/* 주요 성과 */}
                        <div className="mb-4">
                          <h4 className="text-primary-400 font-semibold mb-3 text-base sm:text-lg">
                            주요 성과
                          </h4>
                          <div className="space-y-2">
                            {project.highlights.map((highlight, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <div className="flex-shrink-0 w-1.5 h-1.5 bg-primary-400 rounded-full mt-2"></div>
                                <p className={`text-sm sm:text-base leading-relaxed ${
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

                        {/* 기술 스택 */}
                        <div>
                          <h4 className="text-primary-400 font-semibold mb-3 text-base sm:text-lg">
                            기술 스택
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-primary-500/15 text-primary-300 rounded text-sm font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;