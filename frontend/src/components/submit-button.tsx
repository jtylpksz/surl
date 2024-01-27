'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

import { Button } from './ui/button';

export const SubmitButton = ({
  defaultValue,
  valueInRequest,
  className = 'w-full mt-2',
}: {
  defaultValue?: string;
  valueInRequest?: string;
  className?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={className}
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
