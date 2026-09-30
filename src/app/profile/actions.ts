'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { updateUserProfile } from '@/db/queries';
import { saveUploadedFile } from '@/lib/uploads';

export interface ProfileState {
  error?: string;
  success?: boolean;
}

/**
 * Update the current user's display name and/or avatar image. Returns error
 * state on validation failure; revalidates so the navbar reflects changes.
 */
export async function updateProfile(
  _prevState: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const user = await getSessionUser();
  if (!user) {
    redirect('/login');
  }

  const name = String(formData.get('name') ?? '').trim();
  const avatarFile = formData.get('avatar');

  if (name && name.length > 40) {
    return { error: 'Display name must be 40 characters or fewer.' };
  }

  let avatar: string | undefined;
  if (avatarFile instanceof File && avatarFile.size > 0) {
    try {
      avatar = await saveUploadedFile(avatarFile, 'avatars');
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Avatar upload failed.' };
    }
  }

  // Reflect the anonymous default name if the field was cleared.
  const nextName = name || user.email.split('@')[0];

  const { ok } = await updateUserProfile(user.id, {
    name: nextName,
    ...(avatar ? { avatar } : {}),
  });
  if (!ok) {
    return { error: 'Could not save your profile right now. Please try again.' };
  }

  revalidatePath('/', 'layout');
  return { success: true };
}