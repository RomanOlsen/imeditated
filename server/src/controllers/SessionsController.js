import { Auth0Provider } from "@bcwdev/auth0provider"
import { sessionService } from "../services/SessionService.js"
import BaseController from "../utils/BaseController.js"

export class SessionsController extends BaseController {
  constructor() {
    super('api/sessions')
    this.router
      // add auth0 info here
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getSessionsForAccount)
      .post('', this.markSession)
      .delete('/:id', this.deleteActiveSession)
  }
  deleteActiveSession(request, response, next) {
    try {
      const userInfo = request.userInfo
      const id = request.params.id
      const message = sessionService.deleteActiveSession(id, userInfo)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  async getSessionsForAccount(request, response, next) {
    try {
      const sessions = await sessionService.getSessionsForAccount(request.userInfo.id)
      response.send(sessions)
    }
    catch (error) {
      next(error)
    }
  }

  async markSession(request, response, next) {
    try {
      const sessionData = request.body
      sessionData.accountId = request.userInfo.id
      const session = await sessionService.markSession(sessionData)
      response.send(session)
    } catch (error) {
      next(error)
    }
  }



}