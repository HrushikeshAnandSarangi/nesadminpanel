import { MongoClient } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.NEXT_PUBLIC_MONGO_URI || '';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.NEXT_PUBLIC_MONGO_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}
client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;