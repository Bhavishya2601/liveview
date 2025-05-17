import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('mongoDB URI not found');
}
const URI = process.env.MONGODB_URI;

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(URI, {
        dbName: 'LiveView',
      });
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      throw err;
    }
  }
}

export default connectToDatabase;
