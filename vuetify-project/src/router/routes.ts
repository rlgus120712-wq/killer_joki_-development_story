import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('../pages/LoginPage.vue'),
    name: 'login',
  },
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/MainPage.vue'), name: 'main' },
      { path: 'catalog', component: () => import('../pages/ServiceCatalogPage.vue'), name: 'service-catalog' },
      { path: 'catalog/:id', component: () => import('../pages/ServiceDetailPage.vue'), name: 'service-detail', props: true },
      { path: 'change-request', component: () => import('../pages/ChangeRequestPage.vue'), name: 'ChangeRequest', meta: { requiresAuth: false } },
      { path: 'request-list', component: () => import('../pages/ChangeRequestPage.vue'), name: 'request-list' },
      { path: 'monitoring', component: () => import('../pages/MonitoringPage.vue'), name: 'monitoring' },
      // 기존 메뉴 라우트 제거
      // { path: 'my-services', component: () => import('../pages/MyServicesPage.vue'), name: 'my-services' },
      // { path: 'admin/service', component: () => import('../pages/AdminServiceManagePage.vue'), name: 'admin-service-manage' },
      { path: 'portfolio', component: () => import('../pages/PortfolioPage.vue'), name: 'portfolio', meta: { neutralHeader: true } },
      {
        path: 'change-request',
        component: () => import('../pages/ChangeRequestPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'change-request-list',
        component: () => import('../pages/ChangeRequestListPage.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue'),
  },
];

export default routes;
