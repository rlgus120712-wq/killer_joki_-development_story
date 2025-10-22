'use client'

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

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