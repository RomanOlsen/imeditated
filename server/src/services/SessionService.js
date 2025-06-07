import { dbContext } from "../db/DbContext.js"

class SessionService {
  async getSessionsForAccount(id) {
    const sessions = await dbContext.Session.find({ accountId: id }) //.populate('account', 'name email')
    return sessions
  }
  async markSession(sessionData) {

    // TODO backend logic to check if session already exists for the day.
    // const existingSession = await dbContext.Session.findOne({
    //   accountId: sessionData.accountId,
    //   date: sessionData.date
    // })

    const event = await dbContext.Session.create(sessionData)
    return event
  }
}
export const sessionService = new SessionService()