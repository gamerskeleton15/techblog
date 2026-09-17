import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/logo-icon.svg"
                alt="TechBlog logo"
                className="w-7 h-7 rounded-lg mr-2"
              />
              <h3 className="text-white font-bold text-xl font-syne tracking-tight">TechBlog</h3>
            </div>
            <p className="text-gray-400">
              A modern tech blog covering the latest in technology, programming,
              AI, and gadgets.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Subscribe for the latest tech insights and tutorials
            </p>
            <NewsletterForm dark />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm">
          <p className="text-gray-400">
            © {new Date().getFullYear()} TechBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}