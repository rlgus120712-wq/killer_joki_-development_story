'use client'

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Github, MessageCircle } from 'lucide-react';

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
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Development Story',
      value: '기술 블로그',
      link: 'https://github.com/rlgus120712-wq/killer_joki_-development_story',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-black/30" ref={ref}>
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
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            협업이나 프로젝트 문의가 있으시면 언제든지 연락 주세요!<br />
            함께 멋진 무언가를 만들어가요 🚀
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.title}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-8 rounded-xl hover:bg-white/10 transition-all group text-center"
            >
              <div className="text-primary-500 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {contact.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {contact.title}
              </h3>
              <p className="text-gray-400 group-hover:text-primary-400 transition-colors">
                {contact.value}
              </p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-gray-400"
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