/** Live-database smoke test with extra debug logging for the session round-trip. */
import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { getDb, SCHEMA } from '../src/db/index';
import {
  insertUser,
  selectUserByEmail,
  insertSession,
  selectSessionByTokenHash,
  upsertPost,
  selectPostBySlug,
  deletePostBySlug,
  deleteSessionByTokenHash,
} from '../src/db/queries';

const envPath = path.join(process.cwd(), '.env.local');
for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}

function sha256(v: string): string {
  return createHash('sha256').update(v).digest('hex');
}

function scryptAsync(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });
}

const TEST_EMAIL = `smoke-${Date.now()}@test.local`;
const TEST_PASS = 'smoke-pass-123';
const TEST_SLUG = `smoke-${Date.now()}`;

async function main(): Promise<boolean> {
  const db = getDb();
  if (!db) {
    console.error('FAIL: no DATABASE_URL configured');
    return false;
  }

  console.log('1/8 bootstrapping schema...');
  await db.unsafe(SCHEMA);

  console.log('2/8 sign-up: insert user + scrypt hash...');
  const salt = randomBytes(16).toString('hex');
  const key = await scryptAsync(TEST_PASS, salt);
  const userId = `smoke-${Date.now()}`;
  const ins = await insertUser({
    id: userId,
    email: TEST_EMAIL,
    name: 'Smoke Tester',
    salt,
    hash: key.toString('hex'),
    createdAt: new Date().toISOString(),
  });
  if (!ins.ok) throw new Error('insertUser failed');

  console.log('3/8 login: find user by email + verify password...');
  const user = await selectUserByEmail(TEST_EMAIL);
  if (!user) throw new Error('user not found by email');
  const derived = await scryptAsync(TEST_PASS, user.salt);
  const ok =
    derived.length === Buffer.from(user.hash, 'hex').length &&
    timingSafeEqual(derived, Buffer.from(user.hash, 'hex'));
  if (!ok) throw new Error('password verification failed');

  console.log('4/8 session: insert + look up by token hash...');
  const token = randomBytes(32).toString('hex');
  console.log('   generated token (hex):', token);
  const tokenHash = sha256(token);
  console.log('   tokenHash we will store:', tokenHash);
  await insertSession({ tokenHash, userId, expiresAt: Date.now() + 60000 });
  console.log('   insertSession returned ok');
  const session = await selectSessionByTokenHash(tokenHash);
  console.log('   lookup result:', session ?? 'NULL');
  if (!session || session.userId !== userId) {
    // DEBUG: let's see what's actually in the table
    const all = await db`SELECT token_hash, user_id FROM sessions WHERE user_id = ${userId}`;
    console.log('   DEBUG: raw rows for this user_id:', JSON.stringify(all));
    throw new Error('session round-trip failed');
  }

  console.log('5/8 publish a post (upsert)...');
  const post = await upsertPost({
    slug: TEST_SLUG,
    title: 'Smoke test post',
    date: '2026-09-14',
    description: 'temporary',
    author: 'Smoke Tester',
    authorId: userId,
    category: 'General',
    tags: ['smoke'],
    coverImage: '/images/ai-healthcare.svg',
    rawMarkdown: '# Hi',
  });
  if (!post.ok) throw new Error('upsertPost failed');

  console.log('6/8 read post by slug...');
  const fetched = await selectPostBySlug(TEST_SLUG);
  if (!fetched || fetched.title !== 'Smoke test post') throw new Error('post round-trip failed');

  console.log('7/8 cleanup: delete post, session, user...');
  await deletePostBySlug(TEST_SLUG);
  await deleteSessionByTokenHash(tokenHash);
  await db`DELETE FROM users WHERE id = ${userId}`;
  const gone = await selectUserByEmail(TEST_EMAIL);
  if (gone) throw new Error('user cleanup failed');

  console.log('8/8 confirming no leftover rows...');
  const leftovers = await db`SELECT count(*)::int AS n FROM users WHERE email = ${TEST_EMAIL}`;
  if (leftovers[0].n !== 0) throw new Error('leftover rows detected');

  console.log('ALL PASS — login + posting paths work against live Postgres');
  return true;
}

main()
  .then((ok) => process.exit(ok ? 0 : 1))
  .catch((e) => {
    console.error('FAIL:', e.message);
    process.exit(1);
  });