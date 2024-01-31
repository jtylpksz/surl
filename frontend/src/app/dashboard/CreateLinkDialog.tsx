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

import { Plus } from 'lucide-react';
import { createShortenedLink } from './actions/createShortenedLink';

const CreateLinkDialog = () => {
  const [openedFormModal, setOpenedFormModal] = useState(false);

  const { toast } = useToast();

  const [broadcast, createLink] = useFormState(createShortenedLink, {
    ok: false,
    urlShortened: '',
    message: '',
  });

  useEffect(() => {
    if (broadcast.ok) {
      setOpenedFormModal(false);
      toast({
        title: 'Link created successfully!',
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
        <Plus /> Create new link
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create new link</AlertDialogTitle>
        </AlertDialogHeader>

        <form action={createLink} className="flex flex-col mt-3 gap-4">
          <Label>
            <span>Your long URL</span>
            <Input
              type="url"
              name="normalURL"
              placeholder="Paste your long URL here"
              autoFocus
              className="mt-2"
              required
            />
          </Label>

          <div className="flex items-center justify-end gap-2">
            <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
            <SubmitButton
              defaultValue="Create Link"
              valueInRequest="Creating Link..."
              className="w-inherit mt-0"
            />
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateLinkDialog;
