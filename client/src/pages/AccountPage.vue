<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import EditAccountModal from '@/components/EditAccountModal.vue';
import { Pop } from '@/utils/Pop.js';
import { Pop2 } from '@/utils/Pop2.js';
import SessionCard from '@/components/SessionCard.vue';

const account = computed(() => AppState.account)

async function deleteAccount() {
  try {
    const confirmed = await Pop.confirm("Are you sure you want to delete your account? This action cannot be undone.")
    if (!confirmed) return
    const confirmed2 = await Pop2.confirm("Are you sure you want to delete your account? This action cannot be undone.", "All sessions and data will be lost.",
      "Cancel",
      "Delete Account")
    if (confirmed2) return
    Pop.success("Account deleted.")
  }
  catch (error) {
    Pop.error(error);
  }
}
</script>

<template>

  <div v-if="account">
    <div class="text-center">
      <!-- <h1>Welcome {{ account.name }}</h1>   -->
      <!-- <img class="rounded" :src="account.picture" alt="" /> -->
      <p>{{ account.email }}</p>
      <button data-bs-toggle="modal" data-bs-target="#editAccountModal"> Edit Account Details </button>
      <button @click="deleteAccount()"> Delete Your Account
      </button>
    </div>

  </div>
  <div v-else>
    <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
  </div>

  <EditAccountModal />
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
