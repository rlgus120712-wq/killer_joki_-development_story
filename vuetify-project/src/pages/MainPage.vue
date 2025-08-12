<template>
  <div class="okestro-main-page">
    <!-- 배경 애니메이션 요소 -->
    <div class="bg-animation">
      <div class="cloud cloud-1"></div>
      <div class="cloud cloud-2"></div>
      <div class="cloud cloud-3"></div>
      <div class="cloud cloud-4"></div>
    </div>

    <!-- 히어로 섹션 -->
    <div class="main-hero">
      <div class="hero-logo-container">
        <v-icon color="white" size="60" class="main-logo">mdi-cloud</v-icon>
      </div>
      <h1 class="main-title">Okestro CMP</h1>
      <div class="main-slogan">혁신과 신뢰의 클라우드 파트너</div>
      <v-btn
        class="main-btn"
        color="primary"
        size="large"
        to="/catalog"
        prepend-icon="mdi-apps"
        variant="elevated"
        elevation="3"
      >
        서비스 카탈로그 바로가기
      </v-btn>
    </div>

    <!-- 특징 섹션 -->
    <div class="main-features">
      <v-slide-group show-arrows="true" class="feature-slider">
        <v-slide-group-item v-for="(feature, index) in features" :key="index">
          <div class="feature-card" :class="`feature-${index+1}`">
            <div class="feature-icon-container">
              <v-icon :icon="feature.icon" size="36" class="feature-icon"></v-icon>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </div>

    <!-- 통계 섹션 -->
    <div class="stats-section">
      <div class="stats-container">
        <div class="stat-item" v-for="(stat, index) in stats" :key="index">
          <div class="stat-number">{{ stat.number }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- CTA 섹션 -->
    <div class="cta-section">
      <div class="cta-content">
        <h2>클라우드 혁신을 시작하세요</h2>
        <p>Okestro와 함께 비즈니스 성장을 가속화하세요</p>
        <v-btn
          class="cta-btn"
          color="white"
          variant="flat"
          size="large"
          to="/change-request"
        >
          상담 신청하기
          <v-icon icon="mdi-arrow-right" class="ml-2"></v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 특징 데이터
const features = [
  {
    icon: 'mdi-rocket-launch',
    title: '빠르고 유연한 클라우드',
    description: '즉시 제공, 자동화, 맞춤형 리소스로 비즈니스 속도를 높이세요'
  },
  {
    icon: 'mdi-shield-check',
    title: '신뢰받는 파트너십',
    description: '금융/공공/대기업까지 400+ 고객사와 함께 성장하는 클라우드 솔루션'
  },
  {
    icon: 'mdi-chart-areaspline',
    title: '혁신적 서비스',
    description: 'AI, 오케스트레이션, 자동화, 전문 컨설팅까지 한 번에 제공'
  },
  {
    icon: 'mdi-server',
    title: '안정적인 인프라',
    description: '99.9% 가용성 보장과 24/7 모니터링으로 안심하고 사용하세요'
  },
  {
    icon: 'mdi-account-group',
    title: '전문 기술 지원',
    description: '클라우드 전문가의 신속한 기술 지원으로 문제를 해결해 드립니다'
  }
];

// 통계 데이터
const stats = [
  { number: '400+', label: '고객사' },
  { number: '99.9%', label: '가용성' },
  { number: '24/7', label: '기술 지원' },
  { number: '5년+', label: '업계 경험' }
];
</script>

<style scoped>
/* 기본 레이아웃 */
.okestro-main-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  color: white;
}

/* 배경 애니메이션 */
.bg-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.cloud {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  filter: blur(20px);
}

.cloud-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: -150px;
  animation: float-right 60s linear infinite;
}

.cloud-2 {
  width: 200px;
  height: 200px;
  top: 40%;
  right: -100px;
  animation: float-left 45s linear infinite;
}

.cloud-3 {
  width: 250px;
  height: 250px;
  bottom: 15%;
  left: -125px;
  animation: float-right 50s linear infinite;
}

.cloud-4 {
  width: 180px;
  height: 180px;
  bottom: 30%;
  right: -90px;
  animation: float-left 55s linear infinite;
}

@keyframes float-right {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(100vw + 300px)); }
}

@keyframes float-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-100vw - 300px)); }
}

/* 히어로 섹션 */
.main-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 60px;
  z-index: 1;
  text-align: center;
  padding: 0 20px;
}

.hero-logo-container {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: pulse 3s ease-in-out infinite;
}

.main-logo {
  font-size: 60px;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
}

.main-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  margin-bottom: 16px;
  letter-spacing: -1px;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 1s ease-out;
}

.main-slogan {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 36px;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.main-btn {
  background: white !important;
  color: #3b82f6 !important;
  border-radius: 50px !important;
  font-size: 1.1rem !important;
  font-weight: 700 !important;
  padding: 12px 32px !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.3s ease !important;
  animation: fadeInUp 1s ease-out 0.4s both;
  text-transform: none !important;
}

.main-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2) !important;
}

/* 특징 섹션 */
.main-features {
  width: 100%;
  z-index: 1;
  padding: 0 20px;
  margin-bottom: 60px;
}

.feature-slider {
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 30px;
  min-width: 280px;
  max-width: 320px;
  height: 260px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.15);
}

.feature-icon-container {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  color: white;
}

.feature-card h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: white;
}

.feature-card p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

/* 통계 섹션 */
.stats-section {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 60px 20px;
  z-index: 1;
  margin-bottom: 60px;
}

.stats-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 40px;
}

.stat-item {
  text-align: center;
  min-width: 150px;
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #60a5fa 0%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

/* CTA 섹션 */
.cta-section {
  width: 100%;
  z-index: 1;
  padding: 0 20px;
  margin-bottom: 80px;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 50px 40px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.cta-content h2 {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 16px;
  color: white;
}

.cta-content p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
}

.cta-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%) !important;
  color: white !important;
  border-radius: 50px !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  padding: 12px 32px !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.3s ease !important;
  text-transform: none !important;
}

.cta-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2) !important;
}

/* 애니메이션 */
@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); }
  50% { transform: scale(1.05); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3); }
  100% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 반응형 스타일 */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.8rem;
  }

  .main-slogan {
    font-size: 1.2rem;
  }

  .stats-container {
    gap: 30px;
  }

  .stat-number {
    font-size: 2.5rem;
  }

  .cta-content {
    padding: 40px 20px;
  }

  .cta-content h2 {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .hero-logo-container {
    width: 100px;
    height: 100px;
  }

  .main-title {
    font-size: 2.2rem;
  }

  .main-slogan {
    font-size: 1.1rem;
  }

  .feature-card {
    min-width: 240px;
    padding: 25px;
  }

  .stats-container {
    flex-direction: column;
    gap: 40px;
  }

  .cta-content h2 {
    font-size: 1.6rem;
  }

  .cta-content p {
    font-size: 1.1rem;
  }
}
</style>
