/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { BUCKET_URL } from '@/util/r2';
import { cookies } from 'next/headers';

export const runtime = 'edge';

const darkBackground = 'rgba(32, 65, 123, 1)';
const lightBackground = 'rgba(227, 229, 240, 1)';

export async function GET(request: Request) {
  const allCookies = cookies();

  const theme = allCookies.get('theme');

  const darkMode = theme?.value === 'dark';

  const { searchParams } = new URL(request.url);
  const value = searchParams.get('value');

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          background: darkMode ? darkBackground : lightBackground,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: darkMode ? lightBackground : darkBackground,
            fontSize: 30,
            paddingBottom: 40,
          }}
        >
          <img
            style={{
              width: 200,
              paddingBottom: 30,
              filter: darkMode ? 'invert(1)' : 'invert(0.5)',
            }}
            src={`${BUCKET_URL}/radar-solid.svg`}
          />
          Sorry, {value} is not a valid short URL!
        </div>
        <img
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginRight: 20,
            boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
            border: '2px solid white',
            position: 'absolute',
            right: 30,
            bottom: 40,
          }}
          src={`${BUCKET_URL}/avatar.jpg`}
        />
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}
