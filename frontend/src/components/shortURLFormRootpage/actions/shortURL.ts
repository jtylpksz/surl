'use server';

import { db } from '@/lib/localMySQL';
import { db as dbProd } from '@/lib/planetscaleClient';
import { randomBytes } from 'node:crypto';

interface shortURLOutput {
  ok: boolean;
  urlShortened: string;
  message: string;
}

export const shortURL = async (_prevState: any, formData: FormData) => {
  const normalURL = formData.get('normalURL');

  const data = {
    url: normalURL,
  };

  if (Boolean(process.env.LOCAL)) {
    const shortURL: shortURLOutput | any = await db('api/addUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      cache: 'no-store',
    });

    if (shortURL) {
      return {
        ok: shortURL.ok,
        urlShortened: shortURL.urlShortened,
        message: shortURL.msg,
      };
    }
    console.error(shortURL);
    throw new Error('HTTP Error');
  }

  const id = randomBytes(6).toString('hex');
  const query = `
    INSERT INTO urls (id, url)
    VALUES (?, ?);
  `;

  try {
    await dbProd.execute(query, [id, normalURL]);
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
    throw new Error('Something went wrong!');
  }
};
