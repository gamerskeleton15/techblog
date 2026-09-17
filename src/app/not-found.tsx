import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          {"Sorry, we couldn't find the page you're looking for. It might have been "}
          moved, deleted, or is temporarily unavailable.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="
              inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium
              py-2 px-6 rounded transition-colors duration-200
            "
          >
            Return Home
          </Link>

          <div>
            <p className="text-gray-500 text-sm mb-2">Or try one of these pages:</p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/blog"
                className="text-blue-600 hover:underline text-sm"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-blue-600 hover:underline text-sm"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-blue-600 hover:underline text-sm"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}