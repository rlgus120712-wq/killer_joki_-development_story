<template>
  <div class="change-request-page">
    <!-- 배경 애니메이션 요소 -->
    <div class="bg-animation">
      <div class="cloud cloud-1"></div>
      <div class="cloud cloud-2"></div>
      <div class="cloud cloud-3"></div>
    </div>

    <!-- 헤더 섹션 -->
    <div class="page-header">
      <div class="header-content">
        <v-icon color="white" size="32" class="header-icon">mdi-clipboard-text-outline</v-icon>
        <h2 class="change-request-title">서비스 변경 신청 관리</h2>
      </div>
    </div>

    <v-container class="main-content" fluid>
      <!-- 필터 및 검색 섹션 -->
      <v-row class="filter-section">
        <v-col cols="12" sm="6">
          <v-select
            v-model="statusFilter"
            :items="statusOptions"
            variant="outlined"
            density="comfortable"
            class="filter-select"
            hide-details
            prepend-inner-icon="mdi-filter-variant"
            item-title="title"
            item-value="value"
            label="상태 필터"
            menu-icon="mdi-chevron-down"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="searchQuery"
            placeholder="서비스명 검색"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="comfortable"
            class="search-input"
            hide-details
            clearable
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- 요청 목록 카드 -->
      <v-card class="request-card">
        <v-card-title class="card-title">
          <div class="d-flex align-center flex-wrap">
            <div class="d-flex align-center">
              <v-icon color="white" class="mr-2">mdi-format-list-bulleted</v-icon>
              <span>신청 목록</span>
            </div>
            <v-spacer></v-spacer>
            <v-chip color="white" variant="outlined" size="small" class="mt-1 mt-sm-0 count-chip">
              총 {{ filteredRequests.length }}건
            </v-chip>
          </div>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pa-0">
          <v-table class="request-table">
            <thead>
              <tr>
                <th class="text-left">서비스명</th>
                <th class="text-left d-none d-sm-table-cell">플랫폼</th>
                <th class="text-left d-none d-md-table-cell">신청일</th>
                <th class="text-left">상태</th>
                <th class="text-center">상세</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="req in filteredRequests"
                :key="req.id"
                @click="selectRequest(req)"
                class="request-row"
              >
                <td>
                  <div class="service-name">
                    <v-icon size="small" color="white" class="mr-2">{{
                      getPlatformIcon(req.platformType)
                    }}</v-icon>
                    <span class="text-truncate">{{ req.serviceName }}</span>
                  </div>
                </td>
                <td class="d-none d-sm-table-cell">
                  <v-chip
                    size="small"
                    :color="getPlatformColor(req.platformType)"
                    variant="flat"
                    class="platform-chip"
                  >
                    {{ req.platformType }}
                  </v-chip>
                </td>
                <td class="d-none d-md-table-cell">{{ req.createdAt }}</td>
                <td>
                  <v-chip
                    size="small"
                    :color="getStatusColor(req.status)"
                    variant="flat"
                    class="status-chip"
                  >
                    {{ req.status }}
                  </v-chip>
                </td>
                <td class="text-center">
                  <v-btn
                    icon
                    color="white"
                    variant="text"
                    size="small"
                    class="detail-btn"
                    @click.stop="openDetail(req)"
                  >
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr v-if="filteredRequests.length === 0">
                <td colspan="5" class="text-center py-5">
                  <v-icon size="large" color="white" class="mb-2"
                    >mdi-clipboard-text-off-outline</v-icon
                  >
                  <div class="empty-text">등록된 신청 내역이 없습니다.</div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>

      <!-- 메모리 확장 신청 폼 -->
