<template>
  <v-app>
    <v-app-bar color="primary" dark app elevate-on-scroll>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="mr-2" />
      <div class="d-flex align-center">
        <v-btn icon @click="goToHome" class="mr-2">
          <v-icon size="24">mdi-cloud</v-icon>
        </v-btn>
        <v-toolbar-title
          v-if="!$route.meta?.neutralHeader"
          style="margin-left: -15px"
          class="text-h6 font-weight-medium text-truncate"
        >Okestro</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <template v-if="userId">
        <div class="d-flex align-center">
          <v-icon size="20" class="mr-2 d-none d-sm-flex">mdi-account</v-icon>
          <span class="login-id mr-3 text-truncate d-none d-sm-flex">{{ userId }}</span>
          <v-btn icon @click="logout" class="ml-2">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app color="#1e3a8a">
      <v-list nav dense class="sidebar-list">
        <v-list-item-title class="menu-title">메뉴</v-list-item-title>
        <v-list-item to="/catalog" link>
          <v-list-item-icon><v-icon>mdi-view-dashboard</v-icon></v-list-item-icon>
          <v-list-item-title>서비스 카탈로그</v-list-item-title>
        </v-list-item>
        <v-list-item to="/request-list" link>
          <v-list-item-icon><v-icon>mdi-format-list-bulleted</v-icon></v-list-item-icon>
          <v-list-item-title>신청 목록</v-list-item-title>
        </v-list-item>
        <v-list-item to="/monitoring" link>
          <v-list-item-icon><v-icon color="primary">mdi-monitor-dashboard</v-icon></v-list-item-icon>
          <v-list-item-title>모니터링</v-list-item-title>
        </v-list-item>
        <v-list-item to="/portfolio" link>
          <v-list-item-icon><v-icon>mdi-palette-outline</v-icon></v-list-item-icon>
          <v-list-item-title>포트폴리오</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
    <GlobalWarningModal />
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useLoadingStore } from '../stores/loading';
import GlobalWarningModal from '../components/GlobalWarningModal.vue';
const loadingStore = useLoadingStore();
const drawer = ref(false);
const router = useRouter();
const userId = computed(() => localStorage.getItem('okestro_login') === '1' ? '조기현' : '');

function logout() {
  localStorage.removeItem('okestro_login');
  router.replace('/login');
}

function goToHome() {
  window.location.href = '/';
}
</script>

<style scoped>
.sidebar-list {
  padding-top: 16px;
}

.menu-title {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  padding: 0 16px;
  margin: 8px 0;
}

.v-list-item-title {
  color: white;
}

.v-icon {
  color: white;
}

.login-id {
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 헤더 스타일 개선 */
.v-toolbar-title {
  letter-spacing: 0.5px;
  max-width: 150px;
}

@media (min-width: 600px) {
  .v-toolbar-title {
    max-width: none;
  }

  .login-id {
    max-width: 120px;
  }
}

.v-app-bar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
