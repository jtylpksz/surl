import { redirect } from 'next/navigation';
import { db } from '../lib/localMySQL';

type OutputReq = {
  id: string;
  url: string;
};

const getWebsiteURL = async (id: string) => {
  const fullURL: OutputReq[] | any = await db(`/get/${id}`);

  if (fullURL[0].id === id && fullURL[0].url) {
    return fullURL[0].url;
  }
  return {
    notFound: true,
    message: 'URL not found.',
  };
};

export default async function Page({ params }: { params: { slug: string } }) {
  const fullWebsiteURL = await getWebsiteURL(params.slug);
  if (fullWebsiteURL.notFound) {
    return <h1>{fullWebsiteURL.message}</h1>;
  }
  return redirect(fullWebsiteURL);
}
