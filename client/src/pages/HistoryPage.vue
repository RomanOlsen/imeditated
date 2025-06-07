<script setup>
import { AppState } from '@/AppState.js';
import SessionCard from '@/components/SessionCard.vue';
import { computed } from 'vue';

const sessions = computed(() => AppState.sessions);

</script>


<template>
  <div class="container">
    <div class="row">
      <h1 class="text-imeditated fw-bold">Meditation History</h1>
      <!-- col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 -->
      <div v-for="session in sessions" :key="session.id" class="mb-3 col-1">
        <SessionCard />
      </div>

    </div>

  </div>
</template>


<style lang="scss" scoped></style>