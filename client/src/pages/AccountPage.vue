<script setup>
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import EditAccountModal from '@/components/EditAccountModal.vue';
import { Pop } from '@/utils/Pop.js';
import { Pop2 } from '@/utils/Pop2.js';
import SessionCard from '@/components/SessionCard.vue';
import { accountService } from '@/services/AccountService.js';
import { useRouter } from 'vue-router';

const account = computed(() => AppState.account)
// const identity = computed(()=> AppState.identity)

const router = useRouter()

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

async function resetData() {
  try {
    const confirmed = await Pop.confirm("Are you sure you want to reset your account data?", "This will permanently delete all of your habit data and progress. Your account will remain, and you can start fresh whenever you’re ready.")
    if (!confirmed) return
    const confirmed2 = await Pop2.confirm("Last chance!", "",
    "Cancel",
    "Confirm")
    if (confirmed2) return
    await accountService.resetAccountData();
    // NOTE router.push kick them back to home or about?
    await router.push({name: "Home"})
    // await Pop.success("Session data deleted.")
    window.location.reload();
  }
  catch (error) {
    Pop.error(error);
  }
}


const editableAccountData = ref({
  name: ""
})

async function editAccountDetails() {
  try {
    
    await accountService.editAccountDetails(editableAccountData.value)
    Pop.success("Name updated!")
  }
  catch (error){
    Pop.error(error);
  }
}
</script>

<template>

  <div class="d-flex align-items-center flex-grow-1 justify-content-center" v-if="account">
    <div class="card bg-gray p-5 m-2">


      <div class="">
        <!-- <h1>Welcome {{ account.name }}</h1>   -->
        <!-- <img class="rounded" :src="account.picture" alt="" /> -->
        <p>Email: {{ account.email }}</p>
        <p>Name: {{ account.name }}</p>

        <form @submit.prevent="editAccountDetails()">

          <div class="form-floating mb-3">
            <input v-model="editableAccountData.name" type="text" class="form-control" id="floatingNoteInput" maxlength="100">
            <label for="floatingNoteInput">Change name:</label>
          </div>

        </form>
        <!-- <button data-bs-toggle="modal" data-bs-target="#editAccountModal"> Edit Account Details </button> -->
      </div>
      
      <button class="btn btn-danger d-flex align-items-end" @click="resetData()"> Reset Data
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

.card {
  border: none;
}
</style>
