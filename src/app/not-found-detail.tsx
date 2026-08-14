'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
        Oh no! I couldn&apos;t find a {label} for{' '}
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
  const pathname = usePathname();

  const segments = pathname?.split('/').filter(Boolean) ?? [];
  const slug = segments.length ? segments[segments.length - 1] : null;
  const type = segments.length > 1 ? segments[0] : null;

  return <Body slug={slug} label={(type && LABELS[type]) || 'page'} />;
};
