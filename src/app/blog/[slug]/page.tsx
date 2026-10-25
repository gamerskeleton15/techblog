import Link from 'next/link';
import Image from 'next/image';
import { getPostData, getAllPostIds } from '@/lib/posts';
import AdSlot from '@/components/AdSlot';
import AuthorBox from '@/components/AuthorBox';

const SITE_URL = 'https://techblog-six-gamma.vercel.app';

export async function generateStaticParams() {
  return await getAllPostIds();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  const ogImage = postData.coverImage?.startsWith('http')
    ? postData.coverImage
    : `${SITE_URL}${postData.coverImage || '/logo.svg'}`;

  return {
    title: `${postData.title} - TechBlog`,
    description: postData.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: postData.title,
      description: postData.description,
      type: 'article',
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: postData.date,
      authors: [postData.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: postData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: postData.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <article className="min-h-screen overflow-x-hidden bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="mb-8 inline-block text-blue-600 hover:underline">
          ← Back to all posts
        </Link>

        <div className="mb-8 rounded-lg bg-white p-8 shadow-md">
          <header className="mb-8">
            <div className="mb-4 flex items-center">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                {postData.category}
              </span>
              {postData.isUserContent && (
                <span className="ml-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                  Community post
                </span>
              )}
              <span className="ml-4 text-gray-500">
                {new Date(postData.date).toLocaleDateString()}
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-bold text-gray-900">{postData.title}</h1>

            <div className="flex items-center text-gray-600">
              <span>By {postData.author}</span>
            </div>

            {postData.tags && postData.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {postData.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {postData.coverImage && (
            <div className="mb-8 h-64 overflow-hidden rounded-lg bg-gray-200">
              <Image
                src={postData.coverImage}
                alt={postData.title}
                width={1200}
                height={630}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />

          <AuthorBox author={postData.author} date={postData.date} />
        </div>

        <div className="my-8">
          <AdSlot />
        </div>

        <div className="text-center">
          <Link href="/blog" className="font-medium text-blue-600 hover:underline">
            ← Back to all posts
          </Link>
        </div>
      </div>
    </article>
  );
}
