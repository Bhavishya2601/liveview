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

const codeSchema = new mongoose.Schema({
  html: { type: String, default: '' },
  css: { type: String, default: '' },
  js: { type: String, default: '' },
  slug: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const CodeModel = mongoose.models.Code || mongoose.model('Code', codeSchema);


export default connectToDatabase;
