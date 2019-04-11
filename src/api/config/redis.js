import redis from 'redis'
const client = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true})

export const redisOptions = {
  client: client
}