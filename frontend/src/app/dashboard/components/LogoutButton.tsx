'use client';

import { MenubarItem } from '@/components/ui/menubar';

export const LogoutButton = () => {
  const logout = () => {
    document.cookie =
      'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/login';
  };

  return (
    <MenubarItem onClick={logout} className="cursor-pointer">
      Logout
    </MenubarItem>
  );
};
