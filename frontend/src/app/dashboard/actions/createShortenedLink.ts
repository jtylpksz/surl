'use server';

import { db } from '@/lib/localMySQL';
import { db as dbProd } from '@/lib/planetscaleClient';
import { sendErrorToClient } from '@/utils/sendErrorToClient';

import { cookies } from 'next/headers';
import { randomBytes } from 'node:crypto';

interface shortURLOutput {
  ok: boolean;
  urlShortened: string;
  message: string;
}

export const createShortenedLink = async (
  _prevState: any,
  formData: FormData
) => {
  const normalURL = formData.get('normalURL');

  const data = {
    url: normalURL,
    userId: cookies().get('userId')?.value,
  };

  if (process.env.NEXT_PUBLIC_DATABASE_LOCAL === 'true') {
    const shortURL: shortURLOutput | any = await db('api/addUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (shortURL) {
      return {
        ok: shortURL.ok,
        urlShortened: shortURL.urlShortened,
        message: shortURL.msg,
      };
    }
    throw new Error('HTTP Error');
  }

  const id = randomBytes(6).toString('hex');

  const currentDate = new Date();
  const expirationDate = new Date(currentDate);
  expirationDate.setDate(currentDate.getDate() + 60);
  const formattedExpirationDate = expirationDate
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  const query = `
    INSERT INTO urls (id, url, expiration_date, user_id)
    VALUES (?, ?, ?, ?);
  `;

  try {
    await dbProd.execute(query, [id, normalURL, formattedExpirationDate, data.userId]);
    const getAll = await dbProd.execute('SELECT * FROM urls WHERE url = ?;', [
      normalURL,
    ]);

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
