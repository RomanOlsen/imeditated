<script setup>
import { AppState } from '@/AppState.js';
import { sessionService } from '@/services/SessionService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import confetti from 'canvas-confetti';
import { computed, onMounted } from 'vue';

// onMounted(() => { // NOTE look at github commit message on what to do
//   getSessionsForAccount();
// })

const account = computed(() => AppState.account);
const sessionToday = computed(() => AppState.sessionToday);
const sessions = computed(() => AppState.sessions);

async function markSession() {
  try {
    await sessionService.markSession();
    confetti({
      particleCount: 20,
      spread: 90,
      // origin: { x: 0.5, y: 0.5 }
    });

    const button = document.getElementById('markButton')

    button.classList.remove('btn-imeditated');
    button.classList.add('btn-success');
    button.innerText = 'Completed.';

    // @ts-ignore
    button.disabled = true;



  }
  catch (error) {
    Pop.error(error, "Could not log meditation.");
    logger.error(error, "Error marking session");
  }
}


async function getSessionsForAccount() {
  try {
    await sessionService.getSessionsForAccount()
  }
  catch (error) {
    Pop.error("Could not fetch session data for account", error);
  }
}
</script>

<template>
  <!-- <div class="container">
    <div class="row button-row">
      <div class="col-12"> -->
  <!-- <h1 class="text-center mt-5 mb-3">Welcome to I Meditated</h1> -->
  <!-- AI wrote these parts above and below me OMG -->
  <!-- <p class="lead text-center mb-5">
          A simple meditation timer for your mindfulness practice.
        </p> -->
  <div v-if="account && sessionToday !== null" class="d-flex justify-content-center align-items-center flex-grow-1 flex-column gap-4">

    <!-- <div v-if="sessionToday === null">Loading...</div> -->
    <button v-if="!sessionToday" id="markButton" @click="markSession()"
      class="btn selectable-scale btn-imeditated text-light fs-1 shadow btn-lg  mt-5">Mark
      complete</button>
    <button v-else class="btn selectable-scale btn-success text-light fs-1 shadow btn-lg mt-5" disabled>Completed.</button>
    <!-- ANCHOR example of the completed state. -->


    <div class="text-center fs-5">
      <div>You have meditated for <span class="fw-bold">{{ sessions }}</span> days in a row!</div>
      <div>And a total of <span class="fw-bold">{{ sessions.length }}</span> times.</div>
    </div>
  </div>
  <div v-else>
    <h1> Log in to meditate!</h1>
  </div>
  <!-- </div>
    </div>
    <div class="col-12 d-flex justify-content-center">
    </div>


  </div> -->


</template>

<style scoped lang="scss">
.container {
  height: 80dvh;
  // background: url('@/assets/img/meditation-background.jpg') no-repeat center center fixed;
  // background-size: cover;
}

.button-row {
  height: 100%;
}
</style>
