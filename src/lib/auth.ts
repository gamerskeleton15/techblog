import { createHash, randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import {
  deleteExpiredSessions,
  deleteSessionByTokenHash,
  insertSession,
  selectSessionByTokenHash,
  selectUserById,
} from '@/db/queries';

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

function toUser(row: {
  id: string;
  email: string;
  name: string;
  salt: string;
  hash: string;
  avatar: string | null;
  createdAt: string;
}): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    salt: row.salt,
    hash: row.hash,
    createdAt: row.createdAt,
    ...(row.avatar ? { avatar: row.avatar } : {}),
  };
}

/** Read the current logged-in user from the request cookie, or null. */
export async function getSessionUser(): Promise<User | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const record = await selectSessionByTokenHash(sha256(token));
  if (!record || record.expiresAt < Date.now()) return null;

  const user = await selectUserById(record.userId);
  return user ? toUser(user) : null;
}

/**
 * Create a session for the given user and set the auth cookie. Housekeep
 * expired sessions in passing (Postgres makes this a single DELETE).
 * Writes a cookie, so it must only be called from a Server Function or
 * Route Handler (not from Server Components during render).
 */
export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString('hex');

  await insertSession({
    tokenHash: sha256(token),
    userId,
    expiresAt: Date.now() + SESSION_TTL_MS,
  });
  void deleteExpiredSessions(Date.now());

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
    await deleteSessionByTokenHash(sha256(token));
  }
  (await cookies()).delete(SESSION_COOKIE);
}