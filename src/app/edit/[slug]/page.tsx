import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { getUserPostBySlug } from '@/lib/posts';
import WriteForm from '@/components/WriteForm';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await getSessionUser();
  if (!user) {
    redirect('/login');
  }

  const post = await getUserPostBySlug(slug);
  // Only the owning author may edit, and MDX-authored posts are not editable.
  if (!post || post.authorId !== user.id) {
    redirect(`/blog/${slug}`);
  }

  return (
    <WriteForm
      initialPost={{
        slug: post.slug,
        title: post.title,
        description: post.description,
        category: post.category || 'General',
        tags: post.tags,
        coverImage: post.coverImage,
        content: post.rawMarkdown,
      }}
    />
  );
}