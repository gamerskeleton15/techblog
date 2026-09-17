'use client';

import { useActionState } from 'react';
import { subscribe, NewsletterState } from '@/app/newsletter/actions';

/**
 * Inline newsletter subscribe form. `dark` styles the form for dark
 * backgrounds (footer); otherwise it renders light. Shows a success or error
 * message in place of the form after submitting.
 */
export default function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [state, formAction, pending] = useActionState<NewsletterState, FormData>(
    subscribe,
    {}
  );

  if (state.success) {
    return (
      <p
        className={`text-sm font-medium ${dark ? 'text-green-400' : 'text-green-600'}`}
      >
        Thank you — you&apos;re subscribed!
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-2">
      {state.error && (
        <p className={`text-sm ${dark ? 'text-red-400' : 'text-red-600'}`}>
          {state.error}
        </p>
      )}
      <div className={`flex ${dark ? 'space-x-2' : 'gap-4'}`}>
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          className={
            dark
              ? 'flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
              : 'flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          }
        />
        <button
          type="submit"
          disabled={pending}
          className={
            dark
              ? 'bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-r transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed shrink-0'
              : 'bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed shrink-0'
          }
        >
          {pending ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
    </form>
  );
}