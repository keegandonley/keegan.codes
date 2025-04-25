/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { DESCRIPTION, NAME } from '@/metadata';
import { BUCKET_URL } from '@/util/r2';
import { ImageResponse } from '@vercel/og';
import { cookies } from 'next/headers';
import { Div } from '../components/Div';
import { postCount as bookCount } from '@/book-count';
import { postCount } from '@/post-count';

export const runtime = 'edge';

const darkBackground = 'rgba(32, 65, 123, 1)';

const getMetadata = (page: string) => {
  if (page === 'home') {
    return {
      title: NAME,
      description: DESCRIPTION,
    };
  }
  if (page === 'blog') {
    return {
      title: 'Blog · ' + NAME,
      description: `${postCount} posts and counting!`,
    };
  }
  if (page === 'library') {
    return {
      title: 'Library · ' + NAME,
      description: `A collection of ${bookCount} books I've enjoyed`,
    };
  }

  if (page === 'links') {
    return {
      title: 'Links · ' + NAME,
      description: 'A collection of links to useful resources',
    };
  }
};

export async function GET(request: Request) {
  const allCookies = await cookies();

  const theme = allCookies.get('theme');

  const darkMode = theme?.value === 'dark';

  const { searchParams } = new URL(request.url);
  const width = searchParams.get('width') ?? '800';
  const height = searchParams.get('height') ?? '418';
  const page = searchParams.get('page') ?? 'home';
  const backgroundOverride = searchParams.get('background');
  const textOverride = searchParams.get('text');

  const metadata = getMetadata(page);

  if (!metadata) {
    console.error('Missing metadata at', request.url);
    return new Response('No metadata found', { status: 400 });
  }

  return new ImageResponse(
    (
      <Div
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          background:
            backgroundOverride ?? (darkMode ? darkBackground : 'white'),
          alignItems: 'center',
        }}
      >
        <Div
          style={{
            margin: '0 auto',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            style={{
              width: parseInt(height) / 3,
              height: parseInt(height) / 3,
              borderRadius: '100%',
              boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
              border: '2px solid white',
            }}
            src={`${BUCKET_URL}/avatar.jpg`}
          />
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <h1
              style={{
                fontSize: '50px',
                color: textOverride ?? (darkMode ? 'white' : darkBackground),
              }}
            >
              {metadata.title}
            </h1>
            <span
              style={{
                fontSize: '25px',
                color: textOverride ?? (darkMode ? 'lightGray' : 'gray'),
              }}
            >
              {metadata.description}
            </span>
          </p>
        </Div>
      </Div>
    ),
    {
      width: parseInt(width),
      height: parseInt(height),
    },
  );
}
