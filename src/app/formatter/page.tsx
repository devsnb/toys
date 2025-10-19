import Link from 'next/link';
import type { Metadata } from 'next';
import { toolsMetadata } from '@/components/app-layout';

export const metadata: Metadata = {
  title: 'Formatter',
  description: 'Text and code formatters',
};

/* NOTE: The exported `formatterReadme` was removed because Next.js page modules
   must only export supported entry values. Use `toolsMetadata` directly inside
   the component below to derive the list of formatter tools. */

export default function FormatterIndexPage() {
  const formatters = toolsMetadata
    .filter((t) => t.href.startsWith('/formatter'))
    .map((t) => ({ id: t.id, href: t.href, title: t.title, description: t.description }));

  return (
    <main className="max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Formatter</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Tools to format, pretty-print, and minify various data formats.
        </p>
      </header>

      <section className="grid gap-4">
        {formatters.length === 0 && (
          <div className="p-4 border rounded-md text-muted-foreground">
            No formatter tools available.
          </div>
        )}

        {formatters.map((tool) => (
          <Link key={tool.id} href={tool.href} className="block">
            <article className="p-4 border rounded-md hover:shadow-sm transition">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">{tool.title}</h2>
                <span className="text-sm text-muted-foreground">{tool.href.replace('/formatter', '') || '/'}</span>
              </div>
              {tool.description && (
                <p className="text-sm text-muted-foreground mt-2">{tool.description}</p>
              )}
            </article>
          </Link>
        ))}
      </section>

      <footer className="mt-8 text-sm text-muted-foreground">
        Tip: select a tool to open its editor. Formatting is performed entirely on the client.
      </footer>
    </main>
  );
}
