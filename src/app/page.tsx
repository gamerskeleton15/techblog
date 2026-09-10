import Link from 'next/link';
import { getSortedPostsData, PostData } from '@/lib/posts';

export default async function Home() {
  const allPosts = await getSortedPostsData();
  const featuredPosts = allPosts.slice(0, 3); // Show first 3 posts as featured

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            TechBlog
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your trusted source for the latest technology news, in-depth programming tutorials,
            honest gadget reviews, and insightful industry analysis.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/blog"
              className="
                bg-white text-blue-600 hover:bg-gray-100 font-semibold
                py-3 px-8 rounded-full transition-colors duration-200
                inline-flex items-center justify-center
              "
            >
              Explore Our Blog
            </Link>
            <Link
              href="/about"
              className="
                border-2 border-white text-white hover:bg-white hover:text-blue-600
                font-semibold py-3 px-8 rounded-full transition-colors duration-200
                inline-flex items-center justify-center
              "
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Articles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and recent tech insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post: PostData) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {post.coverImage && (
                  <div className="h-48 bg-gray-200">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition-colors duration-200"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      By {post.author}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="
                bg-blue-600 hover:bg-blue-700 text-white font-medium
                py-3 px-8 rounded-full transition-colors duration-200
                inline-flex items-center justify-center
              "
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Topics
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find articles on the topics that matter most to you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Artificial Intelligence</h3>
              <p className="text-blue-100 mb-4">
                Explore the latest in AI, machine learning, and deep learning
              </p>
              <Link
                href="/blog?category=AI"
                className="inline-block bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Browse AI Articles
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Programming</h3>
              <p className="text-green-100 mb-4">
                Tutorials, best practices, and insights for developers
              </p>
              <Link
                href="/blog?category=Programming"
                className="inline-block bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Browse Programming
              </Link>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Gadgets</h3>
              <p className="text-purple-100 mb-4">
                In-depth reviews of the latest smartphones, laptops, and tech
              </p>
              <Link
                href="/blog?category=Gadgets"
                className="inline-block bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Browse Gadgets
              </Link>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Industry News</h3>
              <p className="text-orange-100 mb-4">
                Breaking news and analysis from the world of technology
              </p>
              <Link
                href="/blog?category=News"
                className="inline-block bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Browse News
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for the latest tech insights and tutorials
          </p>

          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="
                flex-1 px-4 py-3 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-transparent
              "
              required
            />
            <button
              type="submit"
              className="
                bg-blue-600 hover:bg-blue-700 text-white font-medium
                py-3 px-6 rounded-lg transition-colors duration-200
              "
            >
              Subscribe
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Dive Deeper?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of tech enthusiasts who read our articles daily
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="
                bg-white text-blue-600 hover:bg-gray-100 font-semibold
                py-3 px-8 rounded-full transition-colors duration-200
                inline-flex items-center justify-center
              "
            >
              Get In Touch
            </Link>
            <Link
              href="/blog"
              className="
                border-2 border-white text-white hover:bg-white hover:text-blue-600
                font-semibold py-3 px-8 rounded-full transition-colors duration-200
                inline-flex items-center justify-center
              "
            >
              Start Reading
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
