<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';

</script>

<template class="imeditated-gray">
  <header>
  </header>
  <main>
    <RouterView/>
  </main>
  <footer class="text-center">
    <Navbar />
    <!-- Made with <i class="mdi mdi-heart text-pink"></i> by CodeWorks -->
  </footer>
</template>

<style lang="scss">

.imeditated-gray {
  background-color: #f8f9faa8; /* Light gray background */
  // min-height: 100vh; /* Ensure it covers the full viewport height */
}
</style>
