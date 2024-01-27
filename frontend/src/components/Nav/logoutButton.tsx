'use client';

import { Button } from '../ui/button';

export const LogoutButton = () => {
  const deleteUserCookies = () => {
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    window.location.reload();
  };

  return (
    <Button onClick={deleteUserCookies} variant="secondary">
      Logout
    </Button>
  );
};
