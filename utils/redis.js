import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => console.log('Redis Client Error', err));

    // Promisify Redis methods
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);

  }

  isAlive() {
    return this.client.connected;

  }

  async get(key) {
    try {
      return await this.getAsync(key);

    } catch (error) {
      console.error('Error getting key:', error);
      return null;

    }

  }

  async set(key, value, duration) {
    try {
      await this.setAsync(key, value, 'EX', duration);

    } catch (error) {
      console.error('Error setting key:', error);

    }

  }

  async del(key) {
    try {
      await this.delAsync(key);

    } catch (error) {
      console.error('Error deleting key:', error);

    }

  }

}

const redisClient = new RedisClient();
export default redisClient;
