import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async get<T>(key: string): Promise<T | null> {
    try {
      const cached = await this.cacheManager.get<T>(key);
      if (cached) {
        console.log(`Cache hit: ${key}`);
      }
      return cached;
    } catch (error) {
      console.error(`Cache get error for key ${key}:`, error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      await this.cacheManager.set(key, value, ttl);
      console.log(`Cache set: ${key}`);
    } catch (error) {
      console.error(`Cache set error for key ${key}:`, error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.cacheManager.del(key);
      console.log(`Cache delete: ${key}`);
    } catch (error) {
      console.error(`Cache delete error for key ${key}:`, error);
    }
  }

  // Get multiple keys at once
  async mget<T>(keys: string[]): Promise<(T | null)[]> {
    try {
      const promises = keys.map(key => this.get<T>(key));
      return await Promise.all(promises);
    } catch (error) {
      console.error('Cache mget error:', error);
      return keys.map(() => null);
    }
  }

  // Set multiple key-value pairs
  async mset<T>(items: Array<{ key: string; value: T; ttl?: number }>): Promise<void> {
    try {
      await Promise.all(
        items.map(item => this.set(item.key, item.value, item.ttl))
      );
    } catch (error) {
      console.error('Cache mset error:', error);
    }
  }
}