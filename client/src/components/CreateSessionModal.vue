<script setup>
import { sessionService } from '@/services/SessionService.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';

// Import VueDatePicker for date selection
import VueDatePicker from '@vuepic/vue-datepicker'; 
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref();


const createPreviousSessionData = ref({
  method: "None specified",
  duration: 0,
  note: "",
  localDate: null
})

async function createPreviousSession(params) {
  try {
    await sessionService.createPreviousSession(createPreviousSessionData.value)
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

        <!-- SECTION EDIT MODE FIRST -->



        <div class="modal-body">
          <form>
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


          </form>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->

          <div class="gap-2 d-flex">

            <!-- <button type="button" class="btn btn-gray text-light">Go Back</button> -->
            <button @click="createPreviousSession()" type="button" class="btn btn-success text-light">Save
              changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>

<VueDatePicker v-model="date"></VueDatePicker>
</template>


<style lang="scss" scoped></style>