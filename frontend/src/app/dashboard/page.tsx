import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Input } from '@/components/ui/input';
import CreateLinkDialog from './CreateLinkDialog';

const Dashboard = () => {
  const userId = cookies().get('userId')
  const username = cookies().get('username');

  if (!userId || !username) {
    return redirect('/login');
  }
  
  return (
    <main className="p-8 mx-auto flex-col items-center gap-2 py-8 md:py-12 md:pb-8">
      <section className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Dashboard</h1>
        <CreateLinkDialog />
      </section>

      <section>
        <Input type="url" placeholder="Search links" />
      </section>

      <section></section>
    </main>
  );
}

export default Dashboard;
