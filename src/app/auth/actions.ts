'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  createSession,
  destroySession,
  hashPassword,
  readUsers,
  verifyPassword,
  writeUsers,
  User,
} from '@/lib/auth';

export interface AuthState {
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Combined login + first-time signup. On the first login with a new email
 * an account is created automatically ("first login with email, then
 * everyone can post").
 */
export async function authenticate(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');

  if (!EMAIL_RE.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }
  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters.' };
  }

  const users = await readUsers();
  let user = users.find((u: User) => u.email === email);

  if (!user) {
    // First login with this email -> create the account.
    const { salt, hash } = await hashPassword(password);
    user = {
      id: randomId(),
      email,
      name: email.split('@')[0],
      salt,
      hash,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    await writeUsers(users);
  } else {
    const ok = await verifyPassword(password, user.salt, user.hash);
    if (!ok) {
      return { error: 'Invalid email or password.' };
    }
  }

  await createSession(user.id);
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function logout(): Promise<void> {
  await destroySession();
  revalidatePath('/', 'layout');
  redirect('/');
}

function randomId(): string {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 10)
  );
}