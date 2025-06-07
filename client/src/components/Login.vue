<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { AuthService } from '../services/AuthService.js';
import { logger } from '@/utils/Logger.js';

const identity = computed(() => AppState.identity)
const account = computed(() => AppState.account)
let failed = false

function login() {
  AuthService.loginWithRedirect()
}
function logout() {
  AuthService.logout()
}

function usePlaceholderImage() {
  logger.warn('Failed to load user image, using placeholder instead.')
  failed = true
  document.getElementById("accountPicture").classList.add("d-none");
}

</script>

<template>
  <!-- NOTE selectable -- now using selectable-scale instead -->
  <span class="navbar-text">
    <button class="btn selectable-scale text-imeditated btn-outline-dark" @click="login" v-if="!identity">
      Login
    </button>
    <div v-else>
      <div class="dropdown dropup">
        <div role="button" class="selectable-scale no-select" data-bs-toggle="dropdown" aria-expanded="false"
          title="open account menu">
          <div v-if="account?.picture || identity?.picture">
            <img id="accountPicture" :src="account?.picture || identity?.picture" alt="account photo" height="40"
              class="user-img" @error="usePlaceholderImage()" />

            <img v-if="failed" src="https://wallpapersok.com/images/hd/basic-default-pfp-pxi77qv5o0zuz8j3.jpg"
              alt="New account photo" height="40" class="user-img" />

          </div>
          <!-- <div class="text-light"><span>Logged in as {{ account?.name }}</span></div> -->

        </div>
        <div class="dropdown-menu dropdown-menu-sm-end dropdown-menu-end p-0" role="menu" title="account menu">
          <div class="list-group">
            <RouterLink :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Account Settings
              </div>
            </RouterLink>
            <RouterLink :to="{ name: 'History' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                History
              </div>
            </RouterLink>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<style lang="scss" scoped>
.user-img {
  // height: 3rem;
  // width: 3rem;
  height: 40px;
  width: 40px;
  border-radius: 100px;
  object-fit: cover;
  object-position: center;
}
</style>
