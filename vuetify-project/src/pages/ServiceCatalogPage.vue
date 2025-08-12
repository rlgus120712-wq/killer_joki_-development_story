<template>
  <div class="service-catalog-page">
    <!-- 배경 애니메이션 요소 -->
    <div class="bg-animation">
      <div class="cloud cloud-1"></div>
      <div class="cloud cloud-2"></div>
      <div class="cloud cloud-3"></div>
    </div>

    <!-- 헤더 섹션 -->
    <div class="catalog-header">
      <div class="catalog-title-wrapper">
        <div class="header-logo-container">
          <v-icon color="white" size="36" class="catalog-title-icon">mdi-cloud</v-icon>
        </div>
        <div class="nav-title">
          Okestro Service Catalog
          <span class="okestro-slogan">혁신과 신뢰의 클라우드 파트너</span>
        </div>
      </div>
    </div>

    <main class="page-main">
      <!-- 검색 섹션 -->
      <div class="search-section">
        <v-text-field
          v-model="search"
          label="서비스 검색"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          class="search-input"
          hide-details
          bg-color="#1a4b8c"
          rounded="lg"
          placeholder="서비스를 입력하세요"
          clearable
          @focus="isSearchFocused = true"
          @blur="isSearchFocused = false"
          :class="{ 'search-focused': isSearchFocused }"
        >
          <template v-slot:append>
            <v-fade-transition>
              <v-btn
                v-if="search"
                icon="mdi-close"
                variant="text"
                size="small"
                @click="search = ''"
              ></v-btn>
            </v-fade-transition>
          </template>
        </v-text-field>
        <div class="search-tags" v-if="recentSearches.length > 0">
          <v-chip
            v-for="(tag, index) in recentSearches"
            :key="index"
            size="small"
            color="primary"
            variant="flat"
            class="search-tag"
            @click="search = tag"
          >
            {{ tag }}
          </v-chip>
        </div>
      </div>

      <!-- 서비스 카드 그리드 -->
      <v-fade-transition group>
        <div class="services-grid">
          <v-hover v-for="service in filteredServices" :key="service.id" v-slot="{ isHovering, props }">
            <div
              class="service-card"
              v-bind="props"
              :class="{ 'card-hover': isHovering }"
              @click="applyService(service)"
              :id="service.id === 'vsphere' ? 'vsphere-service' : undefined"
              :style="service.id === 'vsphere' ? 'scroll-margin-top: 20px' : ''"
            >
              <div class="service-icon-container">
                <v-icon :icon="service.icon || 'mdi-cloud'" size="32" class="service-icon"></v-icon>
              </div>
              <h3 class="service-name">{{ service.name }}</h3>
              <p class="service-description">{{ service.description }}</p>
              <div class="service-meta">
                <v-chip size="small" color="primary" variant="flat" class="platform-chip">
                  {{ service.platform }}
                </v-chip>
                <span class="service-price">{{ service.price }}</span>
              </div>
              <v-btn
                class="apply-btn"
                color="primary"
                variant="elevated"
                size="large"
                elevation="0"
              >
                신청하기
              </v-btn>
            </div>
          </v-hover>
        </div>
      </v-fade-transition>

      <!-- 서비스 신청 모달 -->
      <v-dialog v-model="dialogVisible" max-width="500px" class="service-modal">
        <v-card class="modal-card">
          <div class="modal-header">
            <div class="modal-icon-wrapper">
              <v-icon :icon="selectedService?.icon || 'mdi-cloud'" size="36" class="modal-icon"></v-icon>
            </div>
            <v-card-title class="modal-title">{{ selectedService?.name }} 신청</v-card-title>
            <v-btn icon="mdi-close" variant="text" size="small" @click="dialogVisible = false" class="close-btn"></v-btn>
          </div>

          <v-card-text>
            <v-form class="application-form" @submit.prevent="handleApplied">
              <div class="form-field">
                <label class="form-label">이름</label>
                <v-text-field
                  v-model="form.name"
                  placeholder="이름을 입력하세요"
                  variant="outlined"
                  density="comfortable"
                  bg-color="white"
                  hide-details
                  class="form-input"
                  :rules="[
                    v => !!v || '이름을 입력해주세요'
                  ]"
                  required
                />
              </div>

              <div class="form-field">
                <label class="form-label">이메일</label>
                <v-text-field
                  v-model="form.email"
                  placeholder="이메일을 입력하세요"
                  variant="outlined"
                  density="comfortable"
                  bg-color="white"
                  hide-details
                  class="form-input"
                  :rules="[
                    v => !!v || '이메일을 입력해주세요',
                    v => /.+@.+\..+/.test(v) || '유효한 이메일을 입력해주세요'
                  ]"
                  required
                />
              </div>

              <div class="form-field">
                <label class="form-label">요청사항</label>
                <v-textarea
                  v-model="form.request"
                  placeholder="요청사항을 입력하세요"
                  variant="outlined"
                  rows="3"
                  bg-color="white"
                  hide-details
                  class="form-input"
                />
              </div>

              <div class="form-actions">
                <v-btn
                  type="submit"
                  class="submit-btn"
                  color="primary"
                  variant="elevated"
                  size="large"
                  prepend-icon="mdi-check-circle"
                  :disabled="!isFormValid"
                  block
                >
                  신청 완료
                </v-btn>
                <v-btn
                  class="cancel-btn"
                  variant="text"
                  size="large"
                  @click="dialogVisible = false"
                  block
                >
                  취소
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- 신청 완료 모달 -->
      <v-dialog v-model="appliedService" max-width="480" transition="dialog-bottom-transition">
        <v-card class="modal-content success-modal">
          <div class="success-icon-container">
            <v-icon icon="mdi-check-circle" size="64" color="white" class="success-icon"></v-icon>
          </div>

          <v-card-title class="success-title">서비스 신청 완료</v-card-title>

          <v-card-text class="success-text">
            <p>{{ appliedService?.name }} 서비스 신청이 접수되었습니다.</p>
            <p>Okestro와 함께 혁신을 시작하세요!</p>
          </v-card-text>

          <v-card-actions class="success-actions">
            <v-btn
              class="goto-btn"
              color="primary"
              variant="elevated"
              size="large"
              prepend-icon="mdi-format-list-bulleted"
              block
              @click="goToRequestList"
            >
              신청 목록 이동
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useRequestListStore } from '../stores/requestList';

