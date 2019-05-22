import {dbModel} from '../models/init.js'
import {userHasSession, validateSession} from './session.helpers.js'
export {
  localAuthentication,
  graphQLAuthentication
}

const localAuthentication = async (req, username, password) => {
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

const graphQLAuthentication = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV === 'test') {
      next()
    } else {
      const session = await validateSession(req)
      next()
    }  
  } catch (error) {
    next(error)
  }
}