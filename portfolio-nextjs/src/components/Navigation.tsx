'use client'

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // 모바일에서 헤더 강제 고정
      if (navRef.current) {
        navRef.current.style.position = 'fixed';
        navRef.current.style.top = '0px';
        navRef.current.style.left = '0px';
        navRef.current.style.right = '0px';
        navRef.current.style.zIndex = '99999';
        navRef.current.style.transform = 'translateZ(0)';
        navRef.current.style.webkitTransform = 'translateZ(0)';
        navRef.current.style.display = 'block';
        navRef.current.style.visibility = 'visible';
        navRef.current.style.opacity = '1';
      }
    };

    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // 모바일일 때 추가 최적화
      if (mobile && navRef.current) {
        navRef.current.style.position = 'fixed';
        navRef.current.style.top = '0px';
        navRef.current.style.left = '0px';
        navRef.current.style.right = '0px';
        navRef.current.style.zIndex = '99999';
        navRef.current.style.transform = 'translateZ(0)';
        navRef.current.style.webkitTransform = 'translateZ(0)';
        navRef.current.style.webkitBackfaceVisibility = 'hidden';
        navRef.current.style.backfaceVisibility = 'hidden';
        navRef.current.style.willChange = 'transform';
        navRef.current.style.webkitPerspective = '1000px';
        navRef.current.style.perspective = '1000px';
        navRef.current.style.webkitTransformStyle = 'preserve-3d';
        navRef.current.style.transformStyle = 'preserve-3d';
        navRef.current.style.contain = 'layout style paint';
        navRef.current.style.display = 'block';
        navRef.current.style.visibility = 'visible';
        navRef.current.style.opacity = '1';
      }
    };

    // 테마 초기화
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.add('light');
    }

    // 초기 설정
    checkMobile();
    
    // 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
    
    // 모바일 브라우저 특화 이벤트
    window.addEventListener('touchstart', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    
    // 초기 실행
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
      window.removeEventListener('touchstart', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
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

  return (
    <>
      {/* 네비게이터 - JavaScript로 강제 고정 */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[99999] transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-900/95 backdrop-blur-md shadow-lg'
            : 'bg-gray-900/90 backdrop-blur-md'
        }`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          backgroundColor: isScrolled ? 'rgba(17, 24, 39, 0.95)' : 'rgba(17, 24, 39, 0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: isScrolled ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid rgba(31, 41, 55, 0.3)',
          display: 'block',
          visibility: 'visible',
          opacity: 1,
          width: '100%',
          height: '64px',
          // 모바일 브라우저 호환성을 위한 추가 스타일
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
          // iOS Safari 최적화
          WebkitPerspective: '1000px',
          perspective: '1000px',
          // Android Chrome 최적화
          WebkitTransformStyle: 'preserve-3d',
          transformStyle: 'preserve-3d',
          contain: 'layout style paint',
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
            <div
              className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800"
              style={{
                animation: 'slideDown 0.3s ease-out',
                position: 'relative',
                zIndex: 100000,
                // 모바일 메뉴도 고정 위치 보장
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderTop: '1px solid rgba(31, 41, 55, 0.3)',
              }}
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
            </div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer - 항상 공간 확보 */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;