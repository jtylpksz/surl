import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { turso } from '@/lib/turso';

import { URLSList } from './components/URLSList';
import { CreateLinkDialog } from './components/CreateLinkDialog';
import { Navigation } from './components/Navigation';

const getShortenedURLsList = async () => {
  const userId = cookies().get('userId')?.value as string;

  const query = `
    SELECT urls.id, urls.url, urls.user_id
    FROM urls
    INNER JOIN users ON urls.user_id = users.user_id
    WHERE users.user_id = ?;
  `;

  try {
    const shortenedURLs = await turso.execute({
      sql: query,
      args: [userId],
    });

    if (shortenedURLs) {
      return shortenedURLs.rows;
    }
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong!');
  }
};

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const Dashboard = async () => {
  const userId = cookies().get('userId');
  const username = cookies().get('username');

  if (!userId || !username) {
    return redirect('/login');
  }

  const shortenedURLsList: any = await getShortenedURLsList();

  return (
    <>
      <Navigation />
      <main className="px-8 mx-auto flex-col items-center gap-2">
        <section className="sm:flex justify-between items-center mb-8">
          <CreateLinkDialog />
        </section>

        <URLSList urls={shortenedURLsList} />
      </main>
    </>
  );
};

export default Dashboard;
