'use client';

import { useActionState } from 'react';
import { submitMessage, ContactState } from '@/app/contact/actions';

export default function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitMessage,
    {}
  );

  if (state.success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Message sent
        </h3>
        <p className="text-green-700">
          Thanks for reaching out! We&apos;ll get back to you within 48 hours on
          business days.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
          {state.error}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          className="
            w-full px-3 py-2 border border-gray-300 rounded-md
            shadow-sm focus:outline-none focus:ring-blue-500
            focus:border-blue-500
          "
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          className="
            w-full px-3 py-2 border border-gray-300 rounded-md
            shadow-sm focus:outline-none focus:ring-blue-500
            focus:border-blue-500
          "
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="
            w-full px-3 py-2 border border-gray-300 rounded-md
            shadow-sm focus:outline-none focus:ring-blue-500
            focus:border-blue-500
          "
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="
            w-full px-3 py-2 border border-gray-300 rounded-md
            shadow-sm focus:outline-none focus:ring-blue-500
            focus:border-blue-500
          "
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="
          bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4
          rounded-md transition-colors duration-200
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {pending ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}