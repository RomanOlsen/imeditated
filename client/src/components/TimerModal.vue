<script setup>
import { sessionService } from '@/services/SessionService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import confetti from 'canvas-confetti';


let value;
let timer;
let audioInterval;


function resetModal() {
  clearInterval(timer);
  document.getElementById('timerCountdown').innerText = '0:00';
  document.getElementById('timerStart').classList.remove('d-none');
  document.getElementById('timerActive').classList.add('d-none');
}

function startTimer() {
  document.getElementById('timerStart').classList.add('d-none');
  document.getElementById('timerActive').classList.remove('d-none');

  // @ts-ignore
  value = event.target.elements['floatingDurationInput'].value
  let totalSeconds = value * 60; // Convert minutes to seconds

  if (value == 60) { // Initialize the countdown display
    document.getElementById('timerCountdown').innerText = `1:00:00`
  } else {
    document.getElementById('timerCountdown').innerText = `${value}:00`
  }



  timer = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(timer);
      logger.log("Timer finished!");
      document.getElementById("doneButton").classList.remove("d-none"); // not sure why but for some reason these 2 buttons work without toggling d-none again
      document.getElementById("closeButton").classList.add("d-none");

      const audio = new Audio('src/assets/completed.mp3'); // ANCHOR SRC might not work
      audio.play();
      audioInterval = setInterval(() => {
        audio.play();
      }, 5000);




    } else {
      totalSeconds--;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      logger.log(`Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds} `);
      document.getElementById('timerCountdown').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds} `;
    }
  }, 1000); // ANCHOR 1000

}

async function submitTimedSession() {

  clearInterval(audioInterval);

  try {
    await sessionService.markSession(value);
    confetti({
      particleCount: 20,
      spread: 90,
      // origin: { x: 0.5, y: 0.5 }
    });
  }
  catch (error) {
    Pop.error(error);
    logger.error(error);
  }
}

</script>


<template>
  <!-- TODO make this a unique Timer Modal. (copied straight from CREATE modal) -->
  <div class="modal fade" id="timerModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Set a timer</h1>
          <button @click="resetModal()" type="button" id="closeButton" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <!-- <small class="modal-header">Mark a session after the time is up.</small> -->





        <div class="modal-body" id="timerStart">
          <form @submit.prevent="startTimer()" class="needs-validation">

            <!-- <div class="m-3">After the timer ends it will auto-mark today's session</div> -->

            <div class="form-floating mb-3">
              <input type="number" min="1" max="60" class="form-control" value="1" id="floatingDurationInput" required>
              <label for="floatingDurationInput">Duration: (minutes)</label>
            </div>

            <!-- <button type="button" class="btn btn-gray text-light">Go Back</button> -->
            <button type="submit" class="btn btn-imeditated text-light mdi mdi-timer-play w-100">
              Start </button>

          </form>
        </div>
        <!-- SECTION active timer -->
        <div class="modal-body d-none" id="timerActive">
          <div class="text-center fs-1 mb-3" id="timerCountdown">0:00</div>
          <button id="doneButton" @click="submitTimedSession()" data-bs-dismiss="modal"
            class="btn btn-imeditated mdi text-light mdi-check w-100 d-none">
            Done</button>
        </div>
        <!-- <div class="modal-footer d-flex justify-content-between">

            
            <div class="gap-2 d-flex">
              
              </div>
        </div> -->
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>