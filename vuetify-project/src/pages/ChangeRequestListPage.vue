<template>
  <v-container class="pa-4">
    <v-card>
      <v-card-title>
        <div class="text-h6">메모리 확장 요청 목록</div>
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-data-table
          :items="requests"
          :headers="vuetifyHeaders"
          :loading="loading"
          :search="filter"
          item-key="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="filter"
                append-inner-icon="mdi-magnify"
                label="검색"
                single-line
                hide-details
                density="compact"
                variant="outlined"
                class="mr-4"
              ></v-text-field>
            </v-toolbar>
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip :color="getStatusColor(item.status)" size="small">
              {{ getStatusText(item.status) }}
            </v-chip>
          </template>

          <template v-slot:item.actions="{ item }">
            <div class="d-flex ga-2">
              <v-btn
                v-if="item.status === 'pending'"
                size="small"
                color="success"
                variant="contained"
                @click="approveRequest(item)"
              >
                승인
              </v-btn>
              <v-btn
                v-if="item.status === 'pending'"
                size="small"
                color="error"
                variant="contained"
                class="ml-2"
                @click="rejectRequest(item)"
              >
                거부
              </v-btn>
              <v-btn
                size="small"
                color="primary"
                variant="outlined"
                @click="showDetails(item)"
              >
                상세
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- 상세 정보 다이얼로그 -->
    <v-dialog v-model="showDetailDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">요청 상세 정보</span>
        </v-card-title>

        <v-divider />

        <v-card-text v-if="selectedRequest" class="py-4">
          <v-row>
            <v-col cols="12" sm="6">
              <div class="text-subtitle-2 mb-1">제목</div>
              <div class="text-body-1">{{ selectedRequest.title }}</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-subtitle-2 mb-1">신청자</div>
              <div class="text-body-1">{{ selectedRequest.requester || '관리자' }}</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-subtitle-2 mb-1">신청 일시</div>
              <div class="text-body-1">{{ formatDate(selectedRequest.createdAt) }}</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-subtitle-2 mb-1">상태</div>
              <v-chip :color="getStatusColor(selectedRequest.status)" size="small">
                {{ getStatusText(selectedRequest.status) }}
              </v-chip>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-subtitle-2 mb-1">현재 메모리 사용량</div>
              <div class="text-body-1">{{ selectedRequest.currentUsage }}%</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-subtitle-2 mb-1">증가 요청량</div>
              <div class="text-body-1">{{ selectedRequest.memoryIncrease }}%</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-subtitle-2 mb-1">예상 사용량</div>
              <div class="text-body-1">{{ selectedRequest.targetUsage }}%</div>
            </v-col>
          </v-row>

          <v-card variant="outlined" class="mt-4">
            <v-card-title class="text-subtitle-1">신청 사유</v-card-title>
            <v-card-text>
              {{ selectedRequest.description }}
            </v-card-text>
          </v-card>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="showDetailDialog = false">
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useVSphereStore } from 'src/stores/vsphereStore';

const loading = ref(false);
const filter = ref('');
const showDetailDialog = ref(false);
const selectedRequest = ref(null);
const requests = ref([]);

const vuetifyHeaders = [
  { text: '제목', value: 'title', align: 'left', sortable: true },
  { text: '신청자', value: 'requester', align: 'center', sortable: true },
  { text: '현재 사용량', value: 'currentUsage', align: 'center', sortable: true },
  { text: '증가 요청량', value: 'memoryIncrease', align: 'center', sortable: true },
  { text: '예상 사용량', value: 'targetUsage', align: 'center', sortable: true },
  { text: '상태', value: 'status', align: 'center', sortable: true },
  { text: '신청 일시', value: 'createdAt', align: 'center', sortable: true, format: val => formatDate(val) },
  { text: '액션', value: 'actions', align: 'center' }
];

// 요청 목록 불러오기
const fetchRequests = () => {
  try {
    loading.value = true;
    // 실제로는 API를 통해 데이터를 가져옵니다.
    const savedRequests = JSON.parse(localStorage.getItem('memoryRequests') || '[]');
    requests.value = savedRequests.map(request => ({
      ...request,
      targetUsage: Math.max(0, request.currentUsage - request.memoryIncrease)
    }));
  } catch (error) {
    console.error('Error fetching requests:', error);
  } finally {
    loading.value = false;
  }
};

// 요청 승인
const approveRequest = async (request) => {
  try {
    loading.value = true;

    const storedRequests = JSON.parse(localStorage.getItem('memoryRequests') || '[]');
    const updatedRequests = storedRequests.map(req =>
      req.id === request.id ? { ...req, status: 'approved' } : req
    );

    localStorage.setItem('memoryRequests', JSON.stringify(updatedRequests));

    // vSphere 메모리 확장 요청인 경우 실제 메모리 사용량을 40%로 감소
    if (request.title && request.title.includes('vSphere 메모리 확장')) {
      const vsphereStore = useVSphereStore();
      vsphereStore.requestMemoryExtension(); // 40%로 감소
    }

    fetchRequests();
  } catch (error) {
    console.error('Error approving request:', error);
  } finally {
    loading.value = false;
  }
};

// 요청 거절
const rejectRequest = async (request) => {
  try {
    loading.value = true;

    // 실제로는 API를 통해 거절 처리를 합니다.
    const savedRequests = JSON.parse(localStorage.getItem('memoryRequests') || '[]');
    const updatedRequests = savedRequests.map(req => {
      if (req.id === request.id) {
        return { ...req, status: 'rejected' };
      }
      return req;
    });

    localStorage.setItem('memoryRequests', JSON.stringify(updatedRequests));

    fetchRequests();
  } catch (error) {
    console.error('Error rejecting request:', error);
  } finally {
    loading.value = false;
  }
};

// 상세 정보 보기
const showDetails = (request) => {
  selectedRequest.value = request;
  showDetailDialog.value = true;
};

// 상태에 따른 색상 반환
const getStatusColor = (status) => {
  const colors = {
    pending: 'orange',
    approved: 'green',
    rejected: 'red'
  };
  return colors[status] || 'grey';
};

// 상태 텍스트 반환
const getStatusText = (status) => {
  const texts = {
    pending: '대기중',
    approved: '승인됨',
    rejected: '거절됨'
  };
  return texts[status] || status;
};

// 날짜 포맷팅
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR');
};

// 컴포넌트 마운트 시 요청 목록 불러오기
onMounted(() => {
  fetchRequests();
});
</script>

<style scoped>
.v-data-table__title {
  font-size: 1.25rem;
  font-weight: 500;
}
</style>
