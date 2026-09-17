import Link from 'next/link';
import { getPostData, getAllPostIds } from '@/lib/posts';
import AdSlot from '@/components/AdSlot';

export async function generateStaticParams() {
  return await getAllPostIds();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  return {
    title: `${postData.title} - TechBlog`,
    description: postData.description,
    openGraph: {
      title: postData.title,
      description: postData.description,
      type: 'article',
      publishedTime: postData.date,
      authors: [postData.author],
      images: [
        {
          url: postData.coverImage,
          width: 800,
          height: 600,
          alt: postData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: postData.description,
      images: [postData.coverImage],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <article className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="text-blue-600 hover:underline mb-8 inline-block"
        >
          ← Back to all posts
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <header className="mb-8">
            <div className="flex items-center mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {postData.category}
              </span>
              {postData.isUserContent && (
                <span className="ml-2 px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                  Community post
                </span>
              )}
              <span className="ml-4 text-gray-500">
                {new Date(postData.date).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {postData.title}
            </h1>

            <div className="flex items-center text-gray-600">
              <span>By {postData.author}</span>
            </div>

            {postData.tags && postData.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {postData.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {postData.coverImage && (
            <div className="mb-8 h-64 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={postData.coverImage}
                alt={postData.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </div>

        <div className="my-8">
          <AdSlot />
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="text-blue-600 hover:underline font-medium"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    </article>
  );
}