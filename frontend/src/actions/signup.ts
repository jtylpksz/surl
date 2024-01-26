'use server';

import { db } from '@/app/lib/localMySQL';
import { cookies } from 'next/headers';

export async function createAccount(_prevState: any, formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (Boolean(process.env.LOCAL)) {
    const credentials = {
      username,
      password,
    };

    const authWithCredentials: any = await db('auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      cache: 'no-store',
    });

    if (authWithCredentials.ok) {
      cookies().set('userId', authWithCredentials.userId);
      return {
        ok: true,
        message: 'Account created successfully',
      };
    } else {
      return {
        ok: false,
        message: 'Error creating account. Please try again later.',
      };
    }
  } else {
    return;
  }
}
