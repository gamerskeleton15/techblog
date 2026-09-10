'use server';

import { storeGet, storeSet, NS } from '@/lib/store';

export interface ContactState {
  error?: string;
  success?: boolean;
}

const MESSAGES_KEY = `${NS}messages`;

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate and store a visitor-submitted contact message in Redis under
 * `techblog:messages`. Returns a success or error state for the form.
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

  const record: ContactMessage = {
    id:
      Date.now().toString(36) +
      Math.random().toString(36).slice(2, 10),
    name,
    email,
    subject: subject || '(no subject)',
    message,
    createdAt: new Date().toISOString(),
  };

  const messages = await storeGet<ContactMessage[]>(MESSAGES_KEY, []);
  messages.push(record);
  await storeSet(MESSAGES_KEY, messages);

  return { success: true };
}