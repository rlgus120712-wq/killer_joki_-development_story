// 서비스 카탈로그 타입 정의
export interface ServiceCategory {
  id: string;
  name: string;
  count?: number;
}

export interface ServicePlatform {
  id: string;
  name: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  platformIds: string[];
  imageUrl?: string;
  tags?: string[];
  isBookmarked?: boolean;
}

export interface ServiceSubscription {
  id: string;
  userId: string;
  serviceId: string;
  status: 'active' | 'pending' | 'rejected';
  requestedAt: string;
}

// 목데이터 예시
export const mockCategories: ServiceCategory[] = [
  { id: 'cat1', name: 'AI 서비스', count: 2 },
  { id: 'cat2', name: '스토리지', count: 1 },
  { id: 'cat3', name: '보안', count: 1 },
];

export const mockPlatforms: ServicePlatform[] = [
  { id: 'plat1', name: 'AWS' },
  { id: 'plat2', name: 'Azure' },
  { id: 'plat3', name: 'GCP' },
];

export const mockServices: ServiceItem[] = [
  {
    id: 'svc1',
    name: 'AI 챗봇',
    description: '고객 상담용 AI 챗봇 서비스',
    categoryId: 'cat1',
    platformIds: ['plat1', 'plat2'],
    imageUrl: '',
    tags: ['AI', '챗봇'],
    isBookmarked: false,
  },
  {
    id: 'svc2',
    name: '문서 요약 AI',
    description: '문서 자동 요약 인공지능',
    categoryId: 'cat1',
    platformIds: ['plat3'],
    imageUrl: '',
    tags: ['AI', '요약'],
    isBookmarked: true,
  },
  {
    id: 'svc3',
    name: '클라우드 스토리지',
    description: '안전한 파일 저장 서비스',
    categoryId: 'cat2',
    platformIds: ['plat1'],
    imageUrl: '',
    tags: ['스토리지'],
    isBookmarked: false,
  },
  {
    id: 'svc4',
    name: '보안 모니터링',
    description: '실시간 위협 탐지 및 대응',
    categoryId: 'cat3',
    platformIds: ['plat2', 'plat3'],
    imageUrl: '',
    tags: ['보안'],
    isBookmarked: false,
  },
];

export const mockSubscriptions: ServiceSubscription[] = [
  {
    id: 'sub1',
    userId: 'user1',
    serviceId: 'svc1',
    status: 'active',
    requestedAt: '2025-07-01T10:00:00+09:00',
  },
  {
    id: 'sub2',
    userId: 'user1',
    serviceId: 'svc3',
    status: 'pending',
    requestedAt: '2025-07-25T14:00:00+09:00',
  },
];
