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
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const spacer = spacerRef.current;
    
    if (!nav || !spacer) return;

    // 모바일 감지
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      return mobile;
    };

    // 헤더 강제 고정 함수
    const forceHeaderFixed = () => {
      if (!nav) return;
      
      // 모든 가능한 방법으로 헤더 고정
      nav.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
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
        -webkit-perspective: 1000px !important;
        perspective: 1000px !important;
        -webkit-transform-style: preserve-3d !important;
        transform-style: preserve-3d !important;
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

    // 스크롤 핸들러
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // 모바일에서 강제 고정
      if (checkMobile()) {
        forceHeaderFixed();
        
        // 추가로 DOM에서 직접 조작
        if (nav) {
          nav.setAttribute('style', nav.style.cssText);
          nav.classList.add('mobile-fixed-header');
        }
      }
    };

    // Intersection Observer로 헤더 감시
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && checkMobile()) {
            forceHeaderFixed();
          }
        });
      },
      { threshold: 0 }
    );

    // 테마 초기화
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.add('light');
    }

    // 초기 설정
    checkMobile();
    forceHeaderFixed();

    // 헤더 요소 관찰 시작
    observer.observe(nav);

    // 모든 가능한 이벤트에 리스너 추가
    const events = [
      'scroll', 'resize', 'orientationchange', 'touchstart', 
      'touchmove', 'touchend', 'load', 'DOMContentLoaded'
    ];

    events.forEach(event => {
      window.addEventListener(event, handleScroll, { passive: true });
    });

    // 주기적으로 헤더 위치 확인 (모바일에서만)
    const intervalId = setInterval(() => {
      if (checkMobile()) {
        forceHeaderFixed();
      }
    }, 100);

    return () => {
      observer.disconnect();
      events.forEach(event => {
        window.removeEventListener(event, handleScroll);
      });
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
      {/* 네비게이터 - 모든 방법으로 강제 고정 */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[99999] transition-all duration-300 mobile-fixed-header ${
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
          transform: 'translate3d(0, 0, 0)',
          WebkitTransform: 'translate3d(0, 0, 0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
          WebkitPerspective: '1000px',
          perspective: '1000px',
          WebkitTransformStyle: 'preserve-3d',
          transformStyle: 'preserve-3d',
          contain: 'layout style paint',
          isolation: 'isolate',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
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

      {/* Spacer - 항상 공간 확보 */}
      <div ref={spacerRef} className="h-16" />
    </>
  );
};

export default Navigation;