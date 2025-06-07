import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class SessionService {
  async markSession() {

    const response = await api.post('api/sessions')
    logger.log(response.data)

  }

}

export const sessionService = new SessionService()