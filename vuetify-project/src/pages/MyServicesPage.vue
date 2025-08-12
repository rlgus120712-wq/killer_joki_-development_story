<template>
  <v-container class="my-services-page" fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="my-services-title">내 서비스 관리</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-list two-line class="my-services-list">
          <v-list-item v-for="sub in mySubscriptions" :key="sub.id">
            <v-list-item-content>
              <v-list-item-title>{{ getServiceName(sub.serviceId) }}</v-list-item-title>
              <v-list-item-subtitle>신청일: {{ sub.requestedAt }}</v-list-item-subtitle>
              <v-list-item-subtitle>상태: {{ statusLabel(sub.status) }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="mySubscriptions.length === 0">
            <v-list-item-content>신청한 서비스가 없습니다.</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { mockSubscriptions, mockServices } from '../types/service-catalog';

const userId = 'user1'; // 예시: 실제 로그인 사용자 ID로 대체 필요
const mySubscriptions = computed(() => mockSubscriptions.filter(sub => sub.userId === userId));

function getServiceName(serviceId: string) {
  const svc = mockServices.find(s => s.id === serviceId);
  return svc ? svc.name : '알 수 없음';
}

function statusLabel(status: string) {
  switch (status) {
    case 'active': return '이용 중';
    case 'pending': return '신청 대기';
    case 'rejected': return '반려';
    default: return status;
  }
}
</script>

<style scoped>
.my-services-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding-top: 32px;
}
.my-services-title {
  font-size: 1.5rem;
  font-weight: 900;
  color: #2563eb;
  margin-bottom: 24px;
  letter-spacing: -1px;
}
.my-services-list {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(59,130,246,0.07);
  padding: 18px 0;
}
</style>
