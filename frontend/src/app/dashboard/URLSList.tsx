'use client';

import { Ref, useRef, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

import { URLSListProps } from './types/types';

export const URLSList = ({ urls }: { urls: URLSListProps[] }) => {
  const [urlList, setUrlList] = useState<URLSListProps[]>(urls);
  const linkNameRef: Ref<HTMLInputElement> | any =
    useRef<HTMLInputElement>(null);

  const filterUrlList = () => {
    if (linkNameRef.current) {
      const filteredList = urls.filter((url) =>
        url.url.includes(linkNameRef.current.value)
      );

      setUrlList(filteredList);
    }
  };

  return (
    <>
      <section>
        <Input
          type="url"
          placeholder="Search links"
          ref={linkNameRef}
          onChange={filterUrlList}
        />
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {urlList.map((url: URLSListProps) => (
          <Link
            href={`${window?.location.origin}/${url.id}`}
            key={url.id}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card>
              <CardHeader>
                <CardTitle>{url.id}</CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="flex flex-col">
                  <span>{url.url}</span>
                  <span>Expires on {url.expiration_date.slice(0, 10)}</span>
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </>
  );
};
