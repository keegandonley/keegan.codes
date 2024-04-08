/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { getComponentForKey, getKey } from '@/app/blog/util';
import { BUCKET_URL } from '@/util/r2';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const width = searchParams.get('width') ?? '800';
  const height = searchParams.get('height') ?? '418';

  const oswaldData = await fetch(
    new URL('../../../fonts/Oswald.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  const oswaldLightData = await fetch(
    new URL('../../../fonts/Oswald-Light.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  if (!slug) {
    console.error('Missing slug at', request.url);
    return new Response('No slug provided', { status: 400 });
  }

  const key = getKey({ slug });
  if (!key) {
    console.error('Count not find the post for', slug, 'at', request.url);
    return new Response('No post found', { status: 404 });
  }

  const found = getComponentForKey({ key });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img
          src={`${BUCKET_URL}/${found.cover}`}
          style={{
            minWidth: '110%',
            minHeight: '100%',
            width: '110%',
            filter: 'blur(3px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundImage: 'linear-gradient(45deg, black, transparent)',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.4)',
            paddingBottom: '8%',
          }}
        >
          <h1
            style={{
              paddingLeft: 20,
              fontSize: 60,
              paddingBottom: 0,
              marginBottom: 0,
              color: 'white',
              padding: '5px 10% 0 10%',
              fontWeight: 'bold',
              fontFamily: '"Raleway"',
            }}
          >
            {found.title}
          </h1>
        </div>
        <div
          style={{
            padding: '120px 0 0 0',
            display: 'flex',
            position: 'absolute',
            left: '10%',
            bottom: '100px',
            alignItems: 'center',
          }}
        >
          <img
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              marginRight: 20,
              boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
              border: '2px solid white',
            }}
            src={`${BUCKET_URL}/avatar.jpg`}
          />
          <div
            style={{
              display: 'flex',
              color: 'white',
              flexDirection: 'column',
              fontSize: 20,
            }}
          >
            <span>Keegan Donley</span>
            <span
              style={{
                fontFamily: '"OswaldLight"',
                color: 'lightGray',
              }}
            >
              keegan.codes
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: parseInt(width),
      height: parseInt(height),
      fonts: [
        {
          name: 'Oswald',
          data: oswaldData,
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
