import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class SessionService {
  async deleteActiveSession(id, userInfo) {
    const foundSession = await this.findSessionById(id)
    if (foundSession == null) {
      throw new BadRequest("Invalid Session ID")
    }
    if (foundSession.accountId != userInfo.id) {
      throw new Forbidden("You do not have permission to delete this session")
    }

    await foundSession.deleteOne()
    return "Session Deleted"
  }

  async findSessionById(id) {
    return await dbContext.Session.findById(id)
  }


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