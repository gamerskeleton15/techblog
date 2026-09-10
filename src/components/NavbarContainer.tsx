import { getSessionUser } from '@/lib/auth';
import Navbar from './Navbar';

/**
 * Async server wrapper that reads the current session and passes the user
 * into the client Navbar. Keeps cookie handling server-side.
 */
export default async function NavbarContainer() {
  const user = await getSessionUser();
  return <Navbar user={user} />;
}