'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const LABELS: Record<string, string> = {
  blog: 'blog post',
  library: 'book',
  shortcode: 'shortcode',
};

const headerStyle = {
  fontWeight: '600',
  paddingTop: '2rem',
};

const pStyle = {
  paddingTop: '1rem',
  opacity: '0.8',
};

const linkStyle = {
  color: 'var(--theme-blue-2)',
  textDecoration: 'none',
};

const Body = ({ slug, label }: { slug: string | null; label: string }) => (
  <>
    {slug ? (
      <h2 style={headerStyle}>
        On no! I couldn&apos;t find a {label} for{' '}
        <code style={{ color: 'var(--theme-yellow)' }}>{slug}</code>
      </h2>
    ) : (
      <h2 style={headerStyle}>
        Oh no! I couldn&apos;t find a matching resource
      </h2>
    )}
    <p style={pStyle}>
      Don&apos;t worry, we&apos;ll get through this together.
    </p>
    <p style={pStyle}>
      Please double check your URL, and if you think you&apos;re seeing this
      message in error, please{' '}
      <Link
        href={`mailto:kd+brokenlink@keegandonley.com?subject=Broken link for ${label} at ${slug}`}
        style={linkStyle}
      >
        get in touch
      </Link>
      {slug ? (
        <>
          {' '}
          or{' '}
          <Link style={linkStyle} href={`/${slug}`}>
            retry your request
          </Link>
        </>
      ) : null}
      !
    </p>
  </>
);

export const NotFoundDetailFallback = () => <Body slug={null} label="page" />;

export const NotFoundDetail = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const [referrerParams, setReferrerParams] = useState<URLSearchParams | null>(
    null,
  );

  useEffect(() => {
    if (!document.referrer) {
      return;
    }

    try {
      setReferrerParams(new URL(document.referrer).searchParams);
    } catch {
    }
  }, []);

  const attemptedPath =
    pathname && pathname !== '/' ? pathname.replace(/^\//, '') : null;

  const slug =
    params?.get('slug') ?? referrerParams?.get('slug') ?? attemptedPath;
  const type = params?.get('type') ?? referrerParams?.get('type') ?? null;

  return <Body slug={slug} label={(type && LABELS[type]) || 'page'} />;
};
