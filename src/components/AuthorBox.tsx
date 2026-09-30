import Link from 'next/link';

interface AuthorBoxProps {
  author: string;
  date: string;
}

/**
 * Author information box displayed at the bottom of every blog post.
 * Satisfies Google's E-E-A-T (Experience, Expertise, Authoritativeness,
 * Trustworthiness) trust signals for AdSense compliance.
 */
export default function AuthorBox({ author, date }: AuthorBoxProps) {
  const initials = author
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          {/* Avatar placeholder */}
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold select-none">
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              Written by
            </p>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{author}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              ML/AI engineer and tech writer covering artificial intelligence, machine
              learning, software development, and the technology shaping our world.
              Passionate about making complex technical concepts accessible to
              everyone.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
              <span>Last updated: {formattedDate}</span>
              <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
              <Link
                href="/about"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                More about the author
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
