'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
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
} from '@/components/ui/form';
import { Plus, Wand2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/submit-button';
import { createShortenedLink } from './actions/createShortenedLink';
import { useToast } from '@/components/ui/use-toast';

const CreateLinkDialog = () => {
  const form = useForm();
  const { toast } = useToast();

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
                  <FormLabel>Your long URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      autoComplete="off"
                      autoFocus
                      placeholder="Paste your long URL here"
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
                  <FormLabel className="flex items-center gap-2">
                    <Wand2 width={20} height={20} className="opacity-70" /> sURL
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      autoComplete="off"
                      placeholder="Your shortened URL will be placed here"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <SubmitButton
                defaultValue="Create Link"
                valueInRequest="Creating Link..."
                className="w-inherit mt-2"
              />
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateLinkDialog;
