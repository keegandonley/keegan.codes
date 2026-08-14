'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LABELS: Record<string, string> = {
  blog: 'blog post',
  library: 'book',
  shortcode: 'shortcode',
  tag: 'tag',
  thread: 'discussion',
};

const resolveType = (segments: string[]) => {
  if (segments[0] === 'blog' && segments[1] === 'tag') {
    return 'tag';
  }

  if (segments.length === 1) {
    return 'shortcode';
  }

  return segments.length > 1 ? segments[0] : null;
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

const Body = ({
  slug,
  label,
  retryHref,
}: {
  slug: string | null;
  label: string;
  retryHref?: string | null;
}) => (
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
        href={`mailto:kd+brokenlink@keegandonley.com?subject=${encodeURIComponent(
          slug ? `Broken link for ${label} at ${slug}` : `Broken ${label} link`,
        )}`}
        style={linkStyle}
      >
        get in touch
      </Link>
      {retryHref ? (
        <>
          {' '}
          or{' '}
          <Link style={linkStyle} href={retryHref}>
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
  const slug = segments.length
    ? decodeURIComponent(segments[segments.length - 1])
    : null;
  const type = resolveType(segments);

  return (
    <Body
      slug={slug}
      label={(type && LABELS[type]) || 'page'}
      retryHref={pathname && pathname !== '/' ? pathname : null}
    />
  );
};
