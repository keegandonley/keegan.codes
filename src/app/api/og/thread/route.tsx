/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { getComponentForKey, getKey } from '@/app/blog/util';
import { BUCKET_URL } from '@/util/r2';
import {
  AppBskyFeedDefs,
  AppBskyFeedGetPostThread,
  AppBskyFeedPost,
  RichText,
} from '@atproto/api';

export const runtime = 'edge';

const replaceFacets = (content: string, facets: any) => {
  const rt = new RichText({
    text: content,
    facets,
  });

  const elements = [];
  let linkCount = 0;
  let mentionCount = 0;
  let textCount = 0;
  for (const segment of Array.from(rt.segments())) {
    if (segment.isLink() && segment.link) {
      linkCount += 1;
      elements.push('');
    } else if (segment.isMention()) {
      mentionCount += 1;
      elements.push(segment.text);
    } else {
      textCount += 1;
      elements.push(segment.text);
    }
  }

  return elements.join('');
};

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

  const threadId = found.bskyThreadId;

  if (!threadId) {
    console.error('No thread ID found for', slug, 'at', request.url);
    return new Response('No thread found for post', { status: 404 });
  }

  const uri = `at://keegan.codes/app.bsky.feed.post/${threadId}`;

  const params = new URLSearchParams({ uri });

  const thread = await fetch(
    `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?${params.toString()}`,
  );

  if (!thread.ok) {
    console.error('Failed to fetch thread for', slug, 'at', request.url);
    return new Response('Failed to fetch thread for post', { status: 404 });
  }

  const data = (await thread.json()) as AppBskyFeedGetPostThread.OutputSchema;

  if (!AppBskyFeedDefs.isThreadViewPost(data.thread)) {
    console.error('Post is not a thread view');
    return new Response('Post is not a thread view', { status: 404 });
  }

  const threadData = data.thread as any;

  if (!threadData) {
    console.error('No thread data found for', slug, 'at', request.url);
    return new Response('No thread data found for post', { status: 404 });
  }

  if (!AppBskyFeedPost.isRecord(threadData.post.record)) {
    console.error('Post is not a valid record');
    return new Response('Post is not a valid record', { status: 404 });
  }

  const postContent = replaceFacets(
    (threadData.post.record as any).text,
    (threadData.post.record as any).facets,
  );

  const parsedHeight = parseInt(height);
  const contentFontSize =
    parsedHeight < 400
      ? 22
      : parsedHeight < 600
        ? 30
        : parsedHeight < 800
          ? 40
          : 50;

  return new ImageResponse(
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
            fontSize: contentFontSize,
            paddingBottom: 0,
            marginBottom: 0,
            color: 'white',
            padding: '5px 10% 0 10%',
            fontWeight: 'bold',
            fontFamily: '"Raleway"',
          }}
        >
          "{postContent}"
        </h1>
      </div>
      <div
        style={{
          padding: '120px 0 0 0',
          display: 'flex',
          position: 'absolute',
          left: '10%',
          bottom: '10%',
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
          src={threadData.post.author.avatar}
        />
        <div
          style={{
            display: 'flex',
            color: 'white',
            flexDirection: 'column',
            fontSize: 20,
          }}
        >
          <span>{threadData.post.author.displayName}</span>
          <span
            style={{
              fontFamily: '"OswaldLight"',
              color: 'lightGray',
            }}
          >
            @{threadData.post.author.handle} on Bluesky
          </span>
        </div>
      </div>
    </div>,
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
