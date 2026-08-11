import { Db, MongoClient } from 'mongodb';

let database: Db | undefined;

export async function connectToDatabase(): Promise<Db> {
  if (database) return database;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not configured');

  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10_000 });
  await client.connect();
  database = client.db(process.env.MONGODB_DB ?? 'Bloom');
  await database.command({ ping: 1 });
  return database;
}

export async function getDatabase(): Promise<Db> {
  return connectToDatabase();
}
