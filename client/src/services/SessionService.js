import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Session } from "@/models/Session.js"
import App from "@/App.vue"

class SessionService {
  async createPreviousSession(formValues, dateValue) {
    const response = await api.post('api/sessions', {method: formValues.method, duration: formValues.duration, note: formValues.note, localDate: new Date(dateValue).toLocaleDateString('en-CA') })
    logger.log(response.data)
        AppState.sessions.push(new Session(response.data))

        // @ts-ignore
        AppState.sessions.sort((a, b) => new Date(b.localDate) - new Date(a.localDate)) // sort by date descending (AI written)

  }

  checkSessionsInAppState() { // only for onMounted on HomePage to make it more reactive? This likely will be trashed later.
        this.checkForSessionToday() // disable button if session already exists today
    AppState.streak = this.calculateStreak(AppState.sessions.map(s => s.localDate)) // calculate streak for display
  }



  async updateActiveSession(id, newSessionData) {
    const response = await api.put(`api/sessions/${id}`, newSessionData)
    logger.log(response.data)
    const index = AppState.sessions.findIndex(s => s.id == id)
    AppState.sessions.splice(index, 1, new Session(response.data)) // replace the session in appstate with the updated one
  }
  async deleteActiveSession(id) {
    const response = await api.delete(`api/sessions/${id}`)
    logger.log(response.data)
    const index = AppState.sessions.findIndex(s => s.id == id)
    AppState.sessions.splice(index, 1) // remove from appstate
  }
  setActiveSession(id) {
    const session = AppState.sessions.find(s => s.id == id)
    AppState.activeSession = session
    logger.log('Active Session Set:', AppState.activeSession)
  }
  async getSessionsForAccount() {
    const response = await api.get('api/sessions')
    logger.log(response.data)
    
    AppState.sessions = response.data.map(pojo => new Session(pojo)) // add to appstate

    this.checkForSessionToday() // disable button if session already exists today
    AppState.streak = this.calculateStreak(AppState.sessions.map(s => s.localDate)) // calculate streak for display

    // @ts-ignore
    AppState.sessions.sort((a, b) => new Date(b.localDate) - new Date(a.localDate))

  }

  checkForSessionToday() { // a setInterval will also check this, but we want to check on load
    
    const today = new Date().toLocaleDateString('en-CA')
    const sessionToday = AppState.sessions.some(s => s.localDate == today)

    AppState.sessionToday = sessionToday // true if a session has been marked today 
    logger.log('Session Today:', AppState.sessionToday)
    // ai wrote this we'll see how it goes
  }
  async markSession() {

    const response = await api.post('api/sessions', {localDate: new Date().toLocaleDateString('en-CA')}) // later send a session object or just add more once we begin implementing duration, method, etc. // en-CA for consistency
    logger.log(response.data)
    AppState.sessions.unshift(new Session(response.data)) // used to be push, but we want it at the top of the list

    AppState.streak = this.calculateStreak(AppState.sessions.map(s => s.localDate))

  }
// NOTE chatgpt wrote this, so I dont fully understand this part of code yet.
// calculateStreak(dates) {
//   if (!dates.length) return 0;



//   // Sort the dates in descending order (latest first)
//   const sortedDates = dates
//     .map(date => new Date(date))
//     .sort((a, b) => b - a);

//   let streak = 1;
//   let previous = sortedDates[0];

//   for (let i = 1; i < sortedDates.length; i++) {  const current = sortedDates[i];
//     const diffInDays = Math.round((previous - current) / (1000 * 60 * 60 * 24));

//     if (diffInDays === 1) {
//       streak++;
//       previous = current;
//     } else if (diffInDays > 1) {
//       break; // streak broken
//     }
//   }

//   return streak;
// }

// ChatGPT iterated itself
 calculateStreak(dateStrings) {
  if (!dateStrings.length) return 0;

  // Convert to local Date objects (safe from timezone issues)
  const dates = dateStrings.map(str => {
    const [year, month, day] = str.split('-').map(Number)
    return new Date(year, month - 1, day) // JS months are 0-indexed
  })

  // Sort descending
  dates.sort((a, b) => b - a)

  const today = new Date()
  today.setHours(0, 0, 0, 0) // normalize

  const mostRecent = new Date(dates[0])
  mostRecent.setHours(0, 0, 0, 0)

  const daysSinceMostRecent = Math.floor((today - mostRecent) / (1000 * 60 * 60 * 24))

  if (daysSinceMostRecent > 1) return 0 // streak broken

  let streak = 1
  let previous = mostRecent

  for (let i = 1; i < dates.length; i++) {
    const current = new Date(dates[i])
    current.setHours(0, 0, 0, 0)

    const diff = Math.floor((previous - current) / (1000 * 60 * 60 * 24))

    if (diff === 1) {
      streak++
      previous = current
    } else if (diff > 1) {
      break
    }
  }

  return streak
}

  

}

export const sessionService = new SessionService()