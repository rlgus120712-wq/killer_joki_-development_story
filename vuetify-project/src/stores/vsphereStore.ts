import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useVSphereStore = defineStore('vsphere', () => {
  // 로컬 스토리지에서 초기값 로드
  const loadMemoryUsage = () => {
    const saved = localStorage.getItem('vsphereMemoryUsage');
    return saved ? Number(saved) : 100; // 기본값 100%
  };

  const loadCpuUsage = () => {
    const saved = localStorage.getItem('vsphereCpuUsage');
    return saved ? Number(saved) : 80; // 기본값 80%
  };

  const loadStorageUsage = () => {
    const saved = localStorage.getItem('vsphereStorageUsage');
    return saved ? Number(saved) : 60; // 기본값 60%
  };

  const loadNetworkUsage = () => {
    const saved = localStorage.getItem('vsphereNetworkUsage');
    return saved ? Number(saved) : 30; // 기본값 30%
  };

  // 메모리 관련 상태
  const memoryUsage = ref(loadMemoryUsage());
  const approvedMemoryIncrease = ref(0);

  // CPU 관련 상태
  const cpuUsage = ref(loadCpuUsage());
  const approvedCpuIncrease = ref(0);

  // 스토리지 관련 상태
  const storageUsage = ref(loadStorageUsage());
  const approvedStorageIncrease = ref(0);

  // 네트워크 관련 상태
  const networkUsage = ref(loadNetworkUsage());
  const approvedNetworkIncrease = ref(0);

  // VM 목록 상태
  const vmList = ref([]);
  const selectedVm = ref(null);

  // 시스템 상태
  const isSystemHealthy = ref(true);
  const lastUpdated = ref(new Date());

  // 실제 사용량 계산 (기본 사용량 - 승인된 증가량)
  const actualMemoryUsage = computed(() => {
    return Math.max(0, memoryUsage.value - approvedMemoryIncrease.value);
  });

  const actualCpuUsage = computed(() => {
    return Math.max(0, cpuUsage.value - approvedCpuIncrease.value);
  });

  const actualStorageUsage = computed(() => {
    return Math.max(0, storageUsage.value - approvedStorageIncrease.value);
  });

  const actualNetworkUsage = computed(() => {
    return Math.max(0, networkUsage.value - approvedNetworkIncrease.value);
  });

  // 알람 상태 계산 (40% 초과 시 true)
  const isMemoryAlert = computed(() => {
    return actualMemoryUsage.value > 40;
  });

  const isCpuAlert = computed(() => {
    return actualCpuUsage.value > 70;
  });

  const isStorageAlert = computed(() => {
    return actualStorageUsage.value > 80;
  });

  const isNetworkAlert = computed(() => {
    return actualNetworkUsage.value > 90;
  });

  // 전체 알람 상태
  const hasAnyAlert = computed(() => {
    return isMemoryAlert.value || isCpuAlert.value || isStorageAlert.value || isNetworkAlert.value;
  });

  // 리소스 사용량 설정 함수들
  const setMemoryUsage = (usage: number) => {
    memoryUsage.value = usage;
    localStorage.setItem('vsphereMemoryUsage', usage.toString());
  };

  const setCpuUsage = (usage: number) => {
    cpuUsage.value = usage;
    localStorage.setItem('vsphereCpuUsage', usage.toString());
  };

  const setStorageUsage = (usage: number) => {
    storageUsage.value = usage;
    localStorage.setItem('vsphereStorageUsage', usage.toString());
  };

  const setNetworkUsage = (usage: number) => {
    networkUsage.value = usage;
    localStorage.setItem('vsphereNetworkUsage', usage.toString());
  };

  // 리소스 증가 승인 처리 함수들
  const approveMemoryIncrease = (increaseAmount: number) => {
    approvedMemoryIncrease.value += increaseAmount;
  };

  const approveCpuIncrease = (increaseAmount: number) => {
    approvedCpuIncrease.value += increaseAmount;
  };

  const approveStorageIncrease = (increaseAmount: number) => {
    approvedStorageIncrease.value += increaseAmount;
  };

  const approveNetworkIncrease = (increaseAmount: number) => {
    approvedNetworkIncrease.value += increaseAmount;
  };

  // 리소스 사용량 업데이트 (테스트용)
  const updateMemoryUsage = (usage: number) => {
    memoryUsage.value = usage;
  };

  const updateCpuUsage = (usage: number) => {
    cpuUsage.value = usage;
  };

  const updateStorageUsage = (usage: number) => {
    storageUsage.value = usage;
  };

  const updateNetworkUsage = (usage: number) => {
    networkUsage.value = usage;
  };

  // 리소스 확장 신청 함수들
  const requestMemoryExtension = () => {
    setMemoryUsage(40);
  };

  const requestCpuExtension = () => {
    setCpuUsage(70);
  };

  const requestStorageExtension = () => {
    setStorageUsage(80);
  };

  const requestNetworkExtension = () => {
    setNetworkUsage(90);
  };

  // 전체 리소스 상태 확인
  const isMemoryFull = computed(() => memoryUsage.value >= 100);
  const isCpuFull = computed(() => cpuUsage.value >= 100);
  const isStorageFull = computed(() => storageUsage.value >= 100);
  const isNetworkFull = computed(() => networkUsage.value >= 100);

  // VM 관리 함수들
  const setVmList = (vms: any[]) => {
    vmList.value = vms;
  };

  const selectVm = (vm: any) => {
    selectedVm.value = vm;
  };

  const addVm = (vm: any) => {
    vmList.value.push(vm);
  };

  const removeVm = (vmId: string) => {
    vmList.value = vmList.value.filter((vm: any) => vm.id !== vmId);
  };

  // 시스템 상태 관리
  const setSystemHealth = (healthy: boolean) => {
    isSystemHealthy.value = healthy;
  };

  const updateLastUpdated = () => {
    lastUpdated.value = new Date();
  };

  // 전체 상태 초기화
  const resetAllUsage = () => {
    setMemoryUsage(0);
    setCpuUsage(0);
    setStorageUsage(0);
    setNetworkUsage(0);
    approvedMemoryIncrease.value = 0;
    approvedCpuIncrease.value = 0;
    approvedStorageIncrease.value = 0;
    approvedNetworkIncrease.value = 0;
  };

  // 리소스 사용량 통계
  const getResourceSummary = computed(() => {
    return {
      memory: {
        usage: actualMemoryUsage.value,
        alert: isMemoryAlert.value,
        full: isMemoryFull.value
      },
      cpu: {
        usage: actualCpuUsage.value,
        alert: isCpuAlert.value,
        full: isCpuFull.value
      },
      storage: {
        usage: actualStorageUsage.value,
        alert: isStorageAlert.value,
        full: isStorageFull.value
      },
      network: {
        usage: actualNetworkUsage.value,
        alert: isNetworkAlert.value,
        full: isNetworkFull.value
      }
    };
  });

  return {
    // 상태값들
    memoryUsage,
    cpuUsage,
    storageUsage,
    networkUsage,
    approvedMemoryIncrease,
    approvedCpuIncrease,
    approvedStorageIncrease,
    approvedNetworkIncrease,
    vmList,
    selectedVm,
    isSystemHealthy,
    lastUpdated,

    // 계산된 값들
    actualMemoryUsage,
    actualCpuUsage,
    actualStorageUsage,
    actualNetworkUsage,
    isMemoryAlert,
    isCpuAlert,
    isStorageAlert,
    isNetworkAlert,
    hasAnyAlert,
    isMemoryFull,
    isCpuFull,
    isStorageFull,
    isNetworkFull,
    getResourceSummary,

    // 액션 함수들
    setMemoryUsage,
    setCpuUsage,
    setStorageUsage,
    setNetworkUsage,
    approveMemoryIncrease,
    approveCpuIncrease,
    approveStorageIncrease,
    approveNetworkIncrease,
    updateMemoryUsage,
    updateCpuUsage,
    updateStorageUsage,
    updateNetworkUsage,
    requestMemoryExtension,
    requestCpuExtension,
    requestStorageExtension,
    requestNetworkExtension,
    setVmList,
    selectVm,
    addVm,
    removeVm,
    setSystemHealth,
    updateLastUpdated,
    resetAllUsage
  };
});
