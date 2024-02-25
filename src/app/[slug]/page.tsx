import { turso } from '@/lib/turso';
import { redirect } from 'next/navigation';

interface OutputReq {
  id?: string;
  url?: string;
  notFound: boolean;
  message: string;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const getWebsiteURL = async (id: string) => {
  try {
    const getAll = await turso.execute({
      sql: 'SELECT * FROM urls WHERE id = ?;',
      args: [id],
    });

    if (getAll.rows[0].id === id && getAll.rows[0].url) {
      return getAll.rows[0].url;
    }
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
      message: 'URL not found.',
    };
  }
};

const RedirectToPage = async ({ params }: { params: { slug: string } }) => {
  const fullWebsiteURL: OutputReq | any = await getWebsiteURL(params.slug);
  if (fullWebsiteURL.notFound) {
    return <h1>{fullWebsiteURL.message}</h1>;
  }
  return redirect(fullWebsiteURL);
};

export default RedirectToPage;
