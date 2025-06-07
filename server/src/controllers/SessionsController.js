import { sessionService } from "../services/SessionService.js"
import BaseController from "../utils/BaseController.js"

export class SessionsController extends BaseController {
  constructor() {
    super('api/sessions')
    this.router
    // add auth0 info here
      .post('', this.markSession)
  }

  async markSession(request, response, next) {
    try {
      const sessionData = request.body
      // sessionData.accountId = request.userInfo.id
      const session = await sessionService.markSession(sessionData)
      response.send(session)
    } catch (error) {
      next(error)
    }
  }
}