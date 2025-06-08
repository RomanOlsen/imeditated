<script setup>
import { Session } from '@/models/Session.js';
import { Pop } from '@/utils/Pop.js';
import { sessionService } from '@/services/SessionService.js';
import { activeSessionService } from '@/services/ActiveSessionService.js';

const prop = defineProps({
  session: { type: Session, required: true }
})

async function setActiveSession() {
try {
  await sessionService.setActiveSession(prop.session.id);
  activeSessionService.changeValuesOnForm()
}
catch (error){
  Pop.error(error);
}
}

</script>


<template>
  <div @click="setActiveSession()" class="card" type="button" data-bs-toggle="modal" data-bs-target="#editSessionModal">
    <!-- <img class="img-fluid"
      src="https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?q=80&w=2093&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Meditation session image"> -->
    <span class="card-title text-center text-light fs-3">{{ new Date(session.localDate).getMonth() + 1 }}/{{ new
      Date(session.localDate).getUTCDate() }}</span>
    <!-- <div class="card-body">
    <p class="card-text text-center">Click to view details and mark as completed.</p>
  </div> -->
  </div>
  <!-- <EditSessionModal /> -->
</template>


<style lang="scss" scoped>
.card {
  aspect-ratio: 1/1;
  background-image: url("https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  border: none;
}
</style>