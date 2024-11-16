<script setup lang="ts">
import Alert from '~/components/dialog/Alert.vue';
import Confirm from '~/components/dialog/Confirm.vue';
import { useUserStore } from '~/store/user';
const { hasToken } = useAuth();
const router = useRouter();
if (!hasToken()) {
  router.replace('/login');
}
// 어드민 유저 체크
const userStore = useUserStore();

const isAdmin = await userStore.checkAdminUser();
if (!isAdmin) {
  router.replace('/user');
}

const cUserInfo = computed(() => userStore.userInfo);

const showDrawer = ref(false);
const drawer = ref(null);
const links = [
  ['mdi-home', '홈', '/'],
  ['mdi-account-multiple', '회원관리', '/manage/users'],
];

onMounted(async () => {
  showDrawer.value = true;
  await userStore.getUserInfo();
});
</script>
<template>
  <Alert />
  <Confirm />
  <v-app id="inspire">
    <v-navigation-drawer v-if="showDrawer" v-model="drawer">
      <v-sheet class="pa-4 d-flex flex-column align-center justify-center">
        <v-avatar class="mb-4" color="grey-darken-1" size="50%">
          <v-img
            v-if="cUserInfo?.profileImage"
            :src="cUserInfo?.profileImage"
          />
          <v-icon v-else size="50%">mdi-account</v-icon>
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
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
