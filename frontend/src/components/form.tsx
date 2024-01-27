'use client';

import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { shortURL } from '@/actions/shortURL';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { Wand2 } from 'lucide-react';
import { SubmitButton } from './submit-button';

export function SForm() {
  const [shortenedURLState, setShortenedURLState] = useState('');
  const [copyToClipboardText, setCopyToClipboardText] =
    useState('Copy to clipboard');
  const [state, formAction]: any = useFormState(shortURL, {
    ok: true,
    urlShortened: '',
    message: '',
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
        <span className="flex items-center gap-2">
          <Wand2 width={20} height={20} className="opacity-70" /> sURL
        </span>
        <Input
          value={shortenedURLState}
          placeholder="Your shortened URL will be placed here"
          className="mt-2"
          disabled={shortenedURLState !== '' ? false : true}
        />
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

      <SubmitButton defaultValue='Shorten URL' valueInRequest='Shortening URL...' />
      <small className='max-w-80 opacity-70'>
        The shortened URL has a duration of 30 days. But if you have an account
        , the URL will be valid for 60 days (30 days more).
      </small>
    </form>
  );
}
