'use client'

import { motion } from 'framer-motion';
import { Github, Mail, ArrowDown } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden grid-background pt-16"
    >
      {/* Static background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-48 h-48 sm:w-72 sm:h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 sm:mb-10 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-1 sm:-inset-2 rounded-full bg-gradient-to-r from-primary-500 via-blue-500 to-purple-500 blur-lg opacity-75" />
              <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 sm:border-4 border-white/10 shadow-2xl">
                <Image
                  src="/profile.jpg"
                  alt="조기현 프로필"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="gradient-text">조기현</span>
          </motion.h1>

          <motion.h2
            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-3 sm:mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Frontend Developer
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            서비스를 생각하는 개발자 조기현 입니다.
          </motion.p>

          <motion.div
            className="flex justify-center space-x-4 sm:space-x-6 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="https://github.com/rlgus120712-wq"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-primary-500/20 transition-colors group w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center"
            >
              <Github className="w-6 h-6 sm:w-7 sm:h-7 group-hover:text-primary-500 transition-colors" />
            </a>
            <a
              href="mailto:rlgus120712@gmail.com"
              className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-primary-500/20 transition-colors group w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center"
            >
              <Mail className="w-6 h-6 sm:w-7 sm:h-7 group-hover:text-primary-500 transition-colors" />
            </a>
            <a
              href="https://rowan-cough-23f.notion.site/009caaa7bf3a49e6aff700714288b7db"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-primary-500/20 transition-colors group w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center"
              aria-label="Notion 문서"
            >
              <svg 
                className="w-6 h-6 sm:w-7 sm:h-7 group-hover:text-primary-500 transition-colors" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
              </svg>
            </a>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <button
              onClick={scrollToAbout}
              className="text-gray-400 hover:text-primary-500 transition-colors"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8" />
              </motion.div>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;