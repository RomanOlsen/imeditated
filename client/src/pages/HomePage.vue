<script setup>
import { AppState } from '@/AppState.js';
import CreateSessionModal from '@/components/CreateSessionModal.vue';
import { sessionService } from '@/services/SessionService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import confetti from 'canvas-confetti';
import { computed, onMounted } from 'vue';

onMounted(() => { // NOTE look at github commit message on what to do
  checkSessionsInAppstate();
})

const account = computed(() => AppState.account);
const sessionToday = computed(() => AppState.sessionToday);
const sessions = computed(() => AppState.sessions);
const streak = computed(() => AppState.streak);
const isLoaded = computed(() => AppState.isLoaded);

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

async function checkSessionsInAppstate() {
  try {
    await sessionService.checkSessionsInAppState();
  }
  catch (error) {
    Pop.error(error);
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
  <div v-if="account && sessionToday !== null"
    class="d-flex justify-content-center align-items-center flex-grow-1 flex-column gap-4">

    <div v-if="isLoaded">
      <button v-if="!sessionToday" id="markButton" @click="markSession()"
        class="btn selectable-scale btn-imeditated text-light fs-1 shadow btn-lg  mt-5">Mark
        complete</button>
      <div v-else class="text-center">
        <div>Well done today, {{ account.name }} 🎉</div>
        <!-- <div class="position-relative"> -->
        <!-- NOTE delete button - will for now just have the option to remove sessions in account settings page -->
        <!-- <button class="delete mdi mdi-undo bg-danger"></button> -->
        <button class="btn selectable-scale btn-success text-light fs-1 shadow btn-lg mt-4" disabled>Completed.
        </button>
        <!-- </div> -->
      </div>
    </div>
    <span v-else class="mdi mdi-refresh mdi-spin fs-1"></span>
    <!-- ANCHOR example of the completed state. -->


    <div v-if="isLoaded" class="text-center fs-5">
      <div v-if="streak">
        <div>You have meditated for <span class="fw-bold">{{ streak }}</span> days in a row!</div>
        <div>And a total of <span class="fw-bold">{{ sessions.length }}</span> times.</div>
      </div>
      <div v-else>
        <div>Ready to begin?</div>
        <div>Total Sessions: <span class="fw-bold">{{ sessions.length }}</span></div>
      </div>
    </div>
  </div>

  <div v-else class="d-flex align-items-center flex-grow-1 justify-content-center flex-column">
    <RouterLink :to="{ name: 'About' }" class="btn text-imeditated selectable">
      About
    </RouterLink>
    <h1 class="d-flex mt-5"> Log in to meditate! <span class="mdi mdi-arrow-bottom-right mt-5"></span></h1>
    <!-- <img class="arrow img-fluid" src="@/assets/img/arrow2.png" alt=""> -->
  </div>

  <!-- <div v-else class="d-flex align-items-center flex-grow-1 justify-content-center">
    <h1 class="d-flex "> Log in to meditate!</h1>
    <img class="arrow img-fluid" src="@/assets/img/arrow2.png" alt="">
  </div> -->



  <!-- </div>
    </div>
    <div class="col-12 d-flex justify-content-center">
    </div>


  </div> -->

  <CreateSessionModal />
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

.delete {
  position: absolute;
  top: 1;
}

.arrow {
  rotate: 55deg;
  // max-width: 100dvh;
}
</style>