<!--      <v-card class="request-card">
        <v-card-title class="card-title">
          <div class="d-flex align-center flex-wrap">
            <div class="d-flex align-center">
              <v-icon color="white" class="mr-2">mdi-memory</v-icon>
              <span>메모리 확장 신청</span>
            </div>
          </div>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pa-0">
          <v-form @submit.prevent="submitMemoryRequest">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="memoryRequest.title"
                  label="제목"
                  filled
                  class="q-mb-md"
                  :rules="[val => !!val || '제목을 입력해주세요']"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="memoryRequest.description"
                  label="신청 사유"
                  filled
                  type="textarea"
                  class="q-mb-md"
                  :rules="[val => !!val || '신청 사유를 입력해주세요']"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="memoryRequest.memoryIncrease"
                  type="number"
                  label="증가시킬 메모리 양 (%)"
                  filled
                  class="q-mb-md"
                  :rules="[val => val > 0 || '0보다 큰 값을 입력해주세요']"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" class="text-center">
                <v-btn
                  label="신청하기"
                  type="submit"
                  color="primary"
                  :loading="loading"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>-->
    </v-container>

    <!-- 상세 정보 모달 -->
    <v-dialog v-model="detailDialog" max-width="600" transition="dialog-bottom-transition">
      <v-card class="detail-modal">
        <div class="modal-header">
          <div class="modal-icon-wrapper">
            <v-icon
              :icon="getPlatformIcon(selectedRequest?.platformType)"
              size="28"
              class="modal-icon"
            ></v-icon>
          </div>
          <v-card-title class="modal-title"
            >{{ selectedRequest?.serviceName }} 상세 정보</v-card-title
          >
          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            @click="detailDialog = false"
            class="close-btn"
          ></v-btn>
        </div>

        <v-card-text v-if="selectedRequest" class="modal-content">
          <!-- 기본 정보 섹션 -->
          <div class="detail-section">
            <h3 class="section-title">기본 정보</h3>
            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-label">서비스명</div>
                <div class="detail-value">{{ selectedRequest.serviceName }}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">플랫폼</div>
                <div class="detail-value">
                  <v-chip
                    size="small"
                    :color="getPlatformColor(selectedRequest.platformType)"
                    variant="flat"
                  >
                    {{ selectedRequest.platformType }}
                  </v-chip>
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-label">신청일</div>
                <div class="detail-value">{{ selectedRequest.createdAt }}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">상태</div>
                <div class="detail-value">
                  <v-chip
                    size="small"
                    :color="getStatusColor(selectedRequest.status)"
                    variant="flat"
                  >
                    {{ selectedRequest.status }}
                  </v-chip>
                </div>
              </div>
            </div>
          </div>

          <v-divider class="my-4"></v-divider>

          <!-- 서비스 사양 섹션 -->
          <div class="detail-section">
            <h3 class="section-title">서비스 사양</h3>
            <div class="spec-grid">
              <div class="spec-item">
                <v-icon color="white" size="24">mdi-cpu-64-bit</v-icon>
                <div class="spec-value">CPU {{ selectedRequest.spec?.cpu || '2' }}코어</div>
              </div>
              <div class="spec-item">
                <v-icon color="white" size="24">mdi-memory</v-icon>
                <div class="spec-value">메모리 {{ selectedRequest.spec?.memory || '4' }}GB</div>
              </div>
              <div class="spec-item">
                <v-icon color="white" size="24">mdi-harddisk</v-icon>
                <div class="spec-value">디스크 {{ selectedRequest.spec?.disk || '50' }}GB</div>
              </div>
            </div>
          </div>

          <v-divider class="my-4"></v-divider>

          <!-- 처리 내역 섹션 -->
          <div class="detail-section">
            <h3 class="section-title">처리 내역</h3>
            <v-timeline density="compact" align="start" class="timeline-custom">
              <v-timeline-item dot-color="primary" size="small" fill-dot>
                <div class="timeline-content">
                  <div class="timeline-title">신청 접수</div>
                  <div class="timeline-date">{{ selectedRequest.createdAt }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item
                :dot-color="selectedRequest.status === '완료' ? 'success' : 'grey'"
                size="small"
              >
                <div class="timeline-content">
                  <div class="timeline-title">
                    {{ selectedRequest.status === '완료' ? '처리 완료' : '검토 중' }}
                  </div>
                  <div class="timeline-date">
                    {{
                      selectedRequest.status === '완료' ? formatKoreanDateTime(selectedRequest.updatedAt) : '진행 중'
                    }}
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </div>
        </v-card-text>

        <v-card-actions class="modal-actions">
          <v-spacer></v-spacer>

          <v-btn
            color="success"
            variant="elevated"
            prepend-icon="mdi-thumb-up"
            @click="approveRequest"
          >
            승인
          </v-btn>

          <v-btn
            variant="elevated"
            color="primary"
            @click="detailDialog = false"
            prepend-icon="mdi-check"
          >
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRequestListStore } from '../stores/requestList';

