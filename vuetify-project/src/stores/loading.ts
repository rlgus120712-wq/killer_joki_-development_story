import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
  const globalLoading = ref(false);
  function show() { globalLoading.value = true; }
  function hide() { globalLoading.value = false; }
  return { globalLoading, show, hide };
});
