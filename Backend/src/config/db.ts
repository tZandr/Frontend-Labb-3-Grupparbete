import mongoose from 'mongoose';

export async function connectToDatabase(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not configured');

  return mongoose.connect(uri, { dbName: process.env.MONGODB_DB ?? 'Bloom' });
}
