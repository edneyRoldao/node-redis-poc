import { RedisConnection } from './redis-connection'

(async () => {

    const redis = new RedisConnection()

    // await redis.setCache('testNodeCache', { payload: 'test 1234'}, 300)

    // const data = await redis.getCache<{ payload: string }>('testNodeCache')
    // console.log(data);

    await redis.evictCache('testNodeCache')

})()