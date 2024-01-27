'use server';

import { db } from '@/app/lib/localMySQL';
import { db as dbProd } from '@/app/lib/planetscaleClient';
import { randomBytes } from 'node:crypto';

interface shortURLOutput {
  ok: boolean;
  urlShortened: string;
  message: string;
};

/**
 * Function for shortening a URL using a specified method.
 *
 * @param {any} _prevState - the previous state (not used in this function)
 * @param {FormData} formData - the form data containing the normal URL
 * @return {Promise<shortURLOutput>} an object with the shortened URL information
 */
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
    });

    if (shortURL) {
      return {
        ok: shortURL.ok,
        urlShortened: shortURL.urlShortened,
        message: shortURL.msg,
      };
    }
    throw new Error('HTTP Error');
  } else {
    const id = randomBytes(6).toString('hex');
    const query = `
    INSERT INTO urls (id, url)
    VALUES ('${id}', '${normalURL}');
  `;

    try {
      await dbProd.execute(query);
      const getAll = await dbProd.execute(
        `SELECT * FROM urls WHERE url = '${normalURL}';`
      );

      return {
        ok: true,
        urlShortened: `https://surlm.vercel.app/${getAll.rows[0].id}`,
        message: 'URL Shortened successfully',
      };
    } catch (error) {
      throw new Error('Something went wrong!');
    }
  }
};