const requestStore = useRequestListStore();
const detailDialog = ref(false);
const selectedRequest = ref<any>(null);
const searchQuery = ref('');
const statusFilter = ref('all');
const memoryRequest = ref({
  title: '',
  description: '',
  memoryIncrease: 0,
});
const loading = ref(false);

const statusOptions = [
  { title: '전체', value: 'all' },
  { title: '대기중', value: 'pending' },
  { title: '진행중', value: 'in-progress' },
  { title: '완료됨', value: 'completed' },
  { title: '거부됨', value: 'rejected' },
];

const filteredRequests = computed(() => {
  let filtered = [...requestStore.requests];

  // 상태 필터링
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter((req) => req.status === statusFilter.value);
  }

  // 검색어 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (req) =>
        req.serviceName.toLowerCase().includes(query) ||
        (req.description && req.description.toLowerCase().includes(query)),
    );
  }

  return filtered;
});

// 상세보기 함수
const openDetail = (req: any) => {
  selectedRequest.value = { ...req };
  detailDialog.value = true;
};

// 행 클릭 이벤트 핸들러
const selectRequest = (req: any) => {
  selectedRequest.value = { ...req };
  detailDialog.value = true;
};

// 플랫폼별 아이콘 반환
function getPlatformIcon(platform) {
  switch (platform) {
    case 'AWS':
      return 'mdi-aws';
    case 'OpenStack':
      return 'mdi-openstack';
    case 'vSphere':
      return 'mdi-vmware';
    case 'Kubernetes':
      return 'mdi-kubernetes';
    case 'NCP':
      return 'mdi-cloud';
    default:
      return 'mdi-cloud';
  }
}

// 플랫폼별 색상 반환
function getPlatformColor(platform) {
  switch (platform) {
    case 'K8s':
      return '#326CE5'; // 쿠버네티스 블루
    case 'OpenShift':
      return '#EE0000'; // 오픈시프트 레드
    case 'NCP':
      return '#2E7D32'; // 네이버 클라우드 그린
    case 'AWS':
      return '#FF9900'; // AWS 오렌지
    case 'GCP':
      return '#4285F4'; // GCP 블루
    case 'Azure':
      return '#0089D6'; // Azure 블루
    default:
      return '#757575'; // 기본 회색
  }
}

// 상태별 색상 반환
function getStatusColor(status) {
  const colorMap = {
    pending: '#9CA3AF', // 회색
    'in-progress': '#3B82F6', // 파랑
    완료: '#10B981', // 초록
    rejected: '#EF4444', // 빨강
    approved: '#8B5CF6', // 보라
    cancelled: '#6B7280', // 회색
  };
  return colorMap[status] || '#9CA3AF';
}

