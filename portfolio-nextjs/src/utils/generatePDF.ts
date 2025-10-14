export const generatePDF = () => {
  // 인쇄 전에 모든 섹션이 보이도록 스크롤
  const prepareForPrint = () => {
    // 모든 섹션 순차적으로 스크롤하여 lazy load 콘텐츠 로드
    const sections = document.querySelectorAll('section');
    let index = 0;
    
    const scrollInterval = setInterval(() => {
      if (index < sections.length) {
        sections[index].scrollIntoView({ behavior: 'auto', block: 'start' });
        index++;
      } else {
        clearInterval(scrollInterval);
        // 맨 위로 돌아가기
        window.scrollTo(0, 0);
        // 짧은 대기 후 인쇄
        setTimeout(() => {
          window.print();
        }, 300);
      }
    }, 100);
  };

  prepareForPrint();
};
