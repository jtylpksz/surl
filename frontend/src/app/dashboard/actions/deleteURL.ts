'use server';

import { db } from '@/lib/localMySQL';
import { db as dbProd } from '@/lib/planetscaleClient';
import {DBResponse} from '../types/types';

export const deleteURLFromDB = async (id: string | number): Promise<DBResponse> => {
  if (process.env.DATABASE_LOCAL === 'true') {
    const deleteShortenedURLOnDatabase = await db('api/deleteUrlByUser', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (deleteShortenedURLOnDatabase.ok) {
      return {
        ok: true,
        title: 'URL deleted successfully!',
      };
    }
    return {
      ok: false,
      title: 'Something went wrong while deleting the URL',
      description: 'Please try again later.',
    };
  }

  const query = `
    DELETE FROM urls
    WHERE id = ?;
  `;

  try {
    const deleteShortenedURLOnDatabase = await dbProd.execute(query, [id]);

    if (deleteShortenedURLOnDatabase) {
      return {
        ok: true,
        title: 'URL deleted successfully!',
      };
    }
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      title: 'Something went wrong while deleting the URL',
      description: 'Please try again later.',
    };
  }
  return {
    ok: false,
    title: 'Something went wrong while deleting the URL',
    description: 'Please try again later.',
  }
}
