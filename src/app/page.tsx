import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getSortedPostsData, PostData } from '@/lib/posts';
import NewsletterForm from '@/components/NewsletterForm';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'TechBlog - Latest Technology News, AI Tutorials & Programming Guides',
  description:
    'Your trusted source for the latest technology news, in-depth AI and machine learning tutorials, honest gadget reviews, and insightful industry analysis.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TechBlog - Latest Technology News, AI Tutorials & Programming Guides',
    description:
      'Your trusted source for the latest technology news, in-depth AI and machine learning tutorials, honest gadget reviews, and insightful industry analysis.',
    type: 'website',
    siteName: 'TechBlog',
    url: 'https://techblog-six-gamma.vercel.app',
    images: [{ url: '/logo.svg', width: 1200, height: 630, alt: 'TechBlog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechBlog - Latest Technology News & Tutorials',
    description:
      'In-depth AI tutorials, programming guides, gadget reviews, and tech industry analysis.',
    images: ['/logo.svg'],
  },
};

export default async function Home() {
  const allPosts = await getSortedPostsData();
  const featuredPosts = allPosts.slice(0, 3);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">TechBlog</h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl md:text-2xl">
            Your trusted source for the latest technology news, in-depth programming tutorials,
            honest gadget reviews, and insightful industry analysis.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 font-semibold text-blue-600 transition-colors duration-200 hover:bg-gray-100"
            >
              Explore Our Blog
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-blue-600"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Featured Articles</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Discover our most popular and recent tech insights
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post: PostData) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                {post.coverImage && (
                  <div className="h-48 bg-gray-200">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      width={800}
                      height={480}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="mb-2 flex items-center">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                      {post.category}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    <Link href={`/blog/${post.slug}`} className="transition-colors duration-200 hover:text-blue-600">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mb-4 line-clamp-3 text-gray-600">{post.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {post.author}</span>
                    <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AdSlot className="my-4" />
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Explore Topics</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Find articles on the topics that matter most to you
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
              <h3 className="mb-2 text-xl font-bold">Artificial Intelligence</h3>
              <p className="mb-4 text-blue-100">Explore the latest in AI, machine learning, and deep learning</p>
              <Link href="/blog?category=AI" className="inline-block rounded bg-white/20 px-4 py-2 font-medium text-white transition-colors hover:bg-white/30">
                Browse AI Articles
              </Link>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
              <h3 className="mb-2 text-xl font-bold">Programming</h3>
              <p className="mb-4 text-green-100">Tutorials, best practices, and insights for developers</p>
              <Link href="/blog?category=Programming" className="inline-block rounded bg-white/20 px-4 py-2 font-medium text-white transition-colors hover:bg-white/30">
                Browse Programming
              </Link>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white">
              <h3 className="mb-2 text-xl font-bold">Gadgets</h3>
              <p className="mb-4 text-purple-100">In-depth reviews of the latest smartphones, laptops, and tech</p>
              <Link href="/blog?category=Gadgets" className="inline-block rounded bg-white/20 px-4 py-2 font-medium text-white transition-colors hover:bg-white/30">
                Browse Gadgets
              </Link>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white">
              <h3 className="mb-2 text-xl font-bold">Industry News</h3>
              <p className="mb-4 text-orange-100">Breaking news and analysis from the world of technology</p>
              <Link href="/blog?category=News" className="inline-block rounded bg-white/20 px-4 py-2 font-medium text-white transition-colors hover:bg-white/30">
                Browse News
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Stay Updated</h2>
          <p className="mb-8 text-lg text-gray-600">
            Subscribe to our newsletter for the latest tech insights and tutorials
          </p>

          <div className="mx-auto max-w-md">
            <NewsletterForm />
          </div>

          <p className="mt-4 text-sm text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>

      <section className="bg-blue-600 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Ready to Dive Deeper?</h2>
          <p className="mb-8 text-xl">Join thousands of tech enthusiasts who read our articles daily</p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 font-semibold text-blue-600 transition-colors duration-200 hover:bg-gray-100">
              Get In Touch
            </Link>
            <Link href="/blog" className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-blue-600">
              Start Reading
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
