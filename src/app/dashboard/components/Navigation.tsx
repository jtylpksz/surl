import Link from 'next/link';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';

import { ModeToggle } from '@/components/mode-toggle';
import { cookies } from 'next/headers';
import { LogoutButton } from './LogoutButton';

export const Navigation = () => {
  const username = cookies().get('username')?.value;

  return (
    <nav className="flex items-center justify-between w-full px-8 py-4 mb-8 border-b">
      <div>
        <h1 className="mb-4 sm:mb-0 text-3xl">Dashboard</h1>
      </div>

      <div className="flex items-center justify-end w-full gap-4">
        <ModeToggle />
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer">
              {username || 'Menu'}
            </MenubarTrigger>
            <MenubarContent>
              <Link href="/dashboard/account">
                <MenubarItem className="cursor-pointer">
                  Account Settings
                </MenubarItem>
              </Link>
              <MenubarSeparator />
              <LogoutButton />
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </nav>
  );
};
