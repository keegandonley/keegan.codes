import '@/tw.css';
import Link from 'next/link';
import { headObject, listObjects } from '@/util/r2';

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

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-900">
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
