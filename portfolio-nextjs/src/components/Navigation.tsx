'use client'

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // 모바일 감지
    const isMobile = () => window.innerWidth < 768;

    // 모바일에서 헤더 강제 고정
    const forceMobileHeader = () => {
      if (!isMobile()) return;

      // 모든 가능한 방법으로 헤더 고정
      nav.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100vw !important;
        height: 64px !important;
        z-index: 99999 !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        transform: translate3d(0, 0, 0) !important;
        -webkit-transform: translate3d(0, 0, 0) !important;
        background-color: ${isScrolled ? 'rgba(17, 24, 39, 0.95)' : 'rgba(17, 24, 39, 0.9)'} !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        box-shadow: ${isScrolled ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'} !important;
        border-bottom: 1px solid rgba(31, 41, 55, 0.3) !important;
        -webkit-backface-visibility: hidden !important;
        backface-visibility: hidden !important;
        will-change: transform !important;
        contain: layout style paint !important;
        isolation: isolate !important;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
        -webkit-tap-highlight-color: transparent !important;
        -webkit-touch-callout: none !important;
        -webkit-user-select: none !important;
        user-select: none !important;
      `;
    };

    // 데스크톱에서는 기본 동작
    const resetDesktopHeader = () => {
      if (isMobile()) return;
      
      nav.style.cssText = `
        position: sticky !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        height: 64px !important;
        z-index: 99999 !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        background-color: ${isScrolled ? 'rgba(17, 24, 39, 0.95)' : 'rgba(17, 24, 39, 0.9)'} !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        box-shadow: ${isScrolled ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'} !important;
        border-bottom: 1px solid rgba(31, 41, 55, 0.3) !important;
      `;
    };

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      if (isMobile()) {
        forceMobileHeader();
      } else {
        resetDesktopHeader();
      }
    };

    // 리사이즈 이벤트 핸들러
    const handleResize = () => {
      if (isMobile()) {
        forceMobileHeader();
      } else {
        resetDesktopHeader();
      }
    };

    // 테마 초기화
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.add('light');
    }

    // 초기 실행
    handleScroll();

    // 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // 모바일 브라우저 특화 이벤트
    window.addEventListener('touchstart', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    window.addEventListener('touchend', handleScroll, { passive: true });

    // 주기적으로 헤더 위치 확인 (모바일에서만)
    const intervalId = setInterval(() => {
      if (isMobile()) {
        forceMobileHeader();
      }
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      window.removeEventListener('touchstart', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('touchend', handleScroll);
      clearInterval(intervalId);
    };
  }, [isScrolled]);

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
      <nav
        ref={navRef}
        className={`sticky top-0 z-[99999] transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-900/95 backdrop-blur-md shadow-lg'
            : 'bg-gray-900/90 backdrop-blur-md'
        }`}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 99999,
          backgroundColor: isScrolled ? 'rgba(17, 24, 39, 0.95)' : 'rgba(17, 24, 39, 0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: isScrolled ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid rgba(31, 41, 55, 0.3)',
          width: '100%',
          height: '64px',
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

      {/* 모바일에서만 Spacer 추가 */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default Navigation;