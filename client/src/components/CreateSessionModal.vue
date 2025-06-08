<script setup>
import { sessionService } from '@/services/SessionService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, ref } from 'vue';

// Import VueDatePicker for date selection
import VueDatePicker from '@vuepic/vue-datepicker'; 
import '@vuepic/vue-datepicker/dist/main.css'
import { AppState } from '@/AppState.js';

const date = ref();

const disabledDates = computed(()=> AppState.sessions.map(s => s.localDate));


const createPreviousSessionData = ref({
  method: "None specified",
  duration: 0,
  note: "",
  // localDate: null
})

async function createPreviousSession(params) {
  try {
    // logger.log(disabledDates.value)
    await sessionService.createPreviousSession(createPreviousSessionData.value, date.value)
    Pop.success("Session added.");
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <!-- TODO make this a unique Create Modal tomorrow. (copied straight from edit modal) -->
  <div class="modal fade" id="createSessionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Mark a previous session</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>





        <div class="modal-body">
          <form @submit.prevent="createPreviousSession" class="needs-validation" novalidate>
            <!-- :action-row="{ showNow: true }" -->
            <VueDatePicker v-model="date" required :enable-time-picker="false"  placeholder="Select Date" :max-date="new Date()" :disabled-dates="disabledDates" timezone="UTC" class="mb-3"></VueDatePicker>
            <div class="form-floating">
              <select v-model="createPreviousSessionData.method" class="form-select mb-3" id="floatingSelectInput"
                aria-label="Select a method">
                <option selected value="None specified">None specified</option>
                <option value="Silent">Silent</option>
                <option value="Group/Class">Group/Class</option>
                <option value="App - Calm">App - Calm</option>
                <option value="App - Headspace">App - Headspace</option>
                <option value="App - Insight Timer">App - Insight Timer</option>
                <option value="App - Medito">App - Medito</option>
                <option value="Other app or guided video/audio">Other app or guided video/audio</option>


              </select>
              <label for="floatingSelect">Method:</label>
            </div>
            <!-- <div>Duration: {{ activeSession.duration }} minutes</div> -->
            <!-- <input type="number"> -->
            <div class="form-floating mb-3">
              <input v-model="createPreviousSessionData.duration" type="number" max="1440" class="form-control"
                placeholder="" id="floatingDurationInput">
              <label for="floatingDurationInput">Duration: (minutes)</label>
            </div>
            <div class="form-floating mb-3">
              <input v-model="createPreviousSessionData.note" type="text" class="form-control" id="floatingNoteInput"
                placeholder="" maxlength="150">
              <label for="floatingNoteInput">Note:</label>
            </div>

            <!-- <button type="button" class="btn btn-gray text-light">Go Back</button> -->
            <button type="submit" class="btn btn-success text-light mdi mdi-check w-100" data-bs-dismiss="modal"> Mark</button>

          </form>
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