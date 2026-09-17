import { getDb } from './index';

/** Row shapes (camelCase maps from snake_case columns). */

export interface UserRow {
  id: string;
  email: string;
  name: string;
  salt: string;
  hash: string;
  avatar: string | null;
  createdAt: string;
}

export interface SessionRow {
  tokenHash: string;
  userId: string;
  expiresAt: number;
}

export interface PostRow {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  authorId: string | null;
  category: string;
  tags: string[];
  coverImage: string;
  rawMarkdown: string;
}

export interface MessageRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface SubscriberRow {
  email: string;
  createdAt: string;
}

/* ---------------------------------- users --------------------------------- */

/** All users, or [] when the DB is unconfigured/unreachable. */
export async function selectAllUsers(): Promise<UserRow[]> {
  const db = getDb();
  if (!db) return [];
  try {
    return await db<UserRow[]>`
      SELECT id, email, name, salt, hash, avatar, created_at
      FROM users
    `;
  } catch {
    return [];
  }
}

/** Find by email, or undefined when absent/unreachable. */
export async function selectUserByEmail(email: string): Promise<UserRow | undefined> {
  const db = getDb();
  if (!db) return undefined;
  try {
    const rows = await db<UserRow[]>`
      SELECT id, email, name, salt, hash, avatar, created_at
      FROM users WHERE email = ${email}
    `;
    return rows[0];
  } catch {
    return undefined;
  }
}

/** Find by id, or undefined when absent/unreachable. */
export async function selectUserById(id: string): Promise<UserRow | undefined> {
  const db = getDb();
  if (!db) return undefined;
  try {
    const rows = await db<UserRow[]>`
      SELECT id, email, name, salt, hash, avatar, created_at
      FROM users WHERE id = ${id}
    `;
    return rows[0];
  } catch {
    return undefined;
  }
}

/** Insert a new user. Returns ok:false when the DB is unavailable. */
export async function insertUser(
  u: Omit<UserRow, 'avatar'> & { avatar?: string | null }
): Promise<{ ok: boolean }> {
  const db = getDb();
  if (!db) return { ok: false };
  try {
    await db`
      INSERT INTO users (id, email, name, salt, hash, avatar, created_at)
      VALUES (${u.id}, ${u.email}, ${u.name}, ${u.salt}, ${u.hash}, ${u.avatar ?? null}, ${u.createdAt})
    `;
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

/** Update display name and optionally avatar for a user. */
export async function updateUserProfile(
  userId: string,
  patch: { name: string; avatar?: string }
): Promise<{ ok: boolean }> {
  const db = getDb();
  if (!db) return { ok: false };
  try {
    if (patch.avatar) {
      await db`
        UPDATE users SET name = ${patch.name}, avatar = ${patch.avatar}
        WHERE id = ${userId}
      `;
    } else {
      await db`
        UPDATE users SET name = ${patch.name}
        WHERE id = ${userId}
      `;
    }
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

/* -------------------------------- sessions -------------------------------- */

/** Insert a session record. */
export async function insertSession(s: SessionRow): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    await db`
      INSERT INTO sessions (token_hash, user_id, expires_at)
      VALUES (${s.tokenHash}, ${s.userId}, ${s.expiresAt})
    `;
  } catch {
    /* best-effort */
  }
}

/** Remove sessions for a user that are already expired (housekeeping). */
export async function deleteExpiredSessions(now: number): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    await db`DELETE FROM sessions WHERE expires_at < ${now}`;
  } catch {
    /* best-effort */
  }
}

/** Delete a specific session by token hash. */
export async function deleteSessionByTokenHash(tokenHash: string): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    await db`DELETE FROM sessions WHERE token_hash = ${tokenHash}`;
  } catch {
    /* best-effort */
  }
}

/** Look up a session by token hash, or undefined. */
export async function selectSessionByTokenHash(
  tokenHash: string
): Promise<SessionRow | undefined> {
  const db = getDb();
  if (!db) return undefined;
  try {
    const rows = await db<SessionRow[]>`
      SELECT token_hash, user_id, expires_at FROM sessions
      WHERE token_hash = ${tokenHash}
    `;
    return rows[0];
  } catch {
    return undefined;
  }
}

/* ---------------------------------- posts --------------------------------- */

/** All user-published posts, newest first. */
export async function selectAllPosts(): Promise<PostRow[]> {
  const db = getDb();
  if (!db) return [];
  try {
    return await db<PostRow[]>`
      SELECT slug, title, date, description, author, author_id, category,
             tags, cover_image, raw_markdown
      FROM posts
      ORDER BY date DESC
    `;
  } catch {
    return [];
  }
}

/** A single user post by slug, or undefined. */
export async function selectPostBySlug(slug: string): Promise<PostRow | undefined> {
  const db = getDb();
  if (!db) return undefined;
  try {
    const rows = await db<PostRow[]>`
      SELECT slug, title, date, description, author, author_id, category,
             tags, cover_image, raw_markdown
      FROM posts WHERE slug = ${slug}
    `;
    return rows[0];
  } catch {
    return undefined;
  }
}

/** Insert or replace a user post (atomic upsert on the slug primary key). */
export async function upsertPost(p: PostRow): Promise<{ ok: boolean }> {
  const db = getDb();
  if (!db) return { ok: false };
  try {
    await db`
      INSERT INTO posts (slug, title, date, description, author, author_id,
                         category, tags, cover_image, raw_markdown)
      VALUES (${p.slug}, ${p.title}, ${p.date}, ${p.description}, ${p.author},
              ${p.authorId}, ${p.category}, ${JSON.stringify(p.tags)}, ${p.coverImage},
              ${p.rawMarkdown})
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        date = EXCLUDED.date,
        description = EXCLUDED.description,
        author = EXCLUDED.author,
        author_id = EXCLUDED.author_id,
        category = EXCLUDED.category,
        tags = EXCLUDED.tags,
        cover_image = EXCLUDED.cover_image,
        raw_markdown = EXCLUDED.raw_markdown
    `;
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

/** Delete a user post by slug. */
export async function deletePostBySlug(slug: string): Promise<{ ok: boolean }> {
  const db = getDb();
  if (!db) return { ok: false };
  try {
    await db`DELETE FROM posts WHERE slug = ${slug}`;
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

/* -------------------------------- messages -------------------------------- */

/** Insert a contact message. */
export async function insertMessage(m: MessageRow): Promise<{ ok: boolean }> {
  const db = getDb();
  if (!db) return { ok: false };
  try {
    await db`
      INSERT INTO messages (id, name, email, subject, message, created_at)
      VALUES (${m.id}, ${m.name}, ${m.email}, ${m.subject}, ${m.message}, ${m.createdAt})
    `;
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

/* ------------------------------- subscribers ------------------------------ */

/** Add a subscriber; duplicates are ignored (email is the primary key). */
export async function insertSubscriber(email: string, createdAt: string): Promise<{ ok: boolean }> {
  const db = getDb();
  if (!db) return { ok: false };
  try {
    await db`
      INSERT INTO subscribers (email, created_at) VALUES (${email}, ${createdAt})
      ON CONFLICT (email) DO NOTHING
    `;
    return { ok: true };
  } catch {
    return { ok: false };
  }
}