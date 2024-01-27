'use client';

import { useEffect } from 'react';

import { SubmitButton } from '@/components/submit-button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Link, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { createShortenedLink } from './actions/createShortenedLink';
import { useToast } from '@/components/ui/use-toast';
import { useFormState } from 'react-dom';

const CreateLinkDialog = () => {
  const form = useForm();
  const {toast} = useToast();

  const [broadcast, createLink]: any = useFormState(createShortenedLink, {
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
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
        <Plus /> Create new link
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create new link</AlertDialogTitle>
        </AlertDialogHeader>

        <Form {...form}>
          <form action={createLink} className="flex flex-col mt-3 gap-4">
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton defaultValue="Create Link" valueInRequest="Creating Link..." />
          </form>
        </Form>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateLinkDialog;
