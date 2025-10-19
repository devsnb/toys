import type { Metadata } from 'next';
import JsonFormatterClient from './client';

export const metadata: Metadata = {
  title: 'JSON Formatter',
  description: 'Format and minify JSON',
};

export default function Page() {
  const initialValue = `{
  "name": "Dev Toys",
  "version": "1.0.0",
  "features": [
    "formatter",
    "encoder",
    "color picker"
  ],
  "nested": {
    "enabled": true,
    "count": 3
  }
}`;

  return <JsonFormatterClient initialValue={initialValue} />;
}
