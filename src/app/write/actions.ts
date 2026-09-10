'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import { getSessionUser } from '@/lib/auth';
import { storeGet, storeSet, NS } from '@/lib/store';
import { getAllPostIds, getSortedPostsData, UserPost } from '@/lib/posts';
import { saveUploadedFile } from '@/lib/uploads';

export interface WriteState {
  error?: string;
}

const POSTS_KEY = `${NS}posts`;

async function readUserPosts(): Promise<UserPost[]> {
  return storeGet<UserPost[]>(POSTS_KEY, []);
}

async function existingSlugs(): Promise<Set<string>> {
  const slugs = new Set<string>();
  (await getSortedPostsData()).forEach((p) => slugs.add(p.slug));
  (await getAllPostIds()).forEach(({ slug }) => slugs.add(slug));
  return slugs;
}

export async function createPost(
  _prevState: WriteState,
  formData: FormData
): Promise<WriteState> {
  const user = await getSessionUser();
  if (!user) {
    redirect('/login');
  }

  const title = String(formData.get('title') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const category = String(formData.get('category') ?? '').trim();
  const tagsRaw = String(formData.get('tags') ?? '').trim();
  const content = String(formData.get('content') ?? '').trim();

  if (!title) {
    return { error: 'Please add a title.' };
  }
  if (!content) {
    return { error: 'Please write some content.' };
  }

  const tags = tagsRaw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  // Optional cover image from the form's file input.
  let coverImage = '';
  const cover = formData.get('cover');
  if (cover instanceof File && cover.size > 0) {
    try {
      coverImage = await saveUploadedFile(cover, 'covers');
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Cover upload failed.' };
    }
  }

  let slug = slugify(title, { lower: true, strict: true });
  const taken = await existingSlugs();
  if (slug && taken.has(slug)) {
    slug = `${slug}-${Math.random().toString(36).slice(2, 5)}`;
  }
  if (!slug) {
    slug = `post-${Date.now().toString(36)}`;
  }

  const post: UserPost = {
    slug,
    title,
    date: new Date().toISOString().slice(0, 10),
    description,
    author: user.name || user.email,
    authorId: user.id,
    category: category || 'General',
    tags,
    coverImage,
    rawMarkdown: content,
  };

  const posts = await readUserPosts();
  posts.push(post);
  await storeSet(POSTS_KEY, posts);

  revalidatePath('/', 'layout');
  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
  redirect(`/blog/${slug}`);
}