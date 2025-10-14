import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async () => {
  const showToast = (message: string, isError = false) => {
    const toast = document.createElement('div');
    toast.innerHTML = message;
    toast.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${isError ? 'rgba(239, 68, 68, 0.95)' : 'rgba(37, 99, 235, 0.95)'};
      color: white;
      padding: 20px 40px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      z-index: 10000;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    `;
    document.body.appendChild(toast);
    return toast;
  };

  const toast = showToast('📄 PDF 생성 중...');

  try {
    // 1. 페이지 맨 위로 스크롤
    window.scrollTo({ top: 0, behavior: 'instant' } as any);
    
    // 2. 모든 섹션 순차적으로 스크롤하여 콘텐츠 로드
    const sections = Array.from(document.querySelectorAll('section'));
    for (let i = 0; i < sections.length; i++) {
      sections[i].scrollIntoView({ behavior: 'instant' } as any);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // 3. 다시 맨 위로
    window.scrollTo({ top: 0, behavior: 'instant' } as any);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 4. 네비게이션 임시 숨김
    const nav = document.querySelector('nav') as HTMLElement;
    const navDisplay = nav?.style.display || '';
    if (nav) nav.style.display = 'none';

    // 5. 모든 요소 강제 표시
    const style = document.createElement('style');
    style.id = 'pdf-temp-style';
    style.innerHTML = `
      * {
        animation: none !important;
        transition: none !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
    `;
    document.head.appendChild(style);

    await new Promise(resolve => setTimeout(resolve, 1000));

    // 6. 캡처할 요소 (body 전체)
    const element = document.body;
    
    // 7. html2canvas로 캡처
    toast.innerHTML = '📸 페이지 캡처 중...';
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: window.getComputedStyle(document.body).backgroundColor,
      logging: false,
      width: window.innerWidth,
      height: element.scrollHeight,
      windowWidth: window.innerWidth,
      windowHeight: element.scrollHeight,
      x: 0,
      y: 0,
    });

    // 8. 스타일 복원
    document.head.removeChild(style);
    if (nav) nav.style.display = navDisplay;

    // 9. PDF 생성
    toast.innerHTML = '📄 PDF 생성 중...';
    
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgHeight / imgWidth;
    
    const contentWidth = pdfWidth;
    const contentHeight = contentWidth * ratio;
    
    let yPosition = 0;
    let pageCount = 1;

    // 첫 페이지
    pdf.addImage(
      imgData,
      'JPEG',
      0,
      yPosition,
      contentWidth,
      contentHeight,
      undefined,
      'FAST'
    );

    // 추가 페이지 계산
    let remainingHeight = contentHeight - pdfHeight;
    while (remainingHeight > 0) {
      pdf.addPage();
      yPosition = -(pageCount * pdfHeight);
      pdf.addImage(
        imgData,
        'JPEG',
        0,
        yPosition,
        contentWidth,
        contentHeight,
        undefined,
        'FAST'
      );
      remainingHeight -= pdfHeight;
      pageCount++;
    }

    // 10. 다운로드
    const today = new Date().toISOString().split('T')[0];
    pdf.save(`조기현_포트폴리오_${today}.pdf`);

    // 성공 메시지
    toast.innerHTML = `✅ PDF 다운로드 완료! (${pageCount}페이지)`;
    toast.style.background = 'rgba(16, 185, 129, 0.95)';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 2000);

  } catch (error) {
    console.error('PDF 생성 오류:', error);
    
    // 정리
    const tempStyle = document.getElementById('pdf-temp-style');
    if (tempStyle) tempStyle.remove();
    
    const nav = document.querySelector('nav') as HTMLElement;
    if (nav && nav.style.display === 'none') {
      nav.style.display = '';
    }
    
    const errorMsg = error instanceof Error ? error.message : '알 수 없는 오류';
    toast.innerHTML = `❌ PDF 생성 실패<br/><small style="font-size:12px;">${errorMsg}</small>`;
    toast.style.background = 'rgba(239, 68, 68, 0.95)';
    
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 5000);
  }
};
