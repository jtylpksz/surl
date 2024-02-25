import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import LoginForm from './form';

const LoginPage = () => {
  const username = cookies().get('username');
  const token = cookies().get('supabase_auth_token');

  if (username && token) {
    redirect('/dashboard');
  }

  return <LoginForm />;
};

export default LoginPage;
