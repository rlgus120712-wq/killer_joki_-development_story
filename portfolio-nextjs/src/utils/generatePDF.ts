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
    // 전체 페이지 요소 가져오기
    const element = document.body;

    // 스크롤을 맨 위로
    window.scrollTo(0, 0);

    // 네비게이션 바 임시 숨기기
    const nav = document.querySelector('nav');
    const originalNavDisplay = nav ? (nav as HTMLElement).style.display : '';
    if (nav) {
      (nav as HTMLElement).style.display = 'none';
    }

    // 짧은 대기 시간 (렌더링 완료 대기)
    await new Promise(resolve => setTimeout(resolve, 500));

    // html2canvas로 캡처
    const canvas = await html2canvas(element, {
      scale: 2, // 고해상도
      useCORS: true, // 외부 이미지 허용
      allowTaint: true,
      backgroundColor: null, // 배경색 유지
      logging: false,
      windowWidth: 1920, // 데스크톱 너비
      windowHeight: element.scrollHeight,
    });

    // 네비게이션 바 복원
    if (nav) {
      (nav as HTMLElement).style.display = originalNavDisplay;
    }

    // Canvas를 이미지로 변환
    const imgData = canvas.toDataURL('image/png');
    
    // PDF 생성 (A4 크기)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // A4 크기 계산
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // 이미지 비율 계산
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;

    // PDF에 맞게 크기 조정
    let width = pdfWidth;
    let height = pdfWidth / ratio;

    // 여러 페이지로 나누기
    let heightLeft = height;
    let position = 0;

    // 첫 페이지 추가
    pdf.addImage(imgData, 'PNG', 0, position, width, height);
    heightLeft -= pdfHeight;

    // 추가 페이지가 필요한 경우
    while (heightLeft > 0) {
      position = heightLeft - height;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, width, height);
      heightLeft -= pdfHeight;
    }

    // PDF 다운로드
    pdf.save('조기현_포트폴리오.pdf');

    // 성공 알림
    loadingToast.innerHTML = '✅ PDF 다운로드 완료!';
    loadingToast.style.background = 'rgba(16, 185, 129, 0.95)';
    setTimeout(() => {
      document.body.removeChild(loadingToast);
    }, 2000);

  } catch (error) {
    console.error('PDF 생성 오류:', error);
    loadingToast.innerHTML = '❌ PDF 생성 실패. 다시 시도해주세요.';
    loadingToast.style.background = 'rgba(239, 68, 68, 0.95)';
    setTimeout(() => {
      document.body.removeChild(loadingToast);
    }, 3000);
  }
};
