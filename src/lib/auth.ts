import { createHash, randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { storeGet, storeSet, NS } from './store';

export interface User {
  id: string;
  email: string;
  name: string;
  salt: string;
  hash: string;
  createdAt: string;
  /** Public avatar image URL path (e.g. /uploads/avatars/…), when set. */
  avatar?: string;
}

const USERS_KEY = `${NS}users`;
const SESSIONS_KEY = `${NS}sessions`;

interface SessionRecord {
  tokenHash: string;
  userId: string;
  expiresAt: number;
}

const SESSION_COOKIE = 'tb_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

function scryptAsync(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });
}

/** Hash a password with a fresh random salt. Returns hex salt + hash. */
export async function hashPassword(password: string): Promise<{ salt: string; hash: string }> {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = await scryptAsync(password, salt);
  return { salt, hash: derivedKey.toString('hex') };
}

/** Verify a password against a stored salt + hash using a constant-time compare. */
export async function verifyPassword(
  password: string,
  salt: string,
  hash: string
): Promise<boolean> {
  const derivedKey = await scryptAsync(password, salt);
  const expected = Buffer.from(hash, 'hex');
  return (
    derivedKey.length === expected.length && timingSafeEqual(derivedKey, expected)
  );
}

async function readUsers(): Promise<User[]> {
  return storeGet<User[]>(USERS_KEY, []);
}

async function writeUsers(users: User[]): Promise<void> {
  await storeSet(USERS_KEY, users);
}

async function readSessions(): Promise<SessionRecord[]> {
  return storeGet<SessionRecord[]>(SESSIONS_KEY, []);
}

async function writeSessions(sessions: SessionRecord[]): Promise<void> {
  await storeSet(SESSIONS_KEY, sessions);
}

/** Read the current logged-in user from the request cookie, or null. */
export async function getSessionUser(): Promise<User | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const tokenHash = sha256(token);
  const record = (await readSessions()).find((s) => s.tokenHash === tokenHash);
  if (!record || record.expiresAt < Date.now()) return null;

  const user = (await readUsers()).find((u) => u.id === record.userId);
  return user ?? null;
}

/**
 * Create a session for the given user and set the auth cookie.
 * Writes a cookie, so it must only be called from a Server Function or
 * Route Handler (not from Server Components during render).
 */
export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString('hex');
  const record: SessionRecord = {
    tokenHash: sha256(token),
    userId,
    expiresAt: Date.now() + SESSION_TTL_MS,
  };

  const sessions = await readSessions();
  sessions.push(record);
  await writeSessions(sessions);

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  });
}

/** Destroy the current session and clear the cookie. Server Function only. */
export async function destroySession(): Promise<void> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (token) {
    const tokenHash = sha256(token);
    await writeSessions(
      (await readSessions()).filter((s) => s.tokenHash !== tokenHash)
    );
  }
  (await cookies()).delete(SESSION_COOKIE);
}

export { readUsers, writeUsers };