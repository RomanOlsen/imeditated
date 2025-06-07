import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Session } from "@/models/Session.js"

class SessionService {
  async getSessionsForAccount() {
    const response = await api.get('api/sessions')
    logger.log(response.data)
    
    AppState.sessions = response.data.map(pojo => new Session(pojo)) // add to appstate

    this.checkForSessionToday() // disable button if session already exists today
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
  }

calculateSessionStreak(){
  
}

}

export const sessionService = new SessionService()