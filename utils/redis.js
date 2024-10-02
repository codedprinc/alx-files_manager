import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log('Redis Client Error', err));
    this.client.connect();

  }

  isAlive() {
    return this.client.isOpen;

  }

  async get(key) {
    try {
      return await this.client.get(key);

    } catch (error) {
      console.error('Error getting key:', error);
      return null;

    }

  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, {
        EX: duration

      });

    } catch (error) {
      console.error('Error setting key:', error);

    }

  }

  async del(key) {
    try {
      await this.client.del(key);

    } catch (error) {
      console.error('Error deleting key:', error);

    }

  }

}

const redisClient = new RedisClient();
export default redisClient;