const router = useRouter();
const requestListStore = useRequestListStore();

const services = ref([
  { id: 'vsphere', name: 'vSphere', description: '엔터프라이즈급 가상화 플랫폼', platform: 'VMware', price: '문의 요망', icon: 'mdi-server' },
  { id: 'k8s', name: 'Kubernetes', description: '확장 가능한 컨테이너 오케스트레이션', platform: 'K8s', price: '월 199,000원', icon: 'mdi-dns' },
  { id: 'openstack', name: 'OpenStack', description: '오픈소스 클라우드 인프라', platform: 'OpenStack', price: '월 99,000원', icon: 'mdi-cloud' },
  { id: 'ncp', name: 'Naver Cloud', description: '네이버 클라우드 플랫폼 서비스', platform: 'NCP', price: '월 149,000원', icon: 'mdi-cloud' },
  { id: 'aws', name: 'AWS', description: '아마존 웹서비스 클라우드', platform: 'AWS', price: '월 199,000원', icon: 'mdi-aws' },
  { id: 'openshift', name: 'OpenShift', description: 'Red Hat OpenShift 컨테이너 플랫폼', platform: 'OpenShift', price: '월 229,000원', icon: 'mdi-apps' }
]);

const search = ref('');
const selectedService = ref(null);
const appliedService = ref(null);
const form = ref({ name: '', email: '', request: '' });
const isSearchFocused = ref(false);
const recentSearches = ref(['Kubernetes', 'Cloud', '오케스트레이션']);

