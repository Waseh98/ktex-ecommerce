import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/dummy";
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  // Only attempt to connect if we actually have a URI, or if we aren't in a CI/build environment
  if (process.env.MONGODB_URI) {
    clientPromise = client.connect();
  } else {
    // Return a rejected promise so runtime fails explicitly if no URI is provided
    clientPromise = Promise.reject(new Error('Please add your Mongo URI to .env.local'));
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
