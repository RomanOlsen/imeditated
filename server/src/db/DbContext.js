import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { sessionSchema } from '../models/Session.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Session = mongoose.model('Session', sessionSchema);
}

export const dbContext = new DbContext()
