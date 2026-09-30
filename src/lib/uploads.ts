import fs from 'fs';
import path from 'path';
import { randomBytes } from 'crypto';

export type UploadFolder = 'covers' | 'avatars' | 'inline';

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']);

const EXT_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
};

/**
 * Save an uploaded image file into `public/uploads/<folder>` and return the
 * public URL path (e.g. `/uploads/covers/a1b2c3.jpg`). Server-only.
 *
 * Validation: must be an allowed image type and within the size limit.
 * Throws an Error the caller should surface to the user.
 */
export async function saveUploadedFile(
  file: File,
  folder: UploadFolder
): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error('Please upload a valid image (JPEG, PNG, GIF, WebP, or SVG).');
  }
  if (file.size > MAX_BYTES) {
    throw new Error('Image must be 4MB or smaller.');
  }

  const ext = EXT_BY_TYPE[file.type] ?? 'bin';
  const name = `${Date.now().toString(36)}-${randomBytes(6).toString('hex')}.${ext}`;

  const uploadRoot = path.join(process.cwd(), 'public', 'uploads');
  const dir = path.join(uploadRoot, folder);
  fs.mkdirSync(dir, { recursive: true });

  const bytes = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(dir, name), bytes);

  return `/uploads/${folder}/${name}`;
}