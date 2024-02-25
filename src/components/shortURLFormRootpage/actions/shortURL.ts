'use server';

import { turso } from '@/lib/turso';
import { randomBytes } from 'node:crypto';

export const shortURL = async (_prevState: any, formData: FormData) => {
  const normalURL = formData.get('normalURL') as string;

  const id = randomBytes(6).toString('hex');

  const currentDate = new Date();
  const expirationDate = new Date(currentDate);
  expirationDate.setDate(currentDate.getDate() + 30);
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
      args: [id, normalURL, formattedExpirationDate, null],
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
    throw new Error('Something went wrong!');
  }
};
