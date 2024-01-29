import Link from 'next/link';
import { cookies } from 'next/headers';

import { Github } from 'lucide-react';
import { ModeToggle } from '../mode-toggle';
import { Button } from '../ui/button';
import { GoToDashboardButton } from './goToDashboardButton';

export const Nav = () => {
  const userId = cookies().get('userId');
  const username = cookies().get('username');

  return (
    <nav className="flex items-center justify-end w-full gap-4">
      <a
        href="https://github.com/martinval11/surl"
        target="_blank"
        rel="noopener noreferrer"
        title="Source code"
        className="hover:opacity-70 transition"
      >
        <Github />
      </a>
      <ModeToggle />
      {userId && username ? (
        <GoToDashboardButton />
      ) : (
        <>
          <Link href="/login">
            <Button variant="secondary">Login</Button>
          </Link>

          <Link href="/signup">
            <Button>Sign up</Button>
          </Link>
        </>
      )}
    </nav>
  );
};
