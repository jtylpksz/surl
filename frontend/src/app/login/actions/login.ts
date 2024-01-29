'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@/lib/localMySQL';
import { db as dbProd } from '@/lib/planetscaleClient';

import { decrypt } from '@/utils/security/decrypt';
import { sendErrorToClient } from '@/utils/sendErrorToClient';

export const login = async (_prevState: any, formData: FormData) => {
  const username = formData.get('username');
  const password = formData.get('password');

  if (!username || !password) {
    return sendErrorToClient('Username and password are required.');
  }

  if (process.env.NEXT_PUBLIC_DATABASE_LOCAL === 'true') {
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

  const query = `
    SELECT * FROM users
    WHERE username = ?;
  `;

  try {
    const results: any = await dbProd.execute(query, [username]);

    if (results) {
      // get password from db, decrypt it and compare with the original password

      const encryptedPassword = results.rows[0].password;
      const decryptedPassword = decrypt(encryptedPassword);

      if (password !== decryptedPassword.message) {
        return sendErrorToClient('Invalid credentials.');
      }

      cookies().set('userId', results.rows[0].user_id);
      cookies().set('username', results.rows[0].username);
    }
  } catch (error) {
    console.error(error);
    return sendErrorToClient('Something went wrong. Is this user registered?');
  }

  redirect('/dashboard');
};
