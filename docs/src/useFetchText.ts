import { useState } from 'react';
import useFetch from 'use-http/dist';

export type FetchRequest = { loading: boolean; response: Response; text: string; error: any };

export default function useFetchText(...args: Parameters<typeof useFetch>): FetchRequest {
  const f = useFetch(...args);
  const [text, setText] = useState<string>('');

  if (!f.loading && !f.error && f.response) {
    f.response.text().then((t: string) => {
      if (t !== text) setText(t);
    });
  }

  return { ...f, text };
}
