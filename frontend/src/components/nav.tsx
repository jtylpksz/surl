import { Github } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

export function Nav() {
  return (
    <nav className="flex items-center justify-end w-full gap-4">
      <a
        href="https://github.com/martinval11/surl"
        target="_blank"
        rel="noopener noreferrer"
        title="Source code"
      >
        <Github />
      </a>
      <ModeToggle />
    </nav>
  );
}
