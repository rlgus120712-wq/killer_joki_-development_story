'use client'

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Github } from 'lucide-react';

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const contacts = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email',
      value: 'rlgus120712@gmail.com',
      link: 'mailto:rlgus120712@gmail.com',
    },
    {
      icon: <Github className="w-8 h-8" />,
      title: 'GitHub',
      value: 'rlgus120712-wq',
      link: 'https://github.com/rlgus120712-wq',
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z"
            fill="currentColor"
          />
          <path
            d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z"
            fill="white"
          />
        </svg>
      ),
      title: 'Notion',
      value: 'MCP 관련 Notion 문서',
      link: 'https://rowan-cough-23f.notion.site/009caaa7bf3a49e6aff700714288b7db',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 section-bg-even" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Get In Touch
          </h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            협업이나 프로젝트 문의가 있으시면 언제든지 연락 주세요!<br />
            함께 멋진 무언가를 만들어가요 🚀
          </p>
        </motion.div>

        {/* 카드들을 완벽한 중앙 정렬로 배치 */}
        <div className="flex flex-col items-center justify-center space-y-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-y-0 md:justify-items-center mb-16">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.title}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl glass hover:border-primary-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/20 w-full max-w-sm md:max-w-none hover:scale-105"
            >
              <div className="p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
                {/* 아이콘 - 완벽한 중앙 정렬 */}
                <div className="flex items-center justify-center mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/20 group-hover:from-primary-500/30 group-hover:to-primary-600/30 transition-all duration-300">
                    <div className="text-primary-400 group-hover:text-primary-300 transition-colors">
                      {contact.icon}
                    </div>
                  </div>
                </div>
                
                {/* 제목 - 완벽한 중앙 정렬 */}
                <h3 className="text-xl font-bold mb-3 text-white text-center">
                  {contact.title}
                </h3>
                
                {/* 내용 - 완벽한 중앙 정렬 */}
                <p className="text-gray-100 group-hover:text-white transition-colors break-words leading-relaxed text-center">
                  {contact.value}
                </p>
              </div>
              
              {/* 호버 효과 - 라이트/다크 모드 모두에서 자연스럽게 */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-gray-200"
        >
          <p className="mb-2">
            © 2025 조기현. All rights reserved.
          </p>
          <p className="text-sm">
            Made with <span className="text-red-500">❤️</span> using Next.js 14,
            TypeScript, Tailwind CSS & Framer Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;