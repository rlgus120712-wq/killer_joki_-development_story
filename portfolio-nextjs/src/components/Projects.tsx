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

  return (
    <section id="projects" className="py-12 sm:py-20 px-3 sm:px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 gradient-text">
            Projects
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            주요 프로젝트 및 성과물
          </p>
        </motion.div>

        <div className="space-y-4 sm:space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <div className="p-5 sm:p-6">
                {/* 프로젝트 헤더 */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight flex-1 pr-2">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 p-2 bg-primary-500/20 hover:bg-primary-500/30 rounded-md transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-primary-400" />
                    </a>
                  )}
                </div>

                {/* 메타데이터 - 한 줄로 압축 */}
                <div className="flex flex-wrap items-center gap-3 mb-4 text-sm sm:text-base text-gray-400">
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
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary-400" />
                    <span>{project.period}</span>
                  </div>
                </div>

                {/* 프로젝트 설명 */}
                <p className="text-gray-300 text-base sm:text-lg mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* 주요 성과 - 컴팩트하게 */}
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

                {/* 기술 스택 - 인라인으로 변경 */}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;