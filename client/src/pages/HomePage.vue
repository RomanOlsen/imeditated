<script setup>
import { sessionService } from '@/services/SessionService.js';
import { Pop } from '@/utils/Pop.js';
import confetti from 'canvas-confetti';

async function markSession() {
  try {
    // await sessionService.markSession();

    // // @ts-ignore
    // window.confetti({
    //   particleCount: 200,
    //   spread: 70,
    //   origin: { x: 0.5, y: 0.5 },
    //   colors: ['#ff9a9e', '#fad0c4', '#fad0c4', '#ff9a9e']
    // });
    confetti({
      particleCount: 75,
      spread: 90,
    });

  }
  catch (error) {
    Pop.error("Could not log meditation.", error);
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
  <div class="d-flex justify-content-center align-items-center flex-grow-1 flex-column gap-4">

    <button @click="markSession()" class="btn selectable-scale btn-imeditated text-light fs-1 shadow btn-lg  mt-5">Mark
      complete</button>
    <!-- <button class="btn selectable-scale btn-imeditated text-light fs-1 shadow btn-lg mt-5" disabled>Completed!</button> -->
    <!-- ANCHOR example of the completed state. -->

    <div class="text-center fs-5">
      <div>You have meditated for 0 days in a row!</div>
      <div>And a total of 0 times.</div>
    </div>
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
