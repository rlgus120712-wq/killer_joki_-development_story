import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { requireLogin } from './auth-guard';
import { applyRouterLoading } from './router-loading';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

// 브라우저 환경에서는 웹 히스토리 사용, 그 외에는 해시 히스토리 사용
const createHistory = typeof window !== 'undefined'
  ? createWebHistory
  : createWebHashHistory;

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createHistory('/'),
});

router.beforeEach(requireLogin);
applyRouterLoading(router);

export default router;
