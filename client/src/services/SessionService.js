import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class SessionService {
  async getSessionsForAccount() {
    const response = await api.get('api/sessions')
    logger.log(response.data)
  }
  async markSession() {
    // sessionData.date = new Date().toLocaleDateString('en-US') // en-ca is more consistent?
    const response = await api.post('api/sessions', {localDate: new Date().toLocaleDateString('en-CA')}) // later send a session object or just add more once we begin implementing duration, method, etc.
    logger.log(response.data) 
  }

}

export const sessionService = new SessionService()