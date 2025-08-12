<template>
  <v-container class="pa-4">
    <v-btn icon variant="text" @click="goBack" class="mb-4">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <div v-if="service">
      <h2 class="text-h5 mb-2">{{ service.name }}</h2>
      <p class="mb-4">{{ service.description }}</p>
      <v-chip v-for="tag in service.tags" :key="tag" color="secondary" class="mr-2 mb-2">{{ tag }}</v-chip>
      <div class="mt-4">
        <v-btn color="primary" @click="requestService">서비스 신청</v-btn>
      </div>
    </div>
    <div v-else class="d-flex align-center flex-column">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <div class="mt-2">서비스 정보를 불러오는 중...</div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mockServices, mockPlatforms } from '../types/service-catalog';
import type { ServiceItem } from '../types/service-catalog';
import { useRequestListStore } from '../stores/requestList';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;
const service = ref<ServiceItem | undefined>(mockServices.find(s => s.id === id));
const requestListStore = useRequestListStore();

function goBack() {
  router.back();
}

function requestService() {
  if (!service.value) return;
  const now = new Date();
  const platformId = service.value.platformIds[0] || '-';
  const platform = (mockPlatforms.find(p => p.id === platformId)?.name) || platformId || '-';
  requestListStore.addRequest({
    id: `${service.value.id}-${now.getTime()}`,
    serviceName: service.value.name,
    status: '신청 대기',
    createdAt: now.toLocaleString(),
    platformType: platform,
    spec: { cpu: 1, memory: 1, disk: 1 },
  });

  // Dialog 대신 Vuetify 다이얼로그 사용
  alert(`${service.value.name} 서비스 신청이 접수되었습니다.\n서비스 변경 신청 관리에서 내역을 확인하실 수 있습니다!`);
  router.replace('/request-list');
}
</script>
