import { redirect } from 'next/navigation';
import { db } from '@/lib/localMySQL';
import { db as dbProd } from '@/lib/planetscaleClient';

interface OutputReq {
  id: string;
  url: string;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const getWebsiteURL = async (id: string) => {
  if (process.env.DATABASE_LOCAL === 'true') {
    const fullURL: OutputReq[] | any = await db(`api/get/${id}`);

    if (fullURL[0]?.id === id && fullURL[0]?.url) {
      return fullURL[0]?.url;
    }
    return {
      notFound: true,
      message: 'URL not found.',
    };
  } else {
    try {
      const getAll = await dbProd.execute(
        `SELECT * FROM urls WHERE id = ?;`, [id]
      );
  
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
  }
};

const RedirectToPage = async ({ params }: { params: { slug: string } }) => {
  const fullWebsiteURL = await getWebsiteURL(params.slug);
  if (fullWebsiteURL.notFound) {
    return <h1>{fullWebsiteURL.message}</h1>;
  }
  return redirect(fullWebsiteURL);
};

export default RedirectToPage;
