'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { User } from '@/lib/auth';
import { logout } from '@/app/auth/actions';

export default function Navbar({ user }: { user?: User | null }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2.5">
              <Image src="/logo-icon.svg" alt="TechBlog logo" width={36} height={36} className="rounded-xl" />
              <span className="hidden text-xl font-bold tracking-tight text-gray-900 font-syne sm:block">
                Tech<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Blog</span>
              </span>
            </Link>
          </div>

          <div className="hidden items-center space-x-1 md:flex">
            <Link href="/" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600">Home</Link>
            <Link href="/blog" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600">Blog</Link>
            <Link href="/about" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600">About</Link>
            <Link href="/contact" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600">Contact</Link>

            <div className="group relative">
              <button className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600">
                Legal
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="invisible absolute right-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <Link href="/privacy-policy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Privacy Policy</Link>
                <Link href="/terms" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Terms of Service</Link>
                <Link href="/disclaimer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Disclaimer</Link>
              </div>
            </div>

            {user ? (
              <div className="ml-4 flex items-center space-x-3">
                <Link href="/profile" className="group flex items-center space-x-2" title="Your profile">
                  {user.avatar ? (
                    <Image src={user.avatar} alt={`${user.name} avatar`} width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
                      {(user.name || 'U').slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <span className="max-w-[10rem] truncate text-sm text-gray-500 group-hover:text-blue-600">{user.name}</span>
                </Link>
                <Link href="/write" className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-blue-600 hover:to-indigo-700">Write</Link>
                <form action={logout}>
                  <button type="submit" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-red-600">Sign out</button>
                </form>
              </div>
            ) : (
              <Link href="/login" className="ml-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-blue-600 hover:to-indigo-700">Log in</Link>
            )}
          </div>

          <div className="flex items-center md:hidden">
            {user ? (
              <Link href="/write" className="mr-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-blue-600 hover:to-indigo-700">Write</Link>
            ) : (
              <Link href="/login" className="mr-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-blue-600 hover:to-indigo-700">Log in</Link>
            )}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="rounded-lg p-2 text-gray-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600" aria-label="Toggle mobile menu">
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-2 border-t border-gray-100 bg-white px-4 py-4">
          <Link href="/" className="block rounded-lg px-4 py-3 text-base font-medium text-gray-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/blog" className="block rounded-lg px-4 py-3 text-base font-medium text-gray-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          <Link href="/about" className="block rounded-lg px-4 py-3 text-base font-medium text-gray-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link href="/contact" className="block rounded-lg px-4 py-3 text-base font-medium text-gray-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>

          <div className="border-t border-gray-100 pt-2">
            <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Legal</p>
            <Link href="/privacy-policy" className="block rounded-lg px-4 py-3 text-base font-medium text-gray-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Privacy Policy</Link>
            <Link href="/terms" className="block rounded-lg px-4 py-3 text-base font-medium text-gray-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Terms of Service</Link>
            <Link href="/disclaimer" className="block rounded-lg px-4 py-3 text-base font-medium text-gray-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Disclaimer</Link>
          </div>

          <div className="space-y-2 pt-4">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2">
                  {user.avatar ? (
                    <Image src={user.avatar} alt={`${user.name} avatar`} width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">{(user.name || 'U').slice(0, 2).toUpperCase()}</div>
                  )}
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <Link href="/profile" className="block rounded-lg px-4 py-3 text-base font-medium text-gray-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                <Link href="/write" className="block w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-center text-base font-medium text-white transition-all duration-200 hover:from-blue-600 hover:to-indigo-700" onClick={() => setIsMobileMenuOpen(false)}>Write</Link>
                <form action={logout}>
                  <button type="submit" className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-center text-base font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-red-600">Sign out</button>
                </form>
              </>
            ) : (
              <Link href="/login" className="block w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-center text-base font-medium text-white transition-all duration-200 hover:from-blue-600 hover:to-indigo-700" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
