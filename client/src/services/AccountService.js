import { AppState } from '../AppState.js'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'
import { sessionService } from './SessionService.js'

class AccountService {
  async resetAccountData() {

    await api.delete('/account') // since it can be regenerated - this is just to reset the name.
    AppState.sessions = []
  }
  async editAccountDetails(newAccountData) {
    const response = await api.put('/account', {name: newAccountData.name}) // currently can only update imeditated.com name
    logger.log(response.data)
    AppState.account = new Account(response.data)
  }
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
      // SECTION
      await sessionService.getSessionsForAccount()
      //!SECTION 
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}

export const accountService = new AccountService()
