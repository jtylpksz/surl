'use server';

import { turso } from '@/lib/turso';
import { cookies } from 'next/headers';

import { decrypt } from '@/utils/security/decrypt';
import { encrypt } from '@/utils/security/encrypt';
import { sendErrorToClient } from '@/utils/sendErrorToClient';

export const changePassword = async (_prevState: any, formData: FormData) => {
  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  const userId = cookies().get('userId')?.value as string;

  if (!currentPassword || !newPassword) {
    return sendErrorToClient('Please fill all fields.');
  }

  // get user
  const query = `
    SELECT username, password, user_id FROM users WHERE user_id = ?;
  `;
  const results: any = await turso.execute({
    sql: query,
    args: [userId],
  });

  if (results) {
    const encryptedPassword = results.rows[0].password;
    const decryptedPassword = decrypt(encryptedPassword);

    if (currentPassword !== decryptedPassword.message) {
      return sendErrorToClient('Passwords do not match.');
    }

    // update data
    const query = `
      UPDATE users SET password = ? WHERE user_id = ?;
    `;

    const newEncryptedPassword = encrypt(newPassword);

    try {
      const results: any = await turso.execute({
        sql: query,
        args: [newEncryptedPassword, userId],
      });

      if (results) {
        return {
          ok: true,
          message: 'Password changed successfully!',
        };
      }
    } catch (error) {
      console.error(error);
      return sendErrorToClient('Something went wrong, please try again later');
    }
  }
  return sendErrorToClient('Something went wrong, please try again later');
};
