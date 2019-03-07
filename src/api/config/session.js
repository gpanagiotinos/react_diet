import session from 'express-session'
import uuidv4 from 'uuid/v4'
import redisConnect from 'connect-redis'
import redisOptions from './redis.js'
const redisStore = redisConnect(session)
export default session ({
  store: new redisStore(redisOptions),
  genid: function(req) {
    return uuidv4()
  },
  secret: 'simpleSecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000
  }
})