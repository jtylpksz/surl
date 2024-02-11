'use server';

import { db } from '@/lib/localMySQL';
import { db as dbProd } from '@/lib/planetscaleClient';

import { decrypt } from '@/utils/security/decrypt';
import { sendErrorToClient } from '@/utils/sendErrorToClient';
import { cookies } from 'next/headers';

export const deleteAccount = async (_prevState: any, formData: FormData) => {
  const userPassword = formData.get('userPassword') as string;
  const userId = cookies().get('userId')?.value;

  if (!userPassword) {
    return sendErrorToClient('Please fill all fields.');
  }

  if (process.env.DATABASE_LOCAL === 'true') {
    const data = {
      userId,
      userPassword,
    };

    const requestAccountDeletion = await db('auth/deleteAccount', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      cache: 'no-store',
    });

    if (requestAccountDeletion.ok) {
      cookies().delete('userId');
      cookies().delete('username');
      return {
        ok: true,
        message: 'Account deleted successfully!',
      };
    }
    console.error(requestAccountDeletion)
    return sendErrorToClient('Something went wrong, please try again later');
  }

  // get user
  const query = `
    SELECT username, password, user_id FROM users WHERE user_id = ?;
  `;

  const results: any = await dbProd.execute(query, [userId]);

  if (results) {
    const decryptedPassword = decrypt(results.rows[0].password);

    if (userPassword !== decryptedPassword.message) {
      return sendErrorToClient('Passwords do not match.');
    }

    // delete account
    const query = `
      DELETE FROM users WHERE user_id = ?;
    `;

    try {
      const results: any = await dbProd.execute(query, [userId]);

      if (results) {
        cookies().delete('userId');
        cookies().delete('username');

        return {
          ok: true,
          message: 'Account deleted successfully!',
        };
      }
    } catch (error) {
      console.error(error);
      return sendErrorToClient('Something went wrong, please try again later');
    }
  }
  return sendErrorToClient('Something went wrong, please try again later?');
};
