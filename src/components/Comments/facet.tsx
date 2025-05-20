import { RichText } from '@atproto/api';
import Link from 'next/link';

export const replaceFacets = (content: string, facets: any) => {
  const rt = new RichText({
    text: content,
    facets,
  });

  const elements = [];
  for (const segment of Array.from(rt.segments())) {
    if (segment.isLink() && segment.link) {
      elements.push(
        <Link key={segment.link.uri} href={segment.link.uri} target="_blank">
          {segment.text}
        </Link>,
      );
    } else if (segment.isMention()) {
      elements.push(
        <Link
          key={segment.mention?.did}
          href={`https://bsky.app/profile/${segment.mention?.did}`}
          target="_blank"
        >
          {segment.text}
        </Link>,
      );
    } else {
      elements.push(<span key={segment.text}>{segment.text}</span>);
    }
  }

  return elements;
};
