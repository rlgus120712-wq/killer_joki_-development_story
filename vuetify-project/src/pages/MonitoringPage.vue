<template>
  <div class="monitoring-page">
    <div class="page-header">
      <h2 class="monitoring-title">플랫폼 자원 모니터링</h2>
    </div>

    <div class="platform-selector">
      <div
        v-for="item in platforms"
        :key="item.value"
        class="platform-item"
        :class="{ active: platform === item.value }"
        @click="handlePlatformClick(item.value)"
      >
        <div class="platform-icon-wrapper" :style="{ backgroundColor: item.bgColor }">
          <v-icon :color="item.iconColor" size="28">{{ item.icon }}</v-icon>
        </div>
        <span class="platform-name">{{ item.label }}</span>
      </div>
    </div>

    <div class="dashboard-grid">
      <div v-for="res in resourceList" :key="res.key" class="dashboard-card">
        <div class="card-header">
          <div class="card-icon" :style="{ backgroundColor: res.bgColor }">
            <v-icon :color="res.iconColor" size="32">{{ res.icon }}</v-icon>
          </div>
          <div class="card-title">{{ res.label }}</div>
        </div>
        <div class="card-body">
          <div class="chart-container">
            <div class="chart-value">{{ res.usage }}%</div>
            <div class="chart-gauge">
              <div
                class="chart-fill"
                :style="{
                  width: `${res.usage}%`,
                  backgroundColor: res.chartColor,
                }"
              ></div>
            </div>
            <div class="chart-stats">
              <div class="stat-item">
                <div class="stat-label">현재</div>
                <div class="stat-value">{{ res.current }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">총량</div>
                <div class="stat-value">{{ res.total }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="trend-chart">
            <div
              v-for="(point, i) in res.trend"
              :key="i"
              class="trend-point"
              :style="{
                height: `${point}%`,
                backgroundColor: res.chartColor,
                opacity: 0.7 + i / (res.trend.length * 2),
              }"
            ></div>
          </div>
          <div class="trend-info">
            <v-icon
              size="16"
              :color="res.trend[res.trend.length - 1] > res.trend[0] ? '#FF5252' : '#4CAF50'"
            >
              {{
                res.trend[res.trend.length - 1] > res.trend[0] ? 'mdi-arrow-up' : 'mdi-arrow-down'
              }}
            </v-icon>
            <span
              :style="{
                color: res.trend[res.trend.length - 1] > res.trend[0] ? '#FF5252' : '#4CAF50',
              }"
            >
              {{ Math.abs(res.trend[res.trend.length - 1] - res.trend[0]).toFixed(1) }}%
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 알람 목록 표시 -->
    <div class="alarm-list">
      <h3>알람 목록</h3>
      <ul>
        <li v-for="alarm in filteredAlarms" :key="alarm.id">
          {{ alarm.message }} ({{ alarm.timestamp }})
          <v-icon @click="resolveAlarm(alarm.id)" size="16" color="#FF5252">mdi-close</v-icon>
        </li>
      </ul>
    </div>

    <!-- vSphere 메모리 사용량 표시 -->
<!--    <v-card class="mb-4">
      <v-card-title>
        <div class="text-h6">vSphere 메모리 사용량</div>
      </v-card-title>
      <v-card-text>
        <v-progress-linear
          :model-value="memoryUsage"
          :color="memoryColor"
          height="25"
          class="mt-2"
        >
          <template v-slot:default="{ value }">
            <strong>{{ Math.ceil(value) }}%</strong>
          </template>
        </v-progress-linear>

        <v-btn
          v-if="isMemoryAlert"
          color="primary"
          class="mt-4"
          @click="goToChangeRequest"
        >
          메모리 확장 신청
        </v-btn>
      </v-card-text>
    </v-card>-->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useVSphereStore } from '../stores/vsphereStore';
import { useWarningModalStore } from '../stores/warningModal';

const router = useRouter();
const vsphereStore = useVSphereStore();
const warningModal = useWarningModalStore();

// 플랫폼 정의 - AWS, NCP, OpenShift, vSphere, OpenStack, K8s
const platforms = ref([
  {
    value: 'aws',
    label: 'AWS',
    icon: 'mdi-aws',
    bgColor: '#0078d7',
    iconColor: 'white',
  },
  {
    value: 'ncp',
    label: 'NCP',
    icon: 'mdi-cloud',
    bgColor: '#1e88e5',
    iconColor: 'white',
  },
  {
    value: 'openshift',
    label: 'OpenShift',
    icon: 'mdi-ship-wheel',
    bgColor: '#2196f3',
    iconColor: 'white',
  },
  {
    value: 'vsphere',
    label: 'vSphere',
    icon: 'mdi-server',
    bgColor: '#42a5f5',
    iconColor: 'white',
  },
  {
    value: 'openstack',
    label: 'OpenStack',
    icon: 'mdi-cloud-outline',
    bgColor: '#64b5f6',
    iconColor: 'white',
  },
  {
    value: 'k8s',
    label: 'K8s',
    icon: 'mdi-kubernetes',
    bgColor: '#90caf9',
    iconColor: 'white',
  },
]);

