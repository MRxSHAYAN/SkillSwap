/**
 * Utility script to delete a user by email from the local MongoDB.
 * Usage: node src/scripts/deleteUser.js email@example.com
 */

require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');

const email = process.argv[2];
if (!email) {
  console.error('Usage: node src/scripts/deleteUser.js email@example.com');
  process.exit(1);
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection.db;
  const result = await db.collection('users').deleteOne({ email: email.toLowerCase().trim() });
  if (result.deletedCount === 0) {
    console.log(`❌  No user found with email: ${email}`);
  } else {
    console.log(`✅  Deleted user with email: ${email}`);
  }
  await mongoose.disconnect();
}

run().catch(err => { console.error(err.message); process.exit(1); });
