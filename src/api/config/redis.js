import redis from 'redis'
const client = redis.createClient()

export const redisOptions = {
  client: client
}