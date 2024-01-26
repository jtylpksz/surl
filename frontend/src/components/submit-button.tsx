'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

import { Button } from './ui/button';

export const SubmitButton = ({
  defaultValue,
  valueInRequest,
}: {
  defaultValue?: string;
  valueInRequest?: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full mt-2"
      aria-busy={pending}
      disabled={pending}
      data-cy="submit-button"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span>{valueInRequest}</span>
        </>
      ) : (
        <span>{defaultValue}</span>
      )}
    </Button>
  );
};
