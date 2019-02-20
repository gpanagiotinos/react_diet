import {dbModel} from '../models/init.js'
import {userHasSession} from './session.helpers.js'
const user  = dbModel.user
export const authHelpers = {
  localAuthentication
}

async function localAuthentication(req, username, password) {
  if (userHasSession(req)) {
    return req.session.user
  }
  try {
    const user  = await user.findOne({attributes: ['username', 'role'], where: {username: username, password: password}})
    if (!user) {
      throw new Error('Error In Email and Password')
    } else {
      return user
    }
  } catch (error) {
    return Promise.reject(error)
  }
}