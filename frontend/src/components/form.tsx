'use client';

import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { shortURL } from '@/actions/shortURL';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';

export function SForm() {
  const [shortenedURLState, setShortenedURLState] = useState('');
  const [copyToClipboardText, setCopyToClipboardText] =
    useState('Copy to clipboard');
  const [state, formAction]: any = useFormState(shortURL, {
    ok: true,
    urlShortened: '',
    msg: '',
  });

  useEffect(() => {
    setShortenedURLState(state.urlShortened);
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-4 min-w-80">
      <Label>
        <span>Your long URL</span>
        <Input
          type="url"
          name="normalURL"
          placeholder="Paste your long URL here"
          className="mt-2"
          required
        />
      </Label>

      <Label>
        <span>sURL</span>
        <Input value={shortenedURLState} className="mt-2" disabled />
      </Label>

      {shortenedURLState ? (
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            navigator.clipboard.writeText(shortenedURLState);

            setCopyToClipboardText('Copied!');
            setTimeout(() => {
              setCopyToClipboardText('Copy to Clipboard');
            }, 3000);
          }}
        >
          {copyToClipboardText}
        </Button>
      ) : null}

      <Button type="submit">Submit</Button>
    </form>
  );
}
