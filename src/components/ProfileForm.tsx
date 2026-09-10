'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { updateProfile, ProfileState } from '@/app/profile/actions';

export default function ProfileForm({
  initialName,
  initialAvatar,
}: {
  initialName: string;
  initialAvatar?: string;
}) {
  const [state, formAction, pending] = useActionState<ProfileState, FormData>(
    updateProfile,
    {}
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="px-4 py-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
          Profile updated.
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Display name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          maxLength={40}
          defaultValue={initialName}
          placeholder="Your display name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
          Avatar image
        </label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <p className="mt-2 text-xs text-gray-400">
          {initialAvatar ? 'Upload a new image to replace the current avatar.' : 'PNG, JPG, WebP, GIF or SVG, up to 4MB.'}
        </p>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Link
          href="/"
          className="px-5 py-3 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors duration-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-3 text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {pending ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </form>
  );
}