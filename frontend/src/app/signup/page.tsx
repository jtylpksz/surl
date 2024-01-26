import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import RegisterForm from './form';

const RegisterPage = () => {
  const username = cookies().get('username');
  const token = cookies().get('token');

  if (username && token) {
    redirect('/dashboard');
  }

  return <RegisterForm />;
};

export default RegisterPage;
