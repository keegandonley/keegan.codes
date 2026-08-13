import dynamic from 'next/dynamic';

const HiTrack = dynamic(() => import('@/components/Track/Hi'));

interface ScanTrackerProps {
  slug: string;
  searchParams: Promise<{ scan?: string }>;
}

export const ScanTracker = async ({ slug, searchParams }: ScanTrackerProps) => {
  const params = await searchParams;

  return <HiTrack slug={slug} qrScanned={params?.scan === 'true'} />;
};
