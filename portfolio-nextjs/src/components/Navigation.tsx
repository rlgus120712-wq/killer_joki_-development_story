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
  const dynamicHeaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    const spacer = spacerRef.current;
    
    if (!nav) return;

    // 모바일 감지
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      return mobile;
    };

    // 동적 헤더 생성 함수
    const createDynamicHeader = () => {
      if (dynamicHeaderRef.current) {
        dynamicHeaderRef.current.remove();
      }

      const dynamicHeader = document.createElement('div');
      dynamicHeader.id = 'dynamic-mobile-header';
      dynamicHeader.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100vw !important;
        height: 64px !important;
        z-index: 99999 !important;
        background-color: ${isScrolled ? 'rgba(17, 24, 39, 0.95)' : 'rgba(17, 24, 39, 0.9)'} !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        box-shadow: ${isScrolled ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'} !important;
        border-bottom: 1px solid rgba(31, 41, 55, 0.3) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 0 1rem !important;
        transform: translate3d(0, 0, 0) !important;
        -webkit-transform: translate3d(0, 0, 0) !important;
        -webkit-backface-visibility: hidden !important;
        backface-visibility: hidden !important;
        will-change: transform !important;
        contain: layout style paint !important;
        isolation: isolate !important;
      `;

      // 헤더 내용 추가
      dynamicHeader.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 1rem;">
          <button onclick="document.querySelector('#home')?.scrollIntoView({behavior: 'smooth'})" style="font-size: 1.25rem; font-weight: bold; background: linear-gradient(to right, #3b82f6, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; cursor: pointer; border: none; background-color: transparent;">
            Portfolio
          </button>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <button onclick="toggleTheme()" style="padding: 0.5rem; border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;">
              ${isDark ? '☀️' : '🌙'}
            </button>
            <button onclick="toggleMobileMenu()" style="padding: 0.5rem; border: none; background-color: transparent; cursor: pointer; color: #e2e8f0;">
              ${isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      `;

      // body에 직접 추가
      document.body.appendChild(dynamicHeader);
      dynamicHeaderRef.current = dynamicHeader;

      // 전역 함수 정의
      (window as any).toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        
        if (newTheme) {
          document.documentElement.classList.remove('light');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.add('light');
          localStorage.setItem('theme', 'light');
        }
        
        // 동적 헤더 업데이트
        if (dynamicHeaderRef.current) {
          const button = dynamicHeaderRef.current.querySelector('button[onclick="toggleTheme()"]');
          if (button) {
            button.innerHTML = newTheme ? '☀️' : '🌙';
          }
        }
      };

      (window as any).toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        
        // 동적 헤더 업데이트
        if (dynamicHeaderRef.current) {
          const button = dynamicHeaderRef.current.querySelector('button[onclick="toggleMobileMenu()"]');
          if (button) {
            button.innerHTML = !isMobileMenuOpen ? '✕' : '☰';
          }
        }
      };
    };

    // 스크롤 핸들러
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // 모바일에서만 동적 헤더 사용
      if (checkMobile()) {
        createDynamicHeader();
      } else {
        // 데스크톱에서는 기존 헤더 사용
        if (dynamicHeaderRef.current) {
          dynamicHeaderRef.current.remove();
          dynamicHeaderRef.current = null;
        }
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
    handleScroll();

    // 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    window.addEventListener('orientationchange', handleScroll);
    window.addEventListener('touchstart', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('orientationchange', handleScroll);
      window.removeEventListener('touchstart', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      
      // 동적 헤더 정리
      if (dynamicHeaderRef.current) {
        dynamicHeaderRef.current.remove();
      }
    };
  }, [isScrolled, isDark, isMobileMenuOpen]);

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

  // 모바일에서는 동적 헤더를 사용하므로 기존 헤더 숨김
  if (isMobile) {
    return (
      <>
        {/* 모바일에서는 동적 헤더 사용, 기존 헤더 숨김 */}
        <nav
          ref={navRef}
          style={{ display: 'none' }}
        />
        <div ref={spacerRef} className="h-16" />
        
        {/* 모바일 메뉴 */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <div
              className="fixed top-16 left-0 right-0 z-[99998] bg-gray-900/95 backdrop-blur-md border-t border-gray-800"
              style={{
                animation: 'slideDown 0.3s ease-out',
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
      </>
    );
  }

  // 데스크톱에서는 기존 헤더 사용
  return (
    <>
      {/* 데스크톱 네비게이터 */}
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
          </div>
        </div>
      </nav>

      {/* Spacer - 항상 공간 확보 */}
      <div ref={spacerRef} className="h-16" />
    </>
  );
};

export default Navigation;