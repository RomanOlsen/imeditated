import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  sessions: [],
  sessionToday: null, // true if a session has been marked today, false if loaded but none exists
  streak: 0,
  activeSession: null, // the session being opened in the editSessionModal
  editMode: false, // true if the edit session modal is open
})

