'use server';

import { db } from '@/app/lib/localMySQL';

type shortURLOutput = {
  ok: boolean;
  urlShortened: string;
  msg: string;
}

export const shortURL = async (_prevState: any, formData: FormData) => {
  const normalURL = formData.get('normalURL');

  const data = {
    url: normalURL,
  };

  const shortURL: shortURLOutput | any = await db('addUrl', {
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
      msg: shortURL.msg,
    }
  }
  throw new Error('HTTP Error')
};
