import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class SessionService {
  async getSessionsForAccount() {
    const response = await api.get('api/sessions')
    logger.log(response.data)
  }
  async markSession() {

    const response = await api.post('api/sessions')
    logger.log(response.data)

  }

}

export const sessionService = new SessionService()