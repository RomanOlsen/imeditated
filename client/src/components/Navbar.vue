<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';

const theme = ref(loadState('theme') || 'light')

const isStandalone = ref(false)

onMounted(() => {
  isStandalone.value =
    window.matchMedia('(display-mode: standalone)').matches ||
    // @ts-ignore
    window.navigator.standalone === true // for iOS
})

// function toggleTheme() {
//   theme.value = theme.value == 'light' ? 'dark' : 'light'
// }

watch(theme, () => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
  saveState('theme', theme.value)
}, { immediate: true })

function reload() {
  window.location.reload()
}

</script>

<template>
  <nav class="navbar navbar-expand-md bg-none border-bottom border-5 border-imeditated">
    <div class="container-fluid gap-2">
      <RouterLink :to="{ name: 'Home' }" class="btn p-0 px-2 border-gray d-flex align-items-center text-light"
        title="Go to homepage">
        <!-- NOTE we might need routerLink later here. -->
        <div class="d-flex align-items-center">

          <img class="navbar-brand btn-outline-dark" alt="logo"
            src="@/assets/img/I meditated.com (600 x 600 px) (1).png" height="55" />
          <small class="text-dark">by Roman Olsen</small>
        </div>

      </RouterLink>
      <button @click="reload()" v-if="isStandalone" class="btn p-0 m-0 btn-outline-dark mdi mdi-refresh" title="Refresh"></button>
      <!-- TODO use position absolute later (doesnt fit on all ANDROIDS) -->

      <!-- collapse button -->
      <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-links"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="mdi mdi-menu text-light"></span>
      </button> -->
      <!-- collapsing menu -->
      <!-- <div class="collapse navbar-collapse " id="navbar-links"> -->
      <!-- <ul class="navbar-nav">
          <li>
            <RouterLink :to="{ name: 'About' }" class="btn text-imeditated selectable">
              About
            </RouterLink>
          </li>
        </ul> -->
      <!-- LOGIN COMPONENT HERE -->
      <!-- <div class="ms-auto"> -->
      <!-- <button class="btn text-light" @click="toggleTheme"
            :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`">
            <i v-if="theme == 'dark'" class="mdi mdi-weather-sunny"></i>
            <i v-if="theme == 'light'" class="mdi mdi-weather-night"></i>
          </button> -->
      <!-- </div> -->
      <Login />
      <!-- </div> -->
    </div>
  </nav>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-imeditated);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
