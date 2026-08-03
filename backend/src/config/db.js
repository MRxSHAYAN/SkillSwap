const mongoose = require('mongoose');

// Cache the connection across serverless function re-uses
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is missing.');
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Prevents hanging on queries if connection drops
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongooseInstance) => {
      const isLocal = process.env.MONGO_URI.includes('localhost') || process.env.MONGO_URI.includes('127.0.0.1');
      console.log(`\n MongoDB Connected Successfully [${isLocal ? 'LOCAL DATABASE' : 'CLOUD ATLAS'}]`);
      console.log(`   └─ URI: ${process.env.MONGO_URI.split('@').pop()}\n`);
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

module.exports = connectDB;