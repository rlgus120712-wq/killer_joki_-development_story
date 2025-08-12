import { useLoadingStore } from '../stores/loading';
import type { Router } from 'vue-router';

export function applyRouterLoading(router: Router) {
  router.beforeEach((to, from, next) => {
    useLoadingStore().show();
    // 살짝 더 자연스럽게 보이도록 200ms 지연
    setTimeout(() => next(), 200);
  });
  router.afterEach(() => {
    setTimeout(() => {
      useLoadingStore().hide();
    }, 400); // 애니메이션 자연스러운 종료를 위해 약간의 딜레이
  });
}
