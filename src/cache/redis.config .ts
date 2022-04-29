require('dotenv-flow').config()

export const redisConfig = {
    cacheLongPeriod: process.env.CACHE_LONG_PERIOD,
    cacheShortPeriod: process.env.CACHE_SHORT_PERIOD,
    redisHost: process.env.REDIS_HOST,
    redisPassword: process.env.REDIS_PASSWORD,
    redisPort: process.env.REDIS_PORT,
}