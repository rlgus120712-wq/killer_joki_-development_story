<template>
  <transition name="fade">
    <div v-if="show" class="global-loading-overlay">
      <div class="global-loading-inner">
        <q-spinner-dots size="48px" color="primary" />
        <div class="global-loading-text">잠시만 기다려 주세요...</div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps<{ show: boolean }>();
</script>

<style scoped>
.global-loading-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 9999;
  background: rgba(255,255,255,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}
.global-loading-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.global-loading-text {
  font-size: 1.1rem;
  color: #2563eb;
  font-weight: 600;
  letter-spacing: -0.5px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
