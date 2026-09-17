'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import { getSessionUser } from '@/lib/auth';
import { deletePostBySlug, selectPostBySlug, upsertPost } from '@/db/queries';
import { getAllPostIds, getSortedPostsData } from '@/lib/posts';
import { saveUploadedFile } from '@/lib/uploads';

export interface WriteState {
  error?: string;
}

async function existingSlugs(): Promise<Set<string>> {
  const slugs = new Set<string>();
  (await getSortedPostsData()).forEach((p) => slugs.add(p.slug));
  (await getAllPostIds()).forEach(({ slug }) => slugs.add(slug));
  return slugs;
}

/**
 * Create a new user post, or — when a `slug` hidden field is present and the
 * current user owns that post — update the existing post in place (keeping
 * the original slug and publish date, so internal links stay valid).
 */
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
  const editingSlug = String(formData.get('slug') ?? '').trim();

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

  // Editing an existing user post — verify ownership up front.
  let existing: { slug: string; date: string; coverImage: string; authorId: string | null } | undefined;
  if (editingSlug) {
    existing = await selectPostBySlug(editingSlug);
    if (!existing || existing.authorId !== user.id) {
      return { error: 'You can only edit posts you have published.' };
    }
  }

  // Optional cover image from the form's file input. On edit, keep the
  // existing image unless a new one is uploaded.
  let coverImage = existing?.coverImage ?? '';
  const cover = formData.get('cover');
  if (cover instanceof File && cover.size > 0) {
    try {
      coverImage = await saveUploadedFile(cover, 'covers');
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Cover upload failed.' };
    }
  }

  const slug = existing?.slug ?? (await makeSlug(title, existingSlugs));

  // Create requires a cover image; an edit keeps whatever image it holds.
  const isNew = !existing;
  if (isNew && !coverImage) {
    return { error: 'Please add a cover image. Every post needs one.' };
  }

  const { ok } = await upsertPost({
    slug: slug!,
    title,
    date: existing?.date ?? new Date().toISOString().slice(0, 10),
    description,
    author: user.name || user.email,
    authorId: user.id,
    category: category || 'General',
    tags,
    coverImage,
    rawMarkdown: content,
  });
  if (!ok) {
    return { error: 'Could not save your post right now. Please try again.' };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
  redirect(`/blog/${slug}`);
}

async function makeSlug(
  title: string,
  existingSlugs: () => Promise<Set<string>>
): Promise<string> {
  let slug = slugify(title, { lower: true, strict: true });
  if (slug && (await existingSlugs()).has(slug)) {
    slug = `${slug}-${Math.random().toString(36).slice(2, 5)}`;
  }
  if (!slug) {
    slug = `post-${Date.now().toString(36)}`;
  }
  return slug;
}

/**
 * Delete a user post. Only the owning author may delete it. Redirects back
 * to the profile page so the updated list is re-rendered.
 */
export async function deletePost(slug: string): Promise<void> {
  const user = await getSessionUser();
  if (!user) {
    redirect('/login');
  }

  const target = await selectPostBySlug(slug);
  if (!target || target.authorId !== user.id) {
    redirect(`/blog/${slug}`);
  }

  const { ok } = await deletePostBySlug(slug);
  if (!ok) {
    redirect(`/blog/${slug}`);
  }

  revalidatePath('/', 'layout');
  revalidatePath('/blog');
  revalidatePath('/profile');
  redirect('/profile');
}