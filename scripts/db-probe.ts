/** Debug probe: surface the raw error behind the session round-trip failure. */
import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomBytes } from 'node:crypto';
import { getDb } from '../src/db/index';

const envPath = path.join(process.cwd(), '.env.local');
for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}

function sha256(v: string): string {
  return createHash('sha256').update(v).digest('hex');
}

async function main() {
  const db = getDb();
  if (!db) throw new Error('no db');

  // Existing user id to attach the session to.
  const users = await db`SELECT id FROM users LIMIT 1`;
  if (!users.length) throw new Error('no users in db');
  const userId = users[0].id;

  const tokenHash = sha256(randomBytes(32).toString('hex'));
  const expiresAt = Date.now() + 60000;

  console.log('inserting raw session row...');
  try {
    const res = await db`
      INSERT INTO sessions (token_hash, user_id, expires_at)
      VALUES (${tokenHash}, ${userId}, ${expiresAt})
    `;
    console.log('insert ok, count:', res.count);
  } catch (e) {
    console.error('INSERT ERROR:', e.message);
    process.exit(1);
  }

  console.log('looking it up raw...');
  try {
    const rows = await db`
      SELECT token_hash, user_id, expires_at FROM sessions
      WHERE token_hash = ${tokenHash}
    `;
    console.log('rows:', JSON.stringify(rows));
  } catch (e) {
    console.error('SELECT ERROR:', e.message);
    process.exit(1);
  }

  // cleanup
  await db`DELETE FROM sessions WHERE token_hash = ${tokenHash}`;
  console.log('cleaned up');
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('FAIL:', e.message);
    process.exit(1);
  });