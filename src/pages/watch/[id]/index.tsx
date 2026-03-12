import '@/tw.css';
import Head from 'next/head';
import Link from 'next/link';
import { headObject, listObjects } from '@/util/r2';
import { BASEURL } from '@/metadata';

export default function WatchPage({
  id,
  contentType,
}: {
  id: string;
  contentType: string;
}) {
  if (!id) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center bg-gray-900 text-gray-400">
        <div className="my-auto text-4xl">{':('}</div>
      </div>
    );
  }

  const title = `Watch · ${id} · Keegan Donley`;
  const description = `Video hosted on keegan.codes`;
  const pageUrl = `${BASEURL}/watch/${id}`;
  const ogImage = `${BASEURL}/api/og/page?page=home&width=1200&height=630`;

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-900">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="video.other" />
        <link rel="canonical" href={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@keegandonley" />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <div className="my-auto">
        <video width="100%" height="auto" controls preload="metadata">
          <source
            src={`https://video.static.donley.xyz/${id}`}
            type={contentType}
          />
          Your browser does not support the video tag.
        </video>
        <p className="p-2 text-gray-600 transition-colors hover:text-gray-400">
          <Link href="/">Back to keegan.codes</Link>
        </p>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  try {
    const res = await headObject(process.env.R2_WATCH_BUCKET!, params.id);

    if (res.ContentType?.includes('video')) {
      return {
        props: {
          id: params.id,
          contentType: res.ContentType,
        },
      };
    }
  } catch (ex) {
    // Do nothing
  }

  return {
    props: {},
  };
}

export async function getStaticPaths() {
  const objects = await listObjects({
    Bucket: process.env.R2_WATCH_BUCKET!,
  });

  const paths = objects?.map((item) => {
    return {
      params: {
        id: item.Key,
      },
    };
  });
  return { paths, fallback: true };
}
