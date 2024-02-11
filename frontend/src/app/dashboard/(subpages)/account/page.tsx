import { ChangePasswordDialog } from './components/ChangePasswordDialog';
import { DeleteAccountDialog } from './components/DeleteAccountDialog';

export const dynanic = 'force-dynamic';
export const revalidate = 0;

const AccountSettings = () => {
  return (
    <main className="mx-auto max-w-96 flex-col items-center gap-2 py-8 md:py-12 md:pb-8">
      <h1 className="text-3xl mb-8">Account Settings</h1>

      <section>
        <h2 className="text-2xl mb-2">Change Password</h2>
        <hr className="mb-2" />
        <ChangePasswordDialog />
      </section>

      <section className="mt-8 mb-2">
        <h2 className="text-2xl mb-2">Delete Account</h2>
        <hr className="mb-2" />
        <DeleteAccountDialog />
      </section>
    </main>
  );
};

export default AccountSettings;
