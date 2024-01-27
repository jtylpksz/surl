'use client';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';

import { login } from '@/actions/login';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardTitle } from '@/components/ui/card';
import { SubmitButton } from '@/components/submit-button';
import { useToast } from '@/components/ui/use-toast';

const LoginForm = () => {
  const form = useForm();
  const { toast } = useToast();

  const [broadcast, loginAction]: any = useFormState(login, {
    ok: false,
    message: '',
  });

  useEffect(() => {
    if (broadcast.ok && broadcast.message) {
      toast({
        title: broadcast.message,
      });
    } else if (!broadcast.ok && broadcast.message) {
      toast({
        title: 'Something went wrong',
        description: broadcast.message,
      });
    }
  }, [broadcast, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-sm p-5 mx-auto">
        <CardTitle className="text-3xl">Login</CardTitle>
        <Form {...form}>
          <form action={loginAction} className="flex flex-col mt-3 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="off"
                      autoFocus
                      placeholder="Enter your username"
                      data-cy="username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="off"
                      placeholder="Enter your password"
                      data-cy="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    <Link
                      href="/signup"
                      className="hover:underline"
                      data-cy="signup-link"
                    >
                      You don&apos;t have an account? Sign up here
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton defaultValue="Login" valueInRequest="Logging in..." />
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
