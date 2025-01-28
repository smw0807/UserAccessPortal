<script setup lang="ts">
const open = ref(false);
const handleOpen = () => (open.value = true);
const handleClose = () => (open.value = false);
</script>
<template>
  <v-btn @click="handleOpen" variant="flat" color="primary">회원추가</v-btn>
  <v-dialog v-model="open" width="auto">
    <v-card class="pa-2" max-width="200" title="회원 상태 변경">
      <!-- <v-text-field v-model="email" label="이메일" /> -->
    </v-card>
  </v-dialog>
</template>
