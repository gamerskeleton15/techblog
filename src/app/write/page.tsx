import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import WriteForm from '@/components/WriteForm';

export default async function WritePage() {
  const user = await getSessionUser();
  if (!user) {
    redirect('/login');
  }
  return <WriteForm />;
}