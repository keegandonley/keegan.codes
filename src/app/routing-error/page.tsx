import { notFound } from 'next/navigation';

export const runtime = 'edge';

// I want all 404 errors to go to the same page, so we do a redirect here,
// which then returns the not found UI. This way we can go to a specific route,
// but still respond with a 404.
export default function NotFoundPage() {
  return notFound();
}