const platform = ref('aws');

// 트렌드 데이터 생성 함수
const generateTrend = () => {
  const points = [];
  let value = 30 + Math.random() * 40;
  for (let i = 0; i < 12; i++) {
    value += (Math.random() - 0.5) * 15;
    value = Math.max(5, Math.min(95, value));
    points.push(value);
  }
  return points;
};

// 리소스 데이터 생성
const createResourceData = () => {
  return {
    aws: [
      {
        key: 'cpu',
        label: 'CPU',
        icon: 'mdi-cpu-64-bit',
        bgColor: '#0078d7',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 68,
        current: '6.8 vCPU',
        total: '10 vCPU',
        trend: generateTrend(),
      },
      {
        key: 'memory',
        label: 'Memory',
        icon: 'mdi-memory',
        bgColor: '#0078d7',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 54,
        current: '13.5 GB',
        total: '25 GB',
        trend: generateTrend(),
      },
      {
        key: 'disk',
        label: 'Disk',
        icon: 'mdi-harddisk',
        bgColor: '#0078d7',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 37,
        current: '370 GB',
        total: '1 TB',
        trend: generateTrend(),
      },
      {
        key: 'network',
        label: 'Network',
        icon: 'mdi-network',
        bgColor: '#0078d7',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 21,
        current: '210 Mbps',
        total: '1 Gbps',
        trend: generateTrend(),
      },
    ],
    ncp: [
      {
        key: 'cpu',
        label: 'CPU',
        icon: 'mdi-cpu-64-bit',
        bgColor: '#1e88e5',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 42,
        current: '8.4 vCPU',
        total: '20 vCPU',
        trend: generateTrend(),
      },
      {
        key: 'memory',
        label: 'Memory',
        icon: 'mdi-memory',
        bgColor: '#1e88e5',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 71,
        current: '24.8 GB',
        total: '35 GB',
        trend: generateTrend(),
      },
      {
        key: 'disk',
        label: 'Disk',
        icon: 'mdi-harddisk',
        bgColor: '#1e88e5',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 63,
        current: '1.26 TB',
        total: '2 TB',
        trend: generateTrend(),
      },
      {
        key: 'network',
        label: 'Network',
        icon: 'mdi-network',
        bgColor: '#1e88e5',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 47,
        current: '470 Mbps',
        total: '1 Gbps',
        trend: generateTrend(),
      },
    ],
    openshift: [
      {
        key: 'cpu',
        label: 'CPU',
        icon: 'mdi-cpu-64-bit',
        bgColor: '#2196f3',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 57,
        current: '17.1 vCPU',
        total: '30 vCPU',
        trend: generateTrend(),
      },
      {
        key: 'memory',
        label: 'Memory',
        icon: 'mdi-memory',
        bgColor: '#2196f3',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 38,
        current: '30.4 GB',
        total: '80 GB',
        trend: generateTrend(),
      },
      {
        key: 'disk',
        label: 'Disk',
        icon: 'mdi-harddisk',
        bgColor: '#2196f3',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 49,
        current: '2.45 TB',
        total: '5 TB',
        trend: generateTrend(),
      },
      {
        key: 'network',
        label: 'Network',
        icon: 'mdi-network',
        bgColor: '#2196f3',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 29,
        current: '580 Mbps',
        total: '2 Gbps',
        trend: generateTrend(),
      },
    ],
    vsphere: [
      {
        key: 'cpu',
        label: 'CPU',
        icon: 'mdi-cpu-64-bit',
        bgColor: '#42a5f5',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 61,
        current: '12.2 vCPU',
        total: '20 vCPU',
        trend: generateTrend(),
      },
      {
        key: 'memory',
        label: 'Memory',
        icon: 'mdi-memory',
        bgColor: '#42a5f5',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 100,
        current: '100 GB',
        total: '100 GB',
        trend: generateTrend(),
      },
      {
        key: 'disk',
        label: 'Disk',
        icon: 'mdi-harddisk',
        bgColor: '#42a5f5',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 72,
        current: '3.6 TB',
        total: '5 TB',
        trend: generateTrend(),
      },
      {
        key: 'network',
        label: 'Network',
        icon: 'mdi-network',
        bgColor: '#42a5f5',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 35,
        current: '1.4 Gbps',
        total: '4 Gbps',
        trend: generateTrend(),
      },
    ],
    openstack: [
      {
        key: 'cpu',
        label: 'CPU',
        icon: 'mdi-cpu-64-bit',
        bgColor: '#64b5f6',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 53,
        current: '10.6 vCPU',
        total: '20 vCPU',
        trend: generateTrend(),
      },
      {
        key: 'memory',
        label: 'Memory',
        icon: 'mdi-memory',
        bgColor: '#64b5f6',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 67,
        current: '53.6 GB',
        total: '80 GB',
        trend: generateTrend(),
      },
      {
        key: 'disk',
        label: 'Disk',
        icon: 'mdi-harddisk',
        bgColor: '#64b5f6',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 41,
        current: '1.64 TB',
        total: '4 TB',
        trend: generateTrend(),
      },
      {
        key: 'network',
        label: 'Network',
        icon: 'mdi-network',
        bgColor: '#64b5f6',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 39,
        current: '780 Mbps',
        total: '2 Gbps',
        trend: generateTrend(),
      },
    ],
    k8s: [
      {
        key: 'cpu',
        label: 'CPU',
        icon: 'mdi-cpu-64-bit',
        bgColor: '#90caf9',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 48,
        current: '9.6 vCPU',
        total: '20 vCPU',
        trend: generateTrend(),
      },
      {
        key: 'memory',
        label: 'Memory',
        icon: 'mdi-memory',
        bgColor: '#90caf9',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 62,
        current: '31 GB',
        total: '50 GB',
        trend: generateTrend(),
      },
      {
        key: 'disk',
        label: 'Disk',
        icon: 'mdi-harddisk',
        bgColor: '#90caf9',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 55,
        current: '2.75 TB',
        total: '5 TB',
        trend: generateTrend(),
      },
      {
        key: 'network',
        label: 'Network',
        icon: 'mdi-network',
        bgColor: '#90caf9',
        iconColor: 'white',
        chartColor: '#1a237e',
        usage: 41,
        current: '1.64 Gbps',
        total: '4 Gbps',
        trend: generateTrend(),
      },
    ],
  };
};

