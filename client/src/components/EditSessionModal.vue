<script setup>
import { AppState } from '@/AppState.js';
import { sessionService } from '@/services/SessionService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, ref } from 'vue';

const activeSession = computed(() =>
  AppState.activeSession
);
const editMode = computed(() =>
  AppState.editMode
);

async function deleteActiveSession() {
  try {
    const confirmed = await Pop.confirm(
      "Are you sure you want to delete this session?"
    );
    if (!confirmed) return

    await sessionService.deleteActiveSession(activeSession.value.id);
    Pop.success("Session deleted successfully.");
  }
  catch (error) {
    Pop.error(error);
  }
}

const newSessionData = ref({
  method: activeSession.value?.method,
  duration: activeSession.value?.duration,
  note: activeSession.value?.note
})

async function updateActiveSession() {
  try {
    this.toggleEditMode()
    await sessionService.updateActiveSession(activeSession.value.id, newSessionData.value)
    sessionService.setActiveSession(activeSession.value.id); // refresh active session
    Pop.success("Session updated successfully.");
  }
  catch (error) {
    Pop.error(error);
  }
}

function toggleEditMode() {
  AppState.editMode = !AppState.editMode;
}

</script>


<template>
  <div class="modal fade" id="editSessionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ new
            Date(activeSession?.localDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC'
            }) }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- SECTION EDIT MODE FIRST -->
        <div v-if="editMode">


          <div class="modal-body">
            <form>
              <div class="form-floating">
                <select v-model="newSessionData.method" class="form-select mb-3" id="floatingSelectInput"
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
                <input v-model="newSessionData.duration" type="number" max="1440" class="form-control"
                  id="floatingDurationInput">
                <label for="floatingDurationInput">Duration: (minutes)</label>
              </div>
              <div class="form-floating mb-3">
                <input v-model="newSessionData.note" type="text" class="form-control" id="floatingNoteInput"
                  maxlength="150">
                <label for="floatingNoteInput">Note:</label>
              </div>


            </form>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
            <button @click="deleteActiveSession()" type="button" class="btn btn-danger"
              data-bs-dismiss="modal">Delete</button>
              <div class="gap-2 d-flex">

                <button @click="toggleEditMode()" type="button" class="btn btn-gray text-light">Go Back</button>
                <button @click="updateActiveSession()" type="button" class="btn btn-success text-light" data-bs-dismiss="modal">Save
                  changes</button>
              </div>
          </div>
        </div>
        <!-- !SECTION EDIT MODE-->
        <!-- SECTION VIEW MODE -->
        <div v-else>

          <div class="modal-body">
            <div class="mb-3">I meditated in the form of <span class="fw-bold">{{ activeSession?.method || "None specified"
                }}</span> for
              <span class="fw-bold"> {{
                activeSession?.duration }}</span> minutes.
            </div>
            <div v-if="activeSession?.note" class="">
              Note: "{{ activeSession?.note}}"
            </div>
          </div>

          <div class="modal-footer d-flex justify-content-center">
            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
            <!-- <button @click="deleteActiveSession()" type="button" class="btn btn-danger"
              data-bs-dismiss="modal">Delete</button> -->
            <button @click="toggleEditMode()" type="button" class="btn btn-imeditated text-light">Edit</button>
          </div>
        </div>

        <!-- !SECTION -->

      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>