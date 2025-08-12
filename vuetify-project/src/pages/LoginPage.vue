<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-logo-container">
        <v-icon icon="mdi-cloud" class="login-cloud-icon"></v-icon>
      </div>
      <h1 class="login-title">Okestro</h1>
      
      <transition name="fade" mode="out-in">
        <div v-if="!loading" class="login-form-container">
          <form @submit.prevent="handleLogin" class="login-form">
            <v-text-field
              v-model="id"
              label="아이디"
              variant="outlined"
              prepend-inner-icon="mdi-account"
              class="login-input"
              :error-messages="error ? '아이디를 확인해주세요' : ''"
              required
              autofocus
            ></v-text-field>
            
            <v-text-field
              v-model="pw"
              label="비밀번호"
              type="password"
              variant="outlined"
              prepend-inner-icon="mdi-lock"
              class="login-input"
              :error-messages="error ? '비밀번호를 확인해주세요' : ''"
              required
            ></v-text-field>
            
            <v-btn
              type="submit"
              block
              color="primary"
              class="login-btn"
              size="large"
              elevation="2"
            >
              로그인
              <v-icon icon="mdi-login" class="ml-2"></v-icon>
            </v-btn>
          </form>
        </div>
        
        <div v-else class="login-loading">
          <v-progress-circular indeterminate size="70" width="5" color="primary"></v-progress-circular>
          <div class="login-loading-text">
            <span class="loading-dot">로</span>
            <span class="loading-dot">그</span>
            <span class="loading-dot">인</span>
            <span class="loading-dot"> </span>
            <span class="loading-dot">중</span>
            <span class="loading-dot">.</span>
            <span class="loading-dot">.</span>
            <span class="loading-dot">.</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const id = ref('');
const pw = ref('');
const error = ref(false);
const loading = ref(false);
const router = useRouter();

function handleLogin() {
  error.value = false;
  if (id.value === 'okestro' && pw.value === 'okestro2018') {
    loading.value = true;
    setTimeout(() => {
      localStorage.setItem('okestro_login', '1');
      void router.replace('/');
    }, 2000);
  } else {
    error.value = true;
    // 에러 시 입력 필드 흔들림 효과
    const loginCard = document.querySelector('.login-card');
    if (loginCard) {
      loginCard.classList.add('shake');
      setTimeout(() => {
        loginCard.classList.remove('shake');
      }, 500);
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  padding: 20px;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  padding: 40px 30px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(0);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 65px rgba(0, 0, 0, 0.25);
}

.login-logo-container {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  animation: float 3s ease-in-out infinite;
}

.login-cloud-icon {
  color: white !important;
  font-size: 40px !important;
}

.login-title {
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 30px;
  letter-spacing: -1px;
}

.login-form-container {
  width: 100%;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.login-input {
  border-radius: 12px;
}

.login-btn {
  margin-top: 10px;
  border-radius: 12px !important;
  font-weight: 600 !important;
  font-size: 1.1rem !important;
  padding: 12px !important;
  letter-spacing: 0.5px !important;
  text-transform: none !important;
  transition: all 0.3s ease !important;
}

.login-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  gap: 30px;
}

.login-loading-text {
  font-size: 1.4rem;
  font-weight: 600;
  color: #3b82f6;
  display: flex;
}

.loading-dot {
  animation: loadingPulse 1.5s infinite;
  animation-fill-mode: both;
}

.loading-dot:nth-child(2) { animation-delay: 0.2s; }
.loading-dot:nth-child(3) { animation-delay: 0.4s; }
.loading-dot:nth-child(4) { animation-delay: 0.6s; }
.loading-dot:nth-child(5) { animation-delay: 0.8s; }
.loading-dot:nth-child(6) { animation-delay: 1s; }
.loading-dot:nth-child(7) { animation-delay: 1.2s; }
.loading-dot:nth-child(8) { animation-delay: 1.4s; }

/* 애니메이션 정의 */
@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

@keyframes loadingPulse {
  0%, 100% { opacity: 0.5; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
}

.shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
