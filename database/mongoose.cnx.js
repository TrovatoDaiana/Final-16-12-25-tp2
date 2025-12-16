import mongoose from 'mongoose';
import { config } from '../config/index.js';

class MongooseConnection {
  constructor() {
    this.connection = null;
  }

  async connect() {
    if (this.connection) {
      return this.connection;
    }

    try {
      await mongoose.connect(config.mongoUri, {
        dbName: 'proyecto-stock',
      });

      this.connection = mongoose.connection;
      console.log('Conexión a Mongoose exitosa');
      return this.connection;
    } catch (err) {
      console.error('Error conectando a Mongoose:', err);
      throw err;
    }
  }
}

const mongooseConnectionInstance = new MongooseConnection();

export default mongooseConnectionInstance;
