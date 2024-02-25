'use server';

import { turso } from '@/lib/turso';

export const deleteURLFromDB = async (id: string | number) => {
  const query = `
    DELETE FROM urls
    WHERE id = ?;
  `;

  try {
    const deleteShortenedURLOnDatabase = await turso.execute({
      sql: query,
      args: [id],
    });

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
};
