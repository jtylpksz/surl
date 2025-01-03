'use server';

import { turso } from '@/lib/turso';
import { sendErrorToClient } from '@/utils/sendErrorToClient';

import { cookies } from 'next/headers';
import { randomBytes } from 'node:crypto';

export const createShortenedLink = async (
  _prevState: any,
  formData: FormData
) => {
  const normalURL = formData.get('normalURL') as string;

  const userId = cookies().get('userId')?.value as string;

  const id = randomBytes(6).toString('hex');

  const query = `
    INSERT INTO urls (id, url, user_id)
    VALUES (?, ?, ?);
  `;

  try {
    await turso.execute({
      sql: query,
      args: [id, normalURL, userId],
    });
    const getAll = await turso.execute({
      sql: 'SELECT * FROM urls WHERE url = ?;',
      args: [normalURL],
    });

    return {
      ok: true,
      urlShortened: `https://surlm.vercel.app/${getAll.rows[0].id}`,
      message: 'URL Shortened successfully',
    };
  } catch (error) {
    console.error(error);
    return sendErrorToClient('Something went wrong!');
  }
};