// 폼 유효성 검사
const isFormValid = computed(() => {
  return !!form.value.name &&
         !!form.value.email &&
         /.+@.+\..+/.test(form.value.email);
});

// 검색어 저장 로직
watch(search, (newValue) => {
  if (newValue && !recentSearches.value.includes(newValue) && newValue.length > 1) {
    if (filteredServices.value.length > 0) {
      setTimeout(() => {
        if (recentSearches.value.length >= 5) {
          recentSearches.value.pop();
        }
        recentSearches.value.unshift(newValue);
      }, 2000);
    }
  }
});

const filteredServices = computed(() => {
  if (!search.value) return services.value;
  const searchLower = search.value.toLowerCase();
  return services.value.filter(service =>
    service.name.toLowerCase().includes(searchLower) ||
    service.description.toLowerCase().includes(searchLower)
  );
});

const dialogVisible = computed({
  get: () => !!selectedService.value,
  set: (value) => {
    if (!value) selectedService.value = null;
  }
});

function applyService(service) {
  selectedService.value = service;
  form.value = { name: '', email: '', request: '' };
}

function handleApplied() {
  if (!selectedService.value) return;
  // 신청 데이터 store에 저장
  const now = new Date();
  requestListStore.addRequest({
    id: `${selectedService.value.id}-${now.getTime()}`,
    serviceName: selectedService.value.name,
    status: '신청 대기',
    createdAt: now.toLocaleString(),
    platformType: selectedService.value.platform,
    spec: { cpu: 1, memory: 1, disk: 1 }
  });
  appliedService.value = selectedService.value;
  selectedService.value = null;
}

function goToRequestList() {
  router.replace('/request-list');
  appliedService.value = null;
}
</script>

<style scoped>
/* 기본 레이아웃 */
.service-catalog-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  position: relative;
  color: white;
  padding-bottom: 40px;
}

/* 배경 애니메이션 */
.bg-animation {
  position: absolute;
  top: 0;
  left: 0;
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

@keyframes float-right {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(100vw + 300px)); }
}

@keyframes float-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-100vw - 300px)); }
}

/* 헤더 섹션 */
.catalog-header {
  display: flex;
  align-items: center;
  padding: 32px 24px 12px 24px;
  gap: 16px;
  position: relative;
  z-index: 1;
  margin-bottom: 20px;
}

.catalog-title-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 16px 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.header-logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); }
  50% { transform: scale(1.05); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3); }
  100% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); }
}

.catalog-title-icon {
  font-size: 36px;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
}

.nav-title {
  font-size: 28px;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.okestro-slogan {
  font-size: 14px;
  font-weight: 400;
  margin-top: 2px;
  opacity: 0.9;
}

/* 검색 섹션 */
.page-main {
  padding: 0 24px 24px 24px;
  position: relative;
  z-index: 1;
}

.search-section {
  padding: 24px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 900px;
  margin: 0 auto 30px auto;
  transition: all 0.3s ease;
}

.search-input {
  padding: 12px;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.search-input :deep(.v-field__outline) {
  opacity: 0.9;
  border-width: 2px;
  border-color: #4285f4 !important;
}

.search-input :deep(.v-field__input) {
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  padding: 0 16px;
}

.search-input :deep(.v-field__prepend-inner) {
  padding-right: 16px;
}

.search-input :deep(.v-field__prepend-inner .v-icon) {
  color: #4285f4;
  opacity: 1;
  font-size: 24px;
}

.search-input :deep(.v-field__input input) {
  color: #ffffff !important;
  font-weight: 500;
}

.search-input :deep(.v-field__input textarea) {
  font-size: 15px;
}

.search-input :deep(.v-field__input .v-field__input-placeholder) {
  color: #a0c0e8 !important;
  opacity: 0.9;
}

.search-input :deep(.v-field__append-inner .v-icon) {
  color: #a0c0e8 !important;
}

.search-input :deep(.v-label) {
  color: #a0c0e8 !important;
}

.search-focused :deep(.v-field__outline) {
  border-color: #4285f4 !important;
  opacity: 1;
}

.search-focused :deep(.v-field__prepend-inner .v-icon) {
  color: #4285f4;
  opacity: 1;
}

.search-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  padding: 0 8px;
}

.search-tag {
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.search-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
  max-width: 900px;
  margin: 0 auto;
}

.service-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  height: 100%;
  min-height: 320px;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  z-index: -1;
}

