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

import { changePassword } from '../actions/changePassword';

export const ChangePasswordDialog = () => {
  const [openedFormModal, setOpenedFormModal] = useState(false);

  const { toast } = useToast();

  const [broadcast, changePasswordAction] = useFormState(changePassword, {
    ok: false,
    message: '',
  });

  useEffect(() => {
    if (broadcast.ok) {
      setOpenedFormModal(false);
      toast({
        title: 'Password changed successfully!',
      });
      window.location.reload();
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
        Change your password
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change your password</AlertDialogTitle>
        </AlertDialogHeader>

        <form
          action={changePasswordAction}
          className="flex flex-col mt-3 gap-4"
        >
          <Label>
            <span>Your current password</span>
            <Input
              type="password"
              name="currentPassword"
              placeholder="Type your current password here"
              autoFocus
              className="mt-2"
              required
            />
          </Label>

          <Label>
            <span>Your new password</span>
            <Input
              type="password"
              name="newPassword"
              placeholder="Type your new password here"
              className="mt-2"
              required
            />
          </Label>

          <div className="flex items-center justify-end gap-2">
            <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
            <SubmitButton
              defaultValue="Change Password"
              valueInRequest="Changing Password..."
              className="w-inherit mt-0"
            />
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
