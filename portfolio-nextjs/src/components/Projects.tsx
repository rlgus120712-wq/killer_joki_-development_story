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
    <section id="projects" className="py-12 sm:py-20 px-4" ref={ref}>
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
              className="glass p-4 sm:p-6 md:p-8 rounded-xl hover:bg-white/10 transition-all"
              style={{
                // 모바일에서 강제로 표시되도록 보장
                minHeight: isMobile ? 'auto' : 'auto',
                display: 'block',
                visibility: 'visible'
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white pr-2">
                      {project.title}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-500 hover:text-primary-400 transition-colors flex-shrink-0"
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 text-xs sm:text-sm text-gray-400">
                    {project.company && (
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Building2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{project.company}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{project.role}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{project.period}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 text-sm sm:text-base">{project.description}</p>

                  <div className="mb-4">
                    <h4 className="text-primary-500 font-semibold mb-2 text-sm sm:text-base">
                      주요 성과:
                    </h4>
                    <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary-500 mr-2 flex-shrink-0">•</span>
                          <span className={
                            highlight.startsWith('📊 성과:')
                              ? 'text-green-400 font-bold'
                              : ''
                          }>
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 sm:px-3 sm:py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs sm:text-sm border border-primary-500/30"
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