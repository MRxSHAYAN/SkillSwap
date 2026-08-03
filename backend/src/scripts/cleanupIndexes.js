/**
 * One-time cleanup script for SkillSwapp database.
 * Run with: node src/scripts/cleanupIndexes.js
 * 
 * This script:
 * 1. Shows which MongoDB database the server connects to
 * 2. Lists all users currently in the DB
 * 3. Removes stale `username: null` fields that break the sparse unique index
 * 4. Drops and re-syncs all Mongoose indexes cleanly
 */

require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌  MONGO_URI not found in .env');
  process.exit(1);
}

async function cleanup() {
  console.log('\n🔌  Connecting to:', MONGO_URI.replace(/\/\/.*@/, '//***@'));
  await mongoose.connect(MONGO_URI);
  console.log('✅  Connected.\n');

  const db = mongoose.connection.db;
  const usersCollection = db.collection('users');

  // 1. Show all users currently in DB
  const allUsers = await usersCollection.find({}, { projection: { email: 1, username: 1, createdAt: 1 } }).toArray();
  console.log(`📋  Users currently in DB (${allUsers.length} total):`);
  allUsers.forEach((u, i) => {
    const hasNullUsername = 'username' in u && u.username === null;
    console.log(`   ${i + 1}. ${u.email}  |  username: ${JSON.stringify(u.username)}${hasNullUsername ? '  ⚠️  HAS NULL USERNAME' : ''}`);
  });

  // 2. Fix all documents where username is explicitly null — unset the field
  const fixResult = await usersCollection.updateMany(
    { username: null },
    { $unset: { username: '' } }
  );
  console.log(`\n🔧  Fixed ${fixResult.modifiedCount} document(s) with username: null → field removed`);

  // 3. Drop all indexes on the users collection (except _id)
  const indexes = await usersCollection.indexes();
  const toDrop = indexes.filter(idx => idx.name !== '_id_');
  for (const idx of toDrop) {
    await usersCollection.dropIndex(idx.name);
    console.log(`🗑️   Dropped index: ${idx.name}`);
  }

  // 4. Re-sync indexes via Mongoose schema
  const User = require('../models/User');
  await User.syncIndexes();
  console.log('✅  Indexes re-synced from schema.\n');

  // 5. Show final state
  const finalUsers = await usersCollection.find({}, { projection: { email: 1, username: 1 } }).toArray();
  console.log(`📋  Users after cleanup (${finalUsers.length} total):`);
  finalUsers.forEach((u, i) => {
    console.log(`   ${i + 1}. ${u.email}  |  username: ${JSON.stringify(u.username)}`);
  });

  console.log('\n✅  Cleanup complete! You can now register with any email.\n');
  await mongoose.disconnect();
  process.exit(0);
}

cleanup().catch(err => {
  console.error('❌  Cleanup failed:', err.message);
  mongoose.disconnect();
  process.exit(1);
});
