import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async () => {
  // PDF 생성 중 알림
  const loadingToast = document.createElement('div');
  loadingToast.innerHTML = '📄 PDF 생성 중... 잠시만 기다려주세요!';
  loadingToast.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(37, 99, 235, 0.95);
    color: white;
    padding: 20px 40px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    z-index: 10000;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  `;
  document.body.appendChild(loadingToast);

  try {
    // 1. PDF 모드 클래스 추가
    document.body.classList.add('pdf-generating');
    
    // 2. 스크롤을 맨 위로
    window.scrollTo(0, 0);
    
    // 3. 모든 섹션 가져오기
    const sections = document.querySelectorAll('section');
    
    // 4. 각 섹션을 순차적으로 스크롤하여 모든 콘텐츠 로드
    for (const section of sections) {
      section.scrollIntoView({ behavior: 'auto' });
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // 5. 다시 맨 위로
    window.scrollTo(0, 0);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 6. PDF 생성을 위한 컨테이너 생성
    const pdfContainer = document.createElement('div');
    pdfContainer.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      width: 1920px;
      background: ${window.getComputedStyle(document.body).backgroundColor};
      overflow: visible;
    `;
    
    // 7. body의 복사본 생성
    const bodyClone = document.body.cloneNode(true) as HTMLElement;
    
    // 8. 복사본에서 불필요한 요소 제거
    const nav = bodyClone.querySelector('nav');
    if (nav) nav.remove();
    
    const toast = bodyClone.querySelector('[style*="position: fixed"][style*="z-index: 10000"]');
    if (toast) toast.remove();
    
    // 9. 모든 애니메이션과 transition 제거
    const allElements = bodyClone.querySelectorAll('*');
    allElements.forEach((el) => {
      const element = el as HTMLElement;
      element.style.animation = 'none';
      element.style.transition = 'none';
      element.style.transform = 'none';
      element.style.opacity = '1';
      element.style.visibility = 'visible';
    });
    
    pdfContainer.appendChild(bodyClone);
    document.body.appendChild(pdfContainer);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 10. 고품질로 캡처
    const canvas = await html2canvas(pdfContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: window.getComputedStyle(document.body).backgroundColor,
      logging: false,
      width: 1920,
      height: pdfContainer.scrollHeight,
      windowWidth: 1920,
      windowHeight: pdfContainer.scrollHeight,
      onclone: (clonedDoc) => {
        const clonedBody = clonedDoc.body;
        clonedBody.style.margin = '0';
        clonedBody.style.padding = '0';
      }
    });

    // 11. 임시 컨테이너 제거
    document.body.removeChild(pdfContainer);
    document.body.classList.remove('pdf-generating');

    // 12. Canvas를 이미지로 변환
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    // 13. PDF 생성
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgHeight / imgWidth;
    
    const width = pdfWidth;
    const height = pdfWidth * ratio;
    
    let heightLeft = height;
    let position = 0;
    let pageCount = 1;

    // 첫 페이지
    pdf.addImage(imgData, 'JPEG', 0, position, width, height, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // 추가 페이지
    while (heightLeft > 0) {
      position = heightLeft - height;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, width, height, undefined, 'FAST');
      heightLeft -= pdfHeight;
      pageCount++;
    }

    // 14. 다운로드
    const today = new Date().toISOString().split('T')[0];
    pdf.save(`조기현_포트폴리오_${today}.pdf`);

    // 성공 알림
    loadingToast.innerHTML = `✅ PDF 다운로드 완료! (${pageCount}페이지)`;
    loadingToast.style.background = 'rgba(16, 185, 129, 0.95)';
    setTimeout(() => {
      if (document.body.contains(loadingToast)) {
        document.body.removeChild(loadingToast);
      }
    }, 2000);

  } catch (error) {
    console.error('PDF 생성 오류:', error);
    
    // 정리
    document.body.classList.remove('pdf-generating');
    const tempContainer = document.querySelector('[style*="left: -9999px"]');
    if (tempContainer) document.body.removeChild(tempContainer);
    
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
    loadingToast.innerHTML = `❌ PDF 생성 실패<br/><small style="font-size: 12px;">${errorMessage}</small>`;
    loadingToast.style.background = 'rgba(239, 68, 68, 0.95)';
    setTimeout(() => {
      if (document.body.contains(loadingToast)) {
        document.body.removeChild(loadingToast);
      }
    }, 5000);
  }
};
