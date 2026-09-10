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
                <a
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-white transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-white transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service"
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Subscribe for the latest tech insights and tutorials
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  flex-1 px-3 py-2 bg-gray-700 border border-gray-600
                  rounded-l text-white placeholder-gray-400 focus:outline-none
                  focus:ring-2 focus:ring-blue-500
                "
              />
              <button
                type="submit"
                className="
                  bg-blue-600 hover:bg-blue-700 text-white font-medium
                  py-2 px-4 rounded-r transition-colors duration-200
                "
              >
                Subscribe
              </button>
            </form>
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