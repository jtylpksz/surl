import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CreateLinkDialog from './CreateLinkDialog';
import { Plus } from 'lucide-react';

export default function Dashboard() {
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
