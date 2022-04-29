import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { redisConfig } from './redis.config ';
import { RedisCacheService } from './redis.cache.service';

@Module({
    exports:[
        RedisCacheService
    ],
    imports: [
        RedisModule.forRoot({
            readyLog: true,
            config: {
                host: redisConfig.redisHost,
                port: parseInt(redisConfig.redisPort,10),
                password: redisConfig.redisPassword
            }
        }),
    ],
    providers:[
        RedisCacheService
    ]
})
export class RedisCacheModule {}