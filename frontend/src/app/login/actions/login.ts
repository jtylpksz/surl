'use server';

import { db } from '@/lib/localMySQL';
import { sendErrorToClient } from '@/utils/sendErrorToClient';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const login = async (_prevState: any, formData: FormData) => {
  const username = formData.get('username');
  const password = formData.get('password');

  if (!username || !password) {
    return sendErrorToClient('Username and password are required.');
  }

  if (Boolean(process.env.LOCAL)) {
    const credentials = {
      username,
      password,
    };

    const authWithCredentials = await db('auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      cache: 'no-store',
    });

    if (authWithCredentials.ok) {
      cookies().set('userId', authWithCredentials.userId);
      cookies().set('username', authWithCredentials.username);

      redirect('/dashboard');
    } else {
      return sendErrorToClient('Invalid credentials.');
    }
  }
  return;
};
