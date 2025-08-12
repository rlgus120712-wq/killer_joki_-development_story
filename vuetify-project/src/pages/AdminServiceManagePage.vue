<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">서비스 등록/수정 (관리자)</div>
    <q-form @submit.prevent="onSubmit">
      <q-input v-model="form.name" label="서비스명" filled class="q-mb-md" required />
      <q-input v-model="form.description" label="설명" filled class="q-mb-md" required />
      <q-select v-model="form.categoryId" :options="categoryOptions" label="카테고리" filled class="q-mb-md" emit-value map-options required />
      <q-select v-model="form.platformIds" :options="platformOptions" label="플랫폼" filled class="q-mb-md" multiple emit-value map-options required />
      <q-input v-model="form.tags" label="태그 (쉼표구분)" filled class="q-mb-md" />
      <q-btn type="submit" color="primary" label="저장" />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { mockCategories, mockPlatforms } from '../types/service-catalog';

const form = ref({
  name: '',
  description: '',
  categoryId: '',
  platformIds: [],
  tags: '',
});

const categoryOptions = mockCategories.map(cat => ({ label: cat.name, value: cat.id }));
const platformOptions = mockPlatforms.map(plat => ({ label: plat.name, value: plat.id }));

function onSubmit() {
  // 실제 저장 로직 필요 (API 연동 등)
  alert('저장되었습니다! (실제 저장 로직 필요)');
}
</script>
