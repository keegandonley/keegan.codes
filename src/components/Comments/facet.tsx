import { RichText } from '@atproto/api';
import Link from 'next/link';

export const replaceFacets = (content: string, facets: any) => {
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
      elements.push(
        <Link
          key={`link-${segment.link.uri}-${linkCount}`}
          href={segment.link.uri}
          target="_blank"
        >
          {segment.text}
        </Link>,
      );
    } else if (segment.isMention()) {
      mentionCount += 1;
      elements.push(
        <Link
          key={`mention-${segment.mention?.did}-${mentionCount}`}
          href={`https://bsky.app/profile/${segment.mention?.did}`}
          target="_blank"
        >
          {segment.text}
        </Link>,
      );
    } else {
      textCount += 1;
      elements.push(
        <span key={`text-${segment.text}-${textCount}`}>{segment.text}</span>,
      );
    }
  }

  return elements;
};
