'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { turso } from '@/lib/turso';

import { decrypt } from '@/utils/security/decrypt';
import { sendErrorToClient } from '@/utils/sendErrorToClient';

export const login = async (_prevState: any, formData: FormData) => {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return sendErrorToClient('Username and password are required.');
  }

  const query = `
    SELECT * FROM users
    WHERE username = ?;
  `;

  try {
    const results: any = await turso.execute({
      sql: query,
      args: [username],
    });

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
