'use server';

import { insertSubscriber } from '@/db/queries';

export interface NewsletterState {
  error?: string;
  success?: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Add an email to the subscriber list in Postgres. Duplicates are ignored
 * (email is the primary key). Returns an inline success/error state so the
 * NewsletterForm can show feedback without a navigation.
 */
export async function subscribe(
  _prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  const { ok } = await insertSubscriber(email, new Date().toISOString());
  if (!ok) {
    return { error: 'Could not save your subscription right now. Please try again.' };
  }

  return { success: true };
}