<script setup lang="ts">
import Alert from '~/components/dialog/Alert.vue';
import Confirm from '~/components/dialog/Confirm.vue';
import { useAuthStore } from '~/store/auth';
import { useUserStore } from '~/store/user';

const userStore = useUserStore();
const cUserInfo = computed(() => userStore.userInfo);

const showDrawer = ref(false);
const links = [
  ['mdi-home', '홈', '/'],
  ['mdi-account-multiple', '회원관리', '/manage/users'],
  ['mdi-history', '적립금 내역', '/manage/pointHistory'],
];

const authStore = useAuthStore();
const logout = () => {
  authStore.logout();
};

onMounted(async () => {
  showDrawer.value = true;
  await userStore.getUserInfo();
});
</script>
<template>
  <Alert />
  <Confirm />
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-nav-icon
        @click="showDrawer = !showDrawer"
        permanent
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="showDrawer" expand-on-hover>
      <v-sheet class="pa-4 d-flex flex-column align-center justify-center">
        <v-avatar class="mb-4" color="grey-darken-1" size="50%">
          <v-img
            v-if="cUserInfo?.profileImage"
            :src="cUserInfo?.profileImage"
          />
          <v-icon v-else size="100">mdi-account</v-icon>
        </v-avatar>

        <div class="text-h6">{{ cUserInfo?.email }}</div>
        <div class="text-body-1">{{ cUserInfo?.name }}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text, link] in links"
          :key="icon"
          :prepend-icon="icon"
          :title="text"
          :to="link"
        ></v-list-item>
      </v-list>

      <!-- 로그아웃 -->
      <template #append>
        <v-divider />
        <v-list>
          <v-list-item
            prepend-icon="mdi-logout"
            title="로그아웃"
            @click="logout"
          />
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
