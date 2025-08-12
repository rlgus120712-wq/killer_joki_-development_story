<template>
  <div v-if="warningModal.show" class="modal-overlay" @click.self="warningModal.hideModal()">
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-icon">
          <i class="mdi mdi-alert-circle-outline"></i>
        </div>
        <h3 class="modal-title">{{ warningModal.title }}</h3>
        <p class="modal-message">{{ warningModal.message }}</p>

        <div class="button-group">
          <button
            class="request-btn"
            @click="handleRequest"
          >
            신청하기
          </button>
          <button
            class="confirm-btn"
            @click="warningModal.hideModal()"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWarningModalStore } from '../stores/warningModal';
import { useRouter } from 'vue-router';

const router = useRouter();
const warningModal = useWarningModalStore();

const handleRequest = () => {
  // vSphere 메모리 확장 요청을 변경 신청 관리에 등록
  const now = new Date();
  const newRequest = {
    id: `vsphere-memory-${now.getTime()}`,
    title: 'vSphere 메모리 확장 요청',
    requester: '시스템 자동',
    currentUsage: 100,
    memoryIncrease: 60, // 100% → 40%로 감소시키기 위한 증가량
    targetUsage: 40,
    status: 'pending',
    createdAt: now.toISOString(),
    description: 'vSphere 메모리 사용량이 100%에 도달하여 자동으로 메모리 확장을 요청합니다.'
  };

  // 로컬 스토리지에 요청 저장
  const existingRequests = JSON.parse(localStorage.getItem('memoryRequests') || '[]');
  existingRequests.push(newRequest);
  localStorage.setItem('memoryRequests', JSON.stringify(existingRequests));

  // 모달 닫기
  warningModal.hideModal();

  // 변경 신청 관리 페이지로 이동
  router.push('/catalog');
};
</script>

<style scoped>
/* 기본 폰트 설정 */
.modal-overlay {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 모달 오버레이 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(3px);
  animation: fadeIn 0.2s ease-out;
}

/* 모달 컨테이너 */
.modal-container {
  width: 100%;
  max-width: 420px;
  padding: 0 20px;
}

/* 모달 내용 */
.modal-content {
  background: linear-gradient(135deg, #1E88E5 0%, #0D47A1 100%);
  border-radius: 16px;
  padding: 32px 24px 24px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;
  color: white;
}

/* 아이콘 */
.modal-icon {
  margin-bottom: 16px;
  color: #FFEB3B;
  font-size: 48px;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 제목 */
.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin: 0 0 12px;
  line-height: 1.4;
  letter-spacing: -0.3px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* 메시지 */
.modal-message {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  margin: 0 0 24px;
  letter-spacing: -0.2px;
}

/* 버튼 그룹 */
.button-group {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

/* 확인 버튼 */
.confirm-btn {
  flex: 1;
  padding: 14px 16px;
  background-color: white;
  color: #0D47A1;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  -webkit-tap-highlight-color: transparent;
}

.confirm-btn:active {
  background-color: #E3F2FD;
  transform: scale(0.98);
}

/* 신청하기 버튼 */
.request-btn {
  flex: 1;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  backdrop-filter: blur(5px);
}

.request-btn:active {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(0.98);
}

/* 애니메이션 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 모바일 대응 */
@media (max-width: 480px) {
  .modal-container {
    padding: 0 16px;
  }

  .modal-content {
    padding: 28px 20px 20px;
  }

  .modal-icon {
    font-size: 44px;
    margin-bottom: 14px;
  }

  .modal-title {
    font-size: 1.15rem;
    margin-bottom: 10px;
  }

  .modal-message {
    font-size: 0.95rem;
    margin-bottom: 20px;
  }

  .button-group {
    flex-direction: column;
    gap: 10px;
  }

  .confirm-btn,
  .request-btn {
    width: 100%;
  }
}
</style>
