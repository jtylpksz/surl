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

  const currentDate = new Date();
  const expirationDate = new Date(currentDate);

  const isAuth = cookies().get('userId');

  if (isAuth) expirationDate.setDate(currentDate.getDate() + 60);
  else expirationDate.setDate(currentDate.getDate() + 30);

  const formattedExpirationDate = expirationDate
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  const query = `
    INSERT INTO urls (id, url, expiration_date, user_id)
    VALUES (?, ?, ?, ?);
  `;

  try {
    await turso.execute({
      sql: query,
      args: [id, normalURL, formattedExpirationDate, userId],
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
