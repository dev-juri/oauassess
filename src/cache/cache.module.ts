import { Module, Global } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisUrl = configService.get<string>('cacheConfig.redisUrl');
        
        if (redisUrl) {
          const url = new URL(redisUrl);
          
          return {
            store: redisStore,
            host: url.hostname || 'localhost',
            port: parseInt(url.port) || 6379,
            password: url.password || undefined,
            username: url.username || undefined,
            ttl: configService.get('CACHE_TTL', 3600),
          };
        }
      },
    }),
  ],
  providers: [CacheService],
  exports: [NestCacheModule, CacheService],
})
export class CacheModule {}