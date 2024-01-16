import { Footer } from '@/components/footer';
import { SForm } from '@/components/form';
import { Nav } from '@/components/nav';

export const dynamic = 'force-dynamic';
export default async function Home() {
  return (
    <main className="p-4 mx-auto flex max-w-[1150px] flex-col items-center gap-2 h-screen">
      <Nav />
      <header className="flex flex-col items-center pt-6 pb-4">
        <h1 className="text-center text-3xl text-balance leading-tight mt-2 tracking-tighter md:text-6xl lg:leading-[1.1]">
          sURL
        </h1>
        <h2 className="text-center text-xl leading-tight tracking-tighter mt-3 mb-4 md:text-2xl opacity-75">
          Simple URL Shortener
        </h2>
      </header>

      <SForm />
      <Footer />
    </main>
  );
}
