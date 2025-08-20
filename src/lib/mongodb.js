import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  tls: true,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  retryWrites: true,
};

console.log('MongoDB URI exists:', !!uri);
console.log('Node environment:', process.env.NODE_ENV);

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    console.log('Creating new MongoDB client for development');
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch(error => {
      console.error('MongoDB connection failed:', error);
      throw error;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  console.log('Creating new MongoDB client for production');
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch(error => {
    console.error('MongoDB connection failed:', error);
    throw error;
  });
}

clientPromise
  .then(client => {
    console.log('MongoDB connected successfully');

    return client.db('ridiculink').admin().ping();
  })
  .then(() => console.log('MongoDB ping successful'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
  });

export default clientPromise;