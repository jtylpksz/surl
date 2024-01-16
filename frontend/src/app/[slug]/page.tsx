import { redirect } from 'next/navigation';
import { db } from '../lib/localMySQL';
import { db as dbProd } from '../lib/planetscaleClient';

type OutputReq = {
  id: string;
  url: string;
};

const getWebsiteURL = async (id: string) => {
  if (Boolean(process.env.LOCAL)) {
    const fullURL: OutputReq[] | any = await db(`/get/${id}`);

    if (fullURL[0]?.id === id && fullURL[0]?.url) {
      return fullURL[0]?.url;
    }
    return {
      notFound: true,
      message: 'URL not found.',
    };
  } else {
    const getAll = await dbProd.execute(
      `SELECT * FROM urls WHERE id = '${id}';`
    );

    if (getAll.rows[0].id === id && getAll.rows[0].url) {
      return getAll.rows[0].url;
    }
    return {
      notFound: true,
      message: 'URL not found.',
    };
  }
};

export default async function Page({ params }: { params: { slug: string } }) {
  const fullWebsiteURL = await getWebsiteURL(params.slug);
  if (fullWebsiteURL.notFound) {
    return <h1>{fullWebsiteURL.message}</h1>;
  }
  return redirect(fullWebsiteURL);
}
