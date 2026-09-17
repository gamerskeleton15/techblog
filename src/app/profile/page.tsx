import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { getUserPosts } from '@/lib/posts';
import { deletePost } from '@/app/write/actions';
import ProfileForm from '@/components/ProfileForm';

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default async function ProfilePage() {
  const user = await getSessionUser();
  if (!user) {
    redirect('/login');
  }

  const allPosts = await getUserPosts();
  const myPosts = allPosts.filter((p) => p.authorId === user.id);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="mb-2">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← Back to home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <header className="mb-6 flex items-center gap-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={`${user.name} avatar`}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                {initials(user.name || user.email)}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-syne tracking-tight">
                {user.name || user.email.split('@')[0]}
              </h1>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </header>

          <ProfileForm
            initialName={user.name || user.email.split('@')[0]}
            initialAvatar={user.avatar}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">My posts</h2>
          <p className="text-sm text-gray-500 mb-4">
            Articles you have published to the community.
          </p>

          {myPosts.length === 0 ? (
            <div className="py-6 text-center">
              <p className="text-gray-600 mb-3">You haven&apos;t published anything yet.</p>
              <Link
                href="/write"
                className="inline-block px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg transition-all duration-200"
              >
                Write your first post
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {myPosts.map((post) => (
                <li key={post.id} className="py-4 flex items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {post.title}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(post.date).toLocaleDateString()} · {post.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/edit/${post.slug}`}
                      className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                    >
                      Edit
                    </Link>
                    <form action={deletePost.bind(null, post.slug)}>
                      <button
                        type="submit"
                        onClick={(e) => {
                          if (!window.confirm('Delete this post? This cannot be undone.')) {
                            e.preventDefault();
                          }
                        }}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}