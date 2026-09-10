'use client';

import { useActionState, useRef, useState } from 'react';
import Link from 'next/link';
import { createPost, WriteState } from '@/app/write/actions';

export default function WriteForm() {
  const [state, formAction, pending] = useActionState<WriteState, FormData>(
    createPost,
    {}
  );

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [imageError, setImageError] = useState('');

  async function handleInsertImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setImageError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Upload failed.');
      }
      const textarea = contentRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const snippet = `![image](${data.url})`;
        textarea.value =
          textarea.value.slice(0, start) +
          snippet +
          textarea.value.slice(end);
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + snippet.length;
      }
    } catch (err) {
      setImageError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setBusy(false);
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← Back to home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 font-syne tracking-tight">
              Write a post
            </h1>
            <p className="mt-1 text-gray-600">
              Publish a new article to the blog. Markdown is supported.
            </p>
          </header>

          <form action={formAction} className="space-y-5">
            {state.error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                {state.error}
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="Your article title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Short description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="A one-line summary (shown on the blog list)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="cover" className="block text-sm font-medium text-gray-700 mb-1">
                Cover image <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <input
                type="file"
                id="cover"
                name="cover"
                accept="image/*"
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  placeholder="e.g. Programming"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="comma, separated, tags"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content (Markdown)
                </label>
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={busy}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {busy ? 'Uploading…' : 'Insert image'}
                </button>
              </div>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleInsertImage}
              />
              {imageError && (
                <div className="mt-2 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                  {imageError}
                </div>
              )}
              <textarea
                id="content"
                name="content"
                ref={contentRef}
                required
                rows={12}
                placeholder={"## Your heading\n\nWrite your article in Markdown here."}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <Link
                href="/blog"
                className="px-5 py-3 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={pending}
                className="px-6 py-3 text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {pending ? 'Publishing…' : 'Publish'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}