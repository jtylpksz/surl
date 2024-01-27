import Link from 'next/link';

import { Github } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';

export function Nav() {
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
      <Link href="/login">
        <Button variant="secondary">Login</Button>
      </Link>

      <Link href="/signup">
        <Button>Sign up</Button>
      </Link>
    </nav>
  );
}
