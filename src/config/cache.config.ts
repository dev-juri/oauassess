import { registerAs } from "@nestjs/config";

export default registerAs('cacheConfig', () => ({
    redisUrl: process.env.REDIS_URL
}));