.card-hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.service-icon-container {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.card-hover .service-icon-container {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.service-icon {
  color: white;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
}

.service-name {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.service-description {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
  line-height: 1.5;
}

.service-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 24px;
  margin-top: auto;
}

.platform-chip {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.service-price {
  font-size: 16px;
  font-weight: 700;
  color: white;
  background: linear-gradient(90deg, #60a5fa 0%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.apply-btn {
  background: linear-gradient(90deg, #1a4b8c 0%, #2c5eaa 100%) !important;
  color: white !important;
  border-radius: 50px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  padding: 10px 24px !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.3s ease !important;
  text-transform: none !important;
  width: 100%;
  margin-top: auto;
  letter-spacing: 0.5px;
}

.apply-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(59, 130, 246, 0.3) !important;
}

.submit-btn {
  background: linear-gradient(135deg, #1a4b8c 0%, #2c5eaa 100%);
  color: white;
  font-weight: 600;
  border-radius: 12px;
  height: 48px;
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;
  width: 100%;
  margin-top: auto;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.goto-btn {
  background: linear-gradient(135deg, #1a4b8c 0%, #2c5eaa 100%);
  color: white;
  font-weight: 600;
  border-radius: 12px;
  height: 48px;
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;
  width: 100%;
  margin-top: auto;
}

.goto-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.modal-content {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px 0 rgba(99,102,241,0.13);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: mz-pop 0.24s cubic-bezier(.6,1.5,.7,1) both;
}

.modal-header {
  background: linear-gradient(135deg, #1a4b8c 0%, #2c5eaa 100%);
  padding: 20px 24px;
  display: flex;
  align-items: center;
  position: relative;
}

.modal-icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.modal-icon {
  color: white;
}

.modal-title {
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  padding: 0;
  line-height: 1.4;
}

.close-btn {
  position: absolute;
  right: 16px;
  top: 16px;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.application-form {
  padding: 24px;
}

.form-field {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
}

.form-input :deep(.v-field__outline) {
  border-color: #d0d7de;
}

.form-input :deep(.v-field__input) {
  padding: 12px;
}

.form-input :deep(.v-field__input input) {
  font-size: 15px;
}

.form-input :deep(.v-field__input textarea) {
  font-size: 15px;
}

.form-actions {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cancel-btn {
  color: #64748b;
  font-weight: 500;
  border-radius: 12px;
  height: 48px;
}

.cancel-btn:hover {
  background-color: #f1f5f9;
}

.success-modal {
  background-color: #fff;
  border-radius: 24px;
  padding: 40px 28px 32px 28px;
  min-width: 320px;
  max-width: 95vw;
  box-shadow: 0 8px 32px 0 rgba(99,102,241,0.13);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: mz-pop 0.24s cubic-bezier(.6,1.5,.7,1) both;
}

.success-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #2563eb;
  margin-bottom: 12px;
}

.success-title {
  font-size: 2rem;
  font-weight: 800;
  color: #222;
  margin-bottom: 18px;
  letter-spacing: -1px;
  text-align: center;
}

.success-text {
  font-size: 1.1rem;
  color: #6366f1;
  margin-bottom: 22px;
  text-align: center;
}

.success-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 12px;
}

.service-modal :deep(.v-overlay__content) {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.modal-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: none;
}
</style>