let resourceMock = createResourceData();
const resourceList = computed(() => resourceMock[platform.value as keyof typeof resourceMock]);

// 알람 상태를 저장할 배열
interface Alarm {
  id: number;
  message: string;
  timestamp: string;
  platform: string;
}

const alarms = ref<Alarm[]>([]);
let alarmIdCounter = 0;

const generateAlarm = (platform: string, message: string) => {
  const newAlarm: Alarm = {
    id: alarmIdCounter++,
    message: `[${platform.toUpperCase()}] ${message}`,
    timestamp: new Date().toLocaleString(),
    platform: platform,
  };
  alarms.value.push(newAlarm);
};

const resolveAlarm = (id: number) => {
  alarms.value = alarms.value.filter(alarm => alarm.id !== id);
};

const filteredAlarms = computed(() => {
  return alarms.value.filter(alarm => alarm.platform === platform.value);
});

// 알람 발생 로직
const checkAlarms = () => {
  // 기존 알람은 유지

  // vSphere 플랫폼일 때만 알람 발생 로직 추가
  if (platform.value === 'vsphere') {
    // 메모리 사용량 100%에 대한 특정 알람 메시지
    const vsphereMemory = resourceList.value.find(res => res.key === 'memory');
    if (vsphereMemory && vsphereMemory.usage === 100 && !alarms.value.some(a => a.platform === 'vsphere' && a.message.includes('대용량 트래픽 발생으로 인한 메모리 사용량 급증')))
    {
      generateAlarm('vsphere', '대용량 트래픽 발생으로 인한 메모리 사용량 급증');
    }

    // 최소 하나의 vSphere 알람 보장 (메모리 알람이 아니라면 다른 알람 생성)
    if (!alarms.value.some(a => a.platform === 'vsphere')) {
      generateAlarm('vsphere', 'vSphere 호스트 연결 끊김');
    }

    // 랜덤으로 추가 알람 발생 (메모리 알람과 중복되지 않도록)
    const randomAlarmType = Math.floor(Math.random() * 2); // 0 또는 1
    if (randomAlarmType === 0) {
      if (!alarms.value.some(a => a.platform === 'vsphere' && a.message.includes('CPU 사용량 급증 감지')))
      {
        generateAlarm('vsphere', 'CPU 사용량 급증 감지');
      }
    } else if (randomAlarmType === 1) {
      if (!alarms.value.some(a => a.platform === 'vsphere' && a.message.includes('데이터스토어 용량 부족')))
      {
        generateAlarm('vsphere', '데이터스토어 용량 부족');
      }
    }
  }

  // 다른 플랫폼에 대한 알람 로직도 필요하다면 여기에 추가
};

