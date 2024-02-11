'use server';

import { randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@/lib/localMySQL';
import { db as dbProd } from '@/lib/planetscaleClient';

import { encrypt } from '@/utils/security/encrypt';
import { sendErrorToClient } from '@/utils/sendErrorToClient';

export const createAccount = async (_prevState: any, formData: FormData) => {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return sendErrorToClient('Username and password are required.');
  }

  if (password.length < 8) {
    return sendErrorToClient('Password must be at least 8 characters long.');
  }

  if (process.env.DATABASE_LOCAL === 'true') {
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

  const userId = randomBytes(6).toString('hex');

  const query = `
    INSERT INTO users (username, password, user_id)
    VALUES (?, ?, ?);
  `;

  try {
    const encryptedPassword = encrypt(password);

    const results = await dbProd.execute(query, [
      username,
      encryptedPassword,
      userId,
    ]);

    if (results) {
      cookies().set('userId', userId);
      cookies().set('username', username);
    }
  } catch (error: any) {
    if (
      error.message.includes('AlreadyExists') ||
      error.code === 'ERR_DUP_ENTRY'
    ) {
      return sendErrorToClient(
        'Username already exists. Please try with a different username.'
      );
    }

    console.error(error);
    return sendErrorToClient('Error creating account. Please try again later.');
  }

  redirect('/dashboard');
};
