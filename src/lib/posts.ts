import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { storeGet, NS } from './store';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const POSTS_KEY = `${NS}posts`;

export interface PostData {
  id: string;
  title: string;
  date: string;
  description: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  slug: string;
  /** Author user id, present only for user-submitted posts (profile listing). */
  authorId?: string;
}

export interface PostContent extends PostData {
  contentHtml: string;
  /** True when the post was submitted by a logged-in user (not an MDX file). */
  isUserContent?: boolean;
}

/** A post authored by a logged-in user, stored in Upstash. */
export interface UserPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  /** Id of the logged-in user who wrote this post (for profile listing). */
  authorId: string;
  category: string;
  tags: string[];
  coverImage: string;
  rawMarkdown: string;
}

function readMdxPostData(): PostData[] {
  let fileNames: string[];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch {
    return [];
  }

  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      return {
        id,
        ...(matterResult.data as Omit<PostData, 'id'>),
      };
    });
}

async function readUserPosts(): Promise<UserPost[]> {
  return storeGet<UserPost[]>(POSTS_KEY, []);
}

/** User-submitted posts, mapped into the shared PostData shape. */
export async function getUserPosts(): Promise<PostData[]> {
  return (await readUserPosts()).map((post) => ({
    id: post.slug,
    slug: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
    author: post.author,
    category: post.category,
    tags: post.tags,
    coverImage: post.coverImage,
    authorId: post.authorId,
  }));
}

/** All posts — authored MDX files plus user submissions — sorted by date desc. */
export async function getSortedPostsData(): Promise<PostData[]> {
  return [...readMdxPostData(), ...(await getUserPosts())].sort((a, b) =>
    a.date < b.date ? 1 : -1
  );
}

/** All slugs (MDX + user posts) for static generation, flat { slug } format. */
export async function getAllPostIds(): Promise<{ slug: string }[]> {
  const slugs = new Set<string>();
  try {
    for (const fileName of fs.readdirSync(postsDirectory)) {
      if (fileName.endsWith('.mdx')) {
        slugs.add(fileName.replace(/\.mdx$/, ''));
      }
    }
  } catch {
    /* posts dir missing — user posts only */
  }
  for (const post of await readUserPosts()) {
    slugs.add(post.slug);
  }
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function getPostData(slug: string): Promise<PostContent> {
  // 1) Try an authored MDX file first.
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (fs.existsSync(fullPath)) {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await remark().use(html).process(matterResult.content);
    return {
      slug,
      contentHtml: processedContent.toString(),
      ...(matterResult.data as Omit<PostContent, 'slug' | 'contentHtml' | 'isUserContent'>),
    };
  }

  // 2) Fall back to a user-submitted post in Upstash.
  const post = (await readUserPosts()).find((p) => p.slug === slug);
  if (post) {
    const processedContent = await remark().use(html).process(post.rawMarkdown);
    return {
      id: post.slug,
      slug: post.slug,
      title: post.title,
      date: post.date,
      description: post.description,
      author: post.author,
      category: post.category,
      tags: post.tags,
      coverImage: post.coverImage,
      contentHtml: processedContent.toString(),
      isUserContent: true,
      authorId: post.authorId,
    };
  }

  throw new Error(`Post not found: ${slug}`);
}