// vSphere 메모리 사용량을 체크하는 함수
const checkVSphereMemoryAlert = () => {
  if (resourceMock && resourceMock.vsphere) {
    const memory = resourceMock.vsphere.find(item => item.key === 'memory');
    if (memory && memory.usage >= 100) {
      warningModal.showModal('경고', 'vSphere 메모리 사용량이 100%에 도달했습니다!');
    }
  }
};

// 플랫폼 선택 핸들러
const handlePlatformClick = (selectedPlatform: string) => {
  platform.value = selectedPlatform;

  // vSphere를 클릭한 경우 메모리 사용량 체크 및 모달 표시
  if (selectedPlatform === 'vsphere') {
    checkVSphereMemoryAlert();
  }
};

// resourceList가 변경될 때마다 알람을 체크합니다.
watch(resourceList, () => {
  checkAlarms(); // 기존 알람 체크 로직
  // vSphere 메모리 사용량 체크 제거 (아이콘 클릭 시에만 체크)
});

onMounted(() => {
  updateInterval = window.setInterval(updateData, 5000);
  checkAlarms(); // 초기 로드 시 알람 체크
  // 페이지 로드 시 자동으로 vSphere 메모리 체크하는 코드 제거
});

// 실시간 데이터 업데이트 시뮬레이션
let updateInterval: number;

const updateData = () => {
  resourceMock = createResourceData();
  // checkAlarms(); // watch에서 호출되므로 여기서 다시 호출할 필요 없음
};

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
});

// vSphere 메모리 사용량 표시
const memoryUsage = computed(() => vsphereStore.memoryUsage);
const actualMemoryUsage = computed(() => vsphereStore.actualMemoryUsage);
const isMemoryAlert = computed(() => vsphereStore.isMemoryAlert);

// 메모리 사용량에 따른 색상 계산
const memoryColor = computed(() => {
  const usage = actualMemoryUsage.value;
  if (usage > 80) return 'negative';
  if (usage > 60) return 'warning';
  return 'positive';
});

// 변경 신청 페이지로 이동
const goToChangeRequest = () => {
  router.push('/change-request');
};

// 컴포넌트 마운트 시 메모리 사용량 체크
onMounted(() => {
  checkMemoryUsage();
});

// 메모리 사용량 체크 함수
const checkMemoryUsage = () => {
  // 실제로는 API 호출을 통해 메모리 사용량을 가져옵니다.
  // 여기서는 테스트를 위해 주석 처리
  // fetchMemoryUsage();
};

// 메모리 사용량이 변경될 때마다 체크
watch(() => vsphereStore.memoryUsage, () => {
  checkMemoryUsage();
});
</script>

<style scoped>
.monitoring-page {
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  max-width: 100%;
  box-sizing: border-box;
}

.page-header {
  max-width: 1400px;
  margin: 0 auto 30px;
  padding: 0 20px;
}

.platform-selector {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin: 0 auto 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  max-width: 1400px;
}

.platform-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 15px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
}

.platform-icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.platform-icon-wrapper .v-icon {
  font-size: 28px !important;
}

.platform-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #ffffff !important;
}

.platform-item.active {
  background: rgba(255, 255, 255, 0.2);
}

.platform-item.active .platform-icon-wrapper {
  background-color: rgba(255, 255, 255, 0.9);
  border-color: transparent;
}

.platform-item.active .platform-icon-wrapper .v-icon {
  color: #1e3a8a !important;
}

.platform-item.active .platform-name {
  color: #ffffff !important;
}

.monitoring-content {
  flex-grow: 1;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.dashboard-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  box-sizing: border-box;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.card-header {
  padding: 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.card-icon {
  font-size: 32px !important;
  margin-right: 10px;
  border-radius: 50%;
  border: none;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
}

.card-body {
  padding: 20px 16px;
}

.chart-container {
  position: relative;
}

.chart-value {
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
}

.chart-gauge {
  position: relative;
  width: 100%;
  height: 15px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 7.5px;
  overflow: hidden;
  margin-bottom: 16px;
}

.chart-fill {
  height: 100%;
  border-radius: 7.5px;
  transition: width 1s ease-in-out;
  background-color: #1a237e;
}

.chart-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  font-size: 1rem;
  color: #ffffff;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  font-weight: 500;
  color: #ffffff;
}

.stat-value {
  font-weight: 700;
  color: #ffffff;
}

.card-footer {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.trend-chart {
  width: 70%;
  height: 70px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
  gap: 3px;
  padding: 5px;
}

.trend-point {
  flex: 1;
  background-color: #1a237e;
  border-radius: 3px;
  transition: height 0.5s ease;
}

.trend-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 1.2rem;
  color: #ffffff;
}

.alarm-list {
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

.alarm-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.alarm-list li {
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.alarm-list li:last-child {
  border-bottom: none;
}

/* 반응형 디자인 */
@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .platform-selector {
    flex-wrap: wrap;
    justify-content: center;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
