import { BookContent } from '@/components/BookContent';
import { Metadata } from 'next';
import { getComponentForKey, getKey } from '../util';
import { BASEURL, NAME } from '@/metadata';

export const runtime = 'edge';

interface LibraryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: LibraryPageProps): Promise<Metadata> {
  const componentKey = getKey({ slug: params.slug });
  if (componentKey) {
    const found = getComponentForKey({ key: componentKey });

    return {
      title: `${found.title} · Keegan Donley's Reading List`,
      description: found.description,
      openGraph: {
        title: found.title,
        description: found.description,
        url: `${BASEURL}/library/${params.slug}`,
        siteName: NAME,
        locale: 'en_US',
        authors: ['Keegan Donley'],
        images: [
          {
            url: `/api/og/book?slug=${params.slug}&width=1200&height=630`,
            width: 1200,
            height: 630,
            type: 'image/png',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: found.title,
        description: found.description,
        creator: '@keegandonley',
        images: [`/api/og/book?slug=${params.slug}&width=1200&height=630`],
      },
    };
  }

  return {
    title: NAME,
  };
}

export default function LibrarySlugPage({ params }: LibraryPageProps) {
  return <BookContent slug={params.slug} />;
}
