'use server';

import { db } from '@/app/lib/localMySQL';
import { sendErrorToClient } from '@/utils/sendErrorToClient';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Creates a new user account with the provided username and password.
 *
 * @param {any} _prevState - the previous state (unused in this function)
 * @param {FormData} formData - the form data containing username and password
 * @return {void} - no return value
 */
export const createAccount = async (_prevState: any, formData: FormData) => {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return sendErrorToClient('Username and password are required.');
  }

  if (password.length < 8) {
    return sendErrorToClient('Password must be at least 8 characters long.');
  }

  if (Boolean(process.env.LOCAL)) {
    const credentials = {
      username,
      password,
    };

    const authWithCredentials = await db('auth/signup', {
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
    }

    if (authWithCredentials.message === 'Username already exists') {
      return sendErrorToClient(
        'Username already exists. Please try with a different username.'
      );
    }

    return sendErrorToClient('Error creating account. Please try again later.');
  }
  return;
};
