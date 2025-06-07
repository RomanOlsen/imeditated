import { dbContext } from "../db/DbContext.js"

class SessionService {
  async markSession(sessionData) {
    const event = await dbContext.Session.create(sessionData)
    return event
  }
}
export const sessionService = new SessionService()