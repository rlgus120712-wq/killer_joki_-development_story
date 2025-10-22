'use client'

import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 테마 초기화
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.add('light');
    }

    checkMobile();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // 모바일에서는 스크롤할 때만 헤더 표시, PC에서는 항상 표시
  const shouldShowHeader = isMobile ? isScrolled : true;

  return (
    <>
      {/* 네비게이터 - 모바일에서는 스크롤 시에만 표시 */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: shouldShowHeader ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-900/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: isScrolled ? 'rgba(17, 24, 39, 0.95)' : 'rgba(17, 24, 39, 0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: isScrolled ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : 'none',
          borderBottom: '1px solid rgba(31, 41, 55, 0.3)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#home')}
              className="text-xl font-bold gradient-text cursor-pointer"
            >
              Portfolio
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-300 hover:text-primary-500 transition-colors cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Theme Toggle Button - DESKTOP */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                aria-label="테마 전환"
                title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Theme Toggle Button - MOBILE */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                aria-label="테마 전환"
                title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-primary-500 transition-colors p-2"
                aria-label="메뉴 열기/닫기"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800"
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left text-gray-300 hover:text-primary-500 transition-colors py-2 cursor-pointer"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer - PC에서는 항상, 모바일에서는 스크롤 시에만 */}
      <div className={`h-16 ${isMobile ? (isScrolled ? 'block' : 'hidden') : 'block'}`} />
    </>
  );
};

export default Navigation;