import '@/tw.css';
import linkMapping from '../../links/links';
import va from '@vercel/analytics';
import Head from 'next/head';

const imageHeight = 630;
const imageWidth = 1200;
const imageUrl = `/api/og/page?page=links&width=${imageWidth}&height=${imageHeight}?background=black`;

export default function Links() {
  return (
    <>
      <Head>
        <title>Keegan&apos;s Links</title>
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:type" content={imageUrl} />
        <meta property="og:image:width" content={`${imageWidth}px`} />
        <meta property="og:image:height" content={`${imageHeight}px`} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:image:type" content={imageUrl} />
        <meta name="twitter:image:width" content={`${imageWidth}px`} />
        <meta name="twitter:image:height" content={`${imageHeight}px`} />
      </Head>
      <div className="min-h-dvh bg-black font-mono text-white">
        <div className="flex flex-col items-center px-4 pb-24 pt-24">
          <h1 className="text-2xl">Keegan&apos;s Links</h1>
          <p className="pt-2 text-center text-sm">
            Links to useful resources, things I&apos;ve worked on, ways to get
            in touch, etc.
          </p>
          <hr className="mt-4 w-1/2 p-0" />
          {linkMapping.sections.map((section) => {
            return (
              <div key={section.title} className="pb-6 pt-6 text-center">
                <h2 className="pb-4">{section.title}</h2>
                {section.links.map((link) => {
                  return (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      className="flex flex-col items-center pt-3 text-blue-500 transition-colors hover:text-blue-600"
                      onClick={() => {
                        va.track('Link Click', {
                          link: link.url,
                        });
                      }}
                    >
                      <span>{link.title}</span>
                      {link.description ? (
                        <span className="text-sm text-gray-400">
                          {' '}
                          ({link.description})
                        </span>
                      ) : (
                        ''
                      )}
                    </a>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
