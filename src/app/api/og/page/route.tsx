/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DESCRIPTION, NAME } from '@/metadata';
import { ImageResponse } from '@vercel/og';
import { Div } from '../components/Div';
import { postCount as bookCount } from '@/book-count';
import { postCount } from '@/post-count';
import { AVATAR_SRC } from '../avatar';
import { BACKGROUND_SRC } from '../background';
import { OG_CACHE_HEADERS } from '../cache';

const [instrumentSerifData, oswaldLightData] = await Promise.all([
  readFile(join(process.cwd(), 'src/app/fonts/InstrumentSerif.ttf')),
  readFile(join(process.cwd(), 'src/app/fonts/Oswald-Light.ttf')),
]);

const brandBlue = 'rgba(32, 65, 123, 1)';

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

  const canvasHeight = parseInt(height);
  const avatarSize = canvasHeight / 3;
  const titleSize = Math.round(canvasHeight / 7.5);
  const descriptionSize = Math.round(canvasHeight / 17);

  return new ImageResponse(
    <Div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        flexDirection: 'row',
        background: backgroundOverride ?? brandBlue,
        alignItems: 'center',
      }}
    >
      {!backgroundOverride && (
        <img
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src={BACKGROUND_SRC}
        />
      )}
      {!backgroundOverride && (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(150deg, rgba(4, 16, 42, 0.45) 0%, rgba(4, 16, 42, 0.78) 100%)',
          }}
        />
      )}
      <Div
        style={{
          position: 'relative',
          margin: '0 auto',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: '100%',
            boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.55)',
            border: '2px solid white',
          }}
          src={AVATAR_SRC}
        />
        <Div
          style={{
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h1
            style={{
              fontFamily: 'InstrumentSerif',
              fontSize: titleSize,
              fontWeight: 400,
              letterSpacing: '0.01em',
              margin: `${canvasHeight / 28}px 0 0 0`,
              color: textOverride ?? 'white',
            }}
          >
            {metadata.title}
          </h1>
          <span
            style={{
              fontFamily: 'OswaldLight',
              fontSize: descriptionSize,
              marginTop: canvasHeight / 60,
              color: textOverride ?? 'rgba(255, 255, 255, 0.82)',
            }}
          >
            {metadata.description}
          </span>
        </Div>
      </Div>
    </Div>,
    {
      width: parseInt(width),
      height: canvasHeight,
      headers: OG_CACHE_HEADERS,
      fonts: [
        {
          name: 'InstrumentSerif',
          data: instrumentSerifData,
          style: 'normal',
        },
        {
          name: 'OswaldLight',
          data: oswaldLightData,
          style: 'normal',
        },
      ],
    },
  );
}
