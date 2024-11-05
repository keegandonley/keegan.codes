import { BookContent } from '@/components/BookContent';
import { Metadata } from 'next';
import { getComponentForKey, getKey } from '../util';
import { BASEURL, NAME } from '@/metadata';

export const runtime = 'edge';

interface LibraryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  props: LibraryPageProps,
): Promise<Metadata> {
  const params = await props.params;

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

export default async function LibrarySlugPage(props: LibraryPageProps) {
  const params = await props.params;

  return <BookContent slug={params.slug} />;
}
