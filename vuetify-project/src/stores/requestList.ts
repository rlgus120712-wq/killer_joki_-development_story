import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface RequestItem {
  id: string;
  serviceName: string;
  status: string;
  createdAt: string;
  platformType: string;
  spec: {
    cpu: number;
    memory: number;
    disk: number;
  };
}

export const useRequestListStore = defineStore('requestList', () => {
  const requests = ref<RequestItem[]>([]);

  function loadFromStorage() {
    const raw = localStorage.getItem('requestList');
    if (raw) {
      try {
        requests.value = JSON.parse(raw);
      } catch {
        // JSON 파싱 실패 시 무시 (에러 로깅 등 필요시 여기에 추가)
      }
    }
  }

  function saveToStorage() {
    localStorage.setItem('requestList', JSON.stringify(requests.value));
  }

  function addRequest(item: RequestItem) {
    requests.value.unshift(item);
    saveToStorage();
  }

  function setRequests(list: RequestItem[]) {
    requests.value = list;
    saveToStorage();
  }

  loadFromStorage();

  return { requests, addRequest, setRequests };
});
