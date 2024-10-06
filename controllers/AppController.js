import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static async getStatus(req, res) {
    try {
      const redisAlive = await redisClient.isAlive();
      const dbAlive = dbClient.isAlive();
      res.status(200).json({ redis: redisAlive, db: dbAlive});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server error' });
    }
      }

  static async getStats(req, res) {
    try{
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();
      res.status(200).json({ users: usersCount, files: filesCount});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server error' });
    }
  }
}

module.exports = AppController;
