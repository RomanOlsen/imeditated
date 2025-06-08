<script setup>
import { AppState } from '@/AppState.js';
import { sessionService } from '@/services/SessionService.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';

const activeSession = computed(() =>
  AppState.activeSession
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

</script>


<template>
  <!-- Modal -->
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
        <div class="modal-body">
          <form>
            <div class="form-floating">
              <select class="form-select mb-3" id="floatingSelect" aria-label="Select a method">
                <option selected>None specified</option>
                <option value="1">Silent</option>
                <option value="6">Group/Class</option>
                <option value="2">App - Calm</option>
                <option value="3">App - Headspace</option>
                <option value="4">App - Insight Timer</option>
                <option value="4">App - Medito</option>
                <option value="5">Other app or guided video/audio</option>


              </select>
              <label for="floatingSelect">Method:</label>
            </div>
            <!-- <div>Duration: {{ activeSession.duration }} minutes</div> -->
            <!-- <input type="number"> -->
            <div class="form-floating mb-3">
              <input type="number" class="form-control" id="floatingDurationInput" placeholder="name@example.com">
              <label for="floatingDurationInput">Duration: (minutes)</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingNoteInput" placeholder="name@example.com">
              <label for="floatingNoteInput">Note:</label>
            </div>


          </form>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
          <button @click="deleteActiveSession()" type="button" class="btn btn-danger" data-bs-dismiss="modal">Delete</button>
          <button type="button" class="btn btn-success text-light">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>