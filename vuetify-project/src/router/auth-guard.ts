import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export function requireLogin(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  if (to.path === '/login') {
    next();
    return;
  }
  const isLogin = localStorage.getItem('okestro_login') === '1';
  if (!isLogin) {
    next({ path: '/login' });
  } else {
    next();
  }
}
