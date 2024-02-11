'use client';

import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/submit-button';
import { useToast } from '@/components/ui/use-toast';

import { deleteAccount } from '../actions/deleteAccount';

export const DeleteAccountDialog = () => {
  const [openedFormModal, setOpenedFormModal] = useState(false);

  const { toast } = useToast();

  const [broadcast, deleteAccountAction] = useFormState(deleteAccount, {
    ok: false,
    message: '',
  });

  useEffect(() => {
    if (broadcast.ok) {
      setOpenedFormModal(false);
      toast({
        title: 'Account deleted successfully!',
        description: 'You will be redirected to the home page.',
      });
      window.location.href = '/';
    } else if (!broadcast.ok && broadcast.message) {
      toast({
        title: 'Something went wrong',
        description: broadcast.message,
      });
    }
  }, [broadcast, toast]);

  return (
    <AlertDialog open={openedFormModal} onOpenChange={setOpenedFormModal}>
      <AlertDialogTrigger className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
        Delete your account
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete your account</AlertDialogTitle>
        </AlertDialogHeader>

        <form action={deleteAccountAction} className="flex flex-col mt-3 gap-4">
          <Label>
            <span>Your password</span>
            <Input
              type="password"
              name="userPassword"
              placeholder="Type your password here"
              autoFocus
              className="mt-2"
              required
            />
          </Label>

          <div className="flex items-center justify-end gap-2">
            <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
            <SubmitButton
              defaultValue="Delete Account"
              valueInRequest="Deleting Account..."
              className="w-inherit mt-0"
            />
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
