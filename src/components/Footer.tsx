import Link from 'next/link';
import Image from 'next/image';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-8 text-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <div className="mb-4 flex items-center">
              <Image src="/logo-icon.svg" alt="TechBlog logo" width={28} height={28} className="mr-2 rounded-lg" />
              <h3 className="text-xl font-bold tracking-tight text-white font-syne">TechBlog</h3>
            </div>
            <p className="text-gray-400">
              A modern tech blog covering the latest in technology, programming, AI, and gadgets.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="transition-colors duration-200 hover:text-white">Home</Link></li>
              <li><Link href="/about" className="transition-colors duration-200 hover:text-white">About</Link></li>
              <li><Link href="/contact" className="transition-colors duration-200 hover:text-white">Contact</Link></li>
              <li><Link href="/blog" className="transition-colors duration-200 hover:text-white">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/blog?category=AI" className="transition-colors duration-200 hover:text-white">Artificial Intelligence</Link></li>
              <li><Link href="/blog?category=Programming" className="transition-colors duration-200 hover:text-white">Programming</Link></li>
              <li><Link href="/blog?category=Gadgets" className="transition-colors duration-200 hover:text-white">Gadgets</Link></li>
              <li><Link href="/blog?category=News" className="transition-colors duration-200 hover:text-white">Industry News</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="transition-colors duration-200 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors duration-200 hover:text-white">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="transition-colors duration-200 hover:text-white">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Stay Updated</h4>
            <p className="mb-4 text-gray-400">Subscribe for the latest tech insights and tutorials</p>
            <NewsletterForm dark />
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
          <p className="text-gray-400">© {new Date().getFullYear()} TechBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