// 메모리 확장 신청 처리 함수
const submitMemoryRequest = async () => {
  try {
    loading.value = true;

    // 실제로는 API를 통해 신청을 처리합니다.
    // 여기서는 간단히 로컬 스토리지에 저장하는 예시를 보여드립니다.
    const requests = JSON.parse(localStorage.getItem('memoryRequests') || '[]');
    const newRequest = {
      id: Date.now(),
      ...memoryRequest.value,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    requests.push(newRequest);
    localStorage.setItem('memoryRequests', JSON.stringify(requests));

    console.log('메모리 확장 신청이 처리되었습니다.');

    memoryRequest.value = {
      title: '',
      description: '',
      memoryIncrease: 0,
    };
  } catch (error) {
    console.error('Error submitting request:', error);
  } finally {
    loading.value = false;
  }
};

const approveRequest = () => {

  if (!selectedRequest.value) return;

  // 1. 모달 내 상태 변경
  selectedRequest.value.status = '완료';
  selectedRequest.value.updatedAt = new Date().toISOString();

  // 2. 스토어의 동일 요청 객체 찾아 상태 변경
  const idx = requestStore.requests.findIndex(
    (r) => r.id === selectedRequest.value.id,
  );
  if (idx > -1) {
    requestStore.requests[idx] = {
      ...requestStore.requests[idx],
      status: '완료',
      updatedAt: selectedRequest.value.updatedAt,
    };
  }
};


function formatKoreanDateTime(dateInput: string | Date): string {
  const date = new Date(dateInput);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0-based
  const day = date.getDate();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const isPM = hours >= 12;
  const period = isPM ? '오후' : '오전';

  hours = hours % 12;
  if (hours === 0) hours = 12;

  const padded = (n: number) => n.toString().padStart(2, '0');

  return `${year}. ${month}. ${day}. ${period} ${hours}:${padded(minutes)}:${padded(seconds)}`;
}

</script>

<style scoped>
/* 기본 레이아웃 */
.change-request-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a4b8c 0%, #0d2b5b 100%);
  padding: 20px;
  color: #e2e8f0;
  position: relative;
  overflow-x: hidden;
}

