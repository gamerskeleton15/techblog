'use server';

import { insertMessage, MessageRow } from '@/db/queries';

export interface ContactState {
  error?: string;
  success?: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate and store a visitor-submitted contact message in Postgres.
 * Returns a success or error state for the form.
 */
export async function submitMessage(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const subject = String(formData.get('subject') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name) {
    return { error: 'Please enter your name.' };
  }
  if (!EMAIL_RE.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }
  if (!message) {
    return { error: 'Please enter a message.' };
  }
  if (message.length > 5000) {
    return { error: 'Message is too long (max 5000 characters).' };
  }

  const record: MessageRow = {
    id:
      Date.now().toString(36) +
      Math.random().toString(36).slice(2, 10),
    name,
    email,
    subject: subject || '(no subject)',
    message,
    createdAt: new Date().toISOString(),
  };

  const { ok } = await insertMessage(record);
  if (!ok) {
    return { error: 'Could not send your message right now. Please try again.' };
  }

  return { success: true };
}