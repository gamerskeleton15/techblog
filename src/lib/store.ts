import { Redis } from '@upstash/redis';

/**
 * Namespace prefix for all app keys in Upstash Redis.
 */
export const NS = 'techblog:';

function buildRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token || url.startsWith('YOUR_')) {
    return null;
  }
  return new Redis({ url, token });
}

// Lazy init so import never crashes when env creds are absent.
let redis: Redis | null | undefined;

function redisClient(): Redis | null {
  if (redis === undefined) {
    redis = buildRedis();
  }
  return redis;
}

/**
 * Read a JSON value from Upstash. Falls back to `fallback` when the value is
 * missing or when Upstash is unreachable/unconfigured (so local dev with no
 * creds never crashes — it simply gets empty data).
 */
export async function storeGet<T>(key: string, fallback: T): Promise<T> {
  const client = redisClient();
  if (!client) return fallback;
  try {
    const raw = await client.get<string>(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * Write a JSON value to Upstash. No-op when Upstash is unconfigured/unreachable.
 */
export async function storeSet<T>(key: string, value: T): Promise<void> {
  const client = redisClient();
  if (!client) return;
  try {
    await client.set(key, JSON.stringify(value));
  } catch {
    /* best-effort: ignore remote failures */
  }
}