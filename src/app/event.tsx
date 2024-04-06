import { Banner } from '@/components/Banner';
import { get } from '@vercel/edge-config';

export const EventWaiter = async () => {
  const event: any = await get('event');

  return event?.active ? <Banner level={1}>{event.text}</Banner> : null;
};