/* 헤더 스타일 */
.page-header {
  margin-bottom: 2rem;
  padding: 1.5rem 0;
  position: relative;
  z-index: 2;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.change-request-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: white;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 필터 및 검색 섹션 */
.filter-section {
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
}

.filter-select,
.search-input {
  border-radius: 12px !important;
  font-size: 1.05rem;
}

.filter-select :deep(.v-field) {
  font-size: 1.05rem;
}

.search-input :deep(.v-field) {
  background-color: rgba(26, 75, 140, 0.7) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  font-size: 1.05rem;
}

.search-input :deep(.v-field__input) {
  color: white !important;
}

.search-input :deep(.v-field__prepend-inner) {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* 요청 목록 카드 */
.request-card {
  border-radius: 16px !important;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  background: rgba(26, 75, 140, 0.7) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card-title {
  padding: 1.5rem !important;
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* 테이블 스타일 */
.request-table {
  background: transparent !important;
  width: 100%;
}

.request-table thead th {
  font-size: 1rem !important;
  font-weight: 600 !important;
  color: #e2e8f0 !important;
  background: rgba(0, 0, 0, 0.2) !important;
  padding: 1rem 1.5rem !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.request-table tbody td {
  font-size: 1rem !important;
  color: #e2e8f0 !important;
  padding: 1rem 1.5rem !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
}

.request-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.05) !important;
  cursor: pointer;
}

/* 상태 칩 스타일 */
.status-chip {
  font-weight: 500;
  font-size: 0.9rem;
  color: white !important;
  min-width: 100px;
  justify-content: center;
  transition: all 0.2s ease;
}

.status-chip:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* 플랫폼 칩 스타일 */
.platform-chip {
  font-weight: 500;
  font-size: 0.9rem;
  color: white !important;
  min-width: 100px;
  justify-content: center;
  transition: all 0.2s ease;
}

.platform-chip:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* 서비스명 스타일 */
.service-name {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: white;
}

/* 상세보기 버튼 스타일 */
.detail-btn {
  transition: all 0.2s ease;
  opacity: 0.8;
  color: white !important;
}

.detail-btn:hover {
  transform: scale(1.2);
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* 아이콘 색상 강제 지정 */
.detail-btn :deep(.v-icon) {
  color: white !important;
}

/* 모달 스타일 */
.detail-modal {
  background: linear-gradient(135deg, #1a4b8c 0%, #0d2b5b 100%) !important;
  border-radius: 16px !important;
  color: white !important;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header {
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
}

.modal-icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-icon {
  color: white;
}

.modal-title {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0;
  flex: 1;
}

.close-btn {
  position: absolute;
  right: 16px;
  top: 16px;
  color: white;
}

.modal-content {
  padding: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
}

/* 상세 정보 섹션 */
.detail-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.detail-item {
  margin-bottom: 12px;
}

.detail-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 4px;
}

.detail-value {
  font-size: 1rem;
  font-weight: 500;
  color: white;
  word-break: break-word;
}

/* 사양 그리드 */
.spec-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.spec-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
}

.spec-item:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.spec-item .v-icon {
  margin-bottom: 8px;
}

.spec-value {
  font-weight: 500;
  color: white;
  font-size: 0.95rem;
}

/* 타임라인 */
.timeline-custom {
  margin-top: 16px;
  padding: 0 8px;
}

.timeline-content {
  padding: 8px 0;
}

.timeline-title {
  font-weight: 600;
  color: white;
  font-size: 1rem;
}

.timeline-date {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 2px;
}

/* 모달 액션 버튼 */
.modal-actions {
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* 총 건수 칩 스타일 */
.count-chip {
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  color: #1a4b8c !important;
  font-weight: 600;
  letter-spacing: -0.3px;
  background-color: white !important;
}

/* 셀렉트 박스 스타일 */
:deep(.v-select .v-field) {
  border-radius: 8px !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  transition: all 0.3s ease;
}

:deep(.v-select .v-field--focused) {
  border-color: var(--v-primary-base) !important;
  box-shadow: 0 0 0 2px rgba(var(--v-primary-base), 0.2);
}

:deep(.v-select .v-field__outline) {
  display: none;
}

:deep(.v-select .v-field--variant-outlined) {
  --v-field-border-opacity: 0.3;
}

:deep(.v-select .v-field__input) {
  color: white !important;
  padding: 0 12px !important;
}

:deep(.v-select .v-field__input::placeholder) {
  color: rgba(255, 255, 255, 0.7) !important;
}

:deep(.v-select .v-field__append-inner) {
  color: rgba(255, 255, 255, 0.7) !important;
}

:deep(.v-select .v-field__prepend-inner) {
  color: rgba(255, 255, 255, 0.7) !important;
  margin-right: 8px;
}

/* 드롭다운 메뉴 스타일 */
:deep(.v-menu__content) {
  border-radius: 8px !important;
  margin-top: 4px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
}

:deep(.v-list) {
  background-color: #1a4b8c !important;
  color: white !important;
  border-radius: 8px !important;
  padding: 8px 0;
}

:deep(.v-list-item--active) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

:deep(.v-list-item--active .v-list-item-title) {
  color: white !important;
  font-weight: 500;
}

:deep(.v-list-item:hover) {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

:deep(.v-list-item-title) {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9) !important;
}

/* 반응형 조정 */
@media (max-width: 600px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .spec-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .modal-content {
    padding: 1rem;
  }

  .modal-header {
    padding: 1rem;
  }

  .modal-icon-wrapper {
    width: 40px;
    height: 40px;
  }

  .modal-title {
    font-size: 1.1rem;
  }
}

/* 배경 애니메이션 */
.bg-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}

.cloud {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1000px;
  filter: blur(20px);
  z-index: 1;
  opacity: 0.5;
  pointer-events: none;
}

.cloud-1 {
  width: 300px;
  height: 100px;
  top: 20%;
  left: -100px;
  animation: float 25s linear infinite;
}

.cloud-2 {
  width: 200px;
  height: 70px;
  top: 60%;
  right: -100px;
  animation: float 30s linear infinite reverse;
  animation-delay: 5s;
}

.cloud-3 {
  width: 250px;
  height: 80px;
  bottom: 10%;
  left: 20%;
  animation: float 35s linear infinite;
  animation-delay: 10s;
}

@keyframes float {
  0% {
    transform: translateX(0) translateY(0);
  }
  25% {
    transform: translateX(50px) translateY(-20px);
  }
  50% {
    transform: translateX(100px) translateY(0);
  }
  75% {
    transform: translateX(50px) translateY(20px);
  }
  100% {
    transform: translateX(0) translateY(0);
  }
}

/* 빈 목록 메시지 */
.empty-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  margin-top: 0.5rem;
}
</style>
