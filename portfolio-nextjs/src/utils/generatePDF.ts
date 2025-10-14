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
    // 1. 네비게이션 바 임시 숨기기
    const nav = document.querySelector('nav');
    const originalNavDisplay = nav ? (nav as HTMLElement).style.display : '';
    if (nav) {
      (nav as HTMLElement).style.display = 'none';
    }

    // 2. 스크롤을 맨 위로
    window.scrollTo(0, 0);

    // 3. 모든 섹션을 강제로 보이게 만들기 (애니메이션 무시)
    const allElements = document.querySelectorAll('*');
    const originalStyles: Array<{ element: HTMLElement; opacity: string; transform: string; visibility: string }> = [];
    
    allElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const computedStyle = window.getComputedStyle(htmlElement);
      
      // 원래 스타일 저장
      originalStyles.push({
        element: htmlElement,
        opacity: htmlElement.style.opacity || '',
        transform: htmlElement.style.transform || '',
        visibility: htmlElement.style.visibility || '',
      });
      
      // 모든 요소를 강제로 표시
      if (computedStyle.opacity === '0' || htmlElement.style.opacity === '0') {
        htmlElement.style.opacity = '1';
      }
      if (computedStyle.visibility === 'hidden') {
        htmlElement.style.visibility = 'visible';
      }
      // transform 초기화 (translateY 등 제거)
      if (computedStyle.transform !== 'none') {
        htmlElement.style.transform = 'none';
      }
    });

    // 4. 짧은 대기 시간 (렌더링 완료 대기)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 5. 전체 페이지 높이로 스크롤하여 모든 콘텐츠 로드
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    // 6. html2canvas로 캡처
    const element = document.body;
    const canvas = await html2canvas(element, {
      scale: 2, // 고해상도
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      width: element.scrollWidth,
      height: documentHeight,
      windowWidth: 1920,
      windowHeight: documentHeight,
      scrollY: -window.scrollY,
      scrollX: -window.scrollX,
    });

    // 7. 원래 스타일 복원
    originalStyles.forEach(({ element, opacity, transform, visibility }) => {
      if (opacity !== undefined) element.style.opacity = opacity;
      if (transform !== undefined) element.style.transform = transform;
      if (visibility !== undefined) element.style.visibility = visibility;
    });

    // 8. 네비게이션 바 복원
    if (nav) {
      (nav as HTMLElement).style.display = originalNavDisplay;
    }

    // 9. Canvas를 이미지로 변환
    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // 10. PDF 생성 (A4 크기)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // A4 크기 계산
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // 이미지 비율 계산
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;

    // PDF에 맞게 크기 조정
    const width = pdfWidth;
    const height = pdfWidth / ratio;

    // 여러 페이지로 나누기
    let heightLeft = height;
    let position = 0;
    let page = 1;

    // 첫 페이지 추가
    pdf.addImage(imgData, 'PNG', 0, position, width, height, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // 추가 페이지가 필요한 경우
    while (heightLeft > 0) {
      position = heightLeft - height;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, width, height, undefined, 'FAST');
      heightLeft -= pdfHeight;
      page++;
    }

    // PDF 다운로드
    const fileName = `조기현_포트폴리오_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

    // 성공 알림
    loadingToast.innerHTML = `✅ PDF 다운로드 완료! (${page}페이지)`;
    loadingToast.style.background = 'rgba(16, 185, 129, 0.95)';
    setTimeout(() => {
      if (document.body.contains(loadingToast)) {
        document.body.removeChild(loadingToast);
      }
    }, 2000);

  } catch (error) {
    console.error('PDF 생성 오류:', error);
    
    // 에러 상세 정보 표시
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
