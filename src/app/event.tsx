import { Banner } from '@/components/Banner';
import { faMartiniGlass } from '@keegandonley/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from '@vercel/edge-config';

export const EventWaiter = async () => {
  const event: any = await get('event');

  if (event?.active && event.html) {
    return (
      <Banner level={1}>
        {event?.icon === 'martini' ? (
          <FontAwesomeIcon icon={faMartiniGlass} />
        ) : null}
        <div dangerouslySetInnerHTML={{ __html: event.html }} />
      </Banner>
    );
  }

  return event?.active ? <Banner level={1}>{event.text}</Banner> : null;
};
