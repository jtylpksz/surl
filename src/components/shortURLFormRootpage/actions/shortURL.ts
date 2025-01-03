'use server';

import { turso } from '@/lib/turso';
import { randomBytes } from 'node:crypto';

export const shortURL = async (_prevState: any, formData: FormData) => {
  const normalURL = formData.get('normalURL') as string;

  const id = randomBytes(6).toString('hex');

  const query = `
    INSERT INTO urls (id, url, user_id)
    VALUES (?, ?, ?);
  `;

  try {
    await turso.execute({
      sql: query,
      args: [id, normalURL, ''],
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
