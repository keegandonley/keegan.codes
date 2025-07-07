import { Modal } from '@/components/Modal';
import { PostModal } from '@/components/PostModal';
import '../../../syntax-theme.css';
import wordCounts from '../../../../post-word-counts.json';
import dynamic from 'next/dynamic';

const Track = dynamic(() => import('@/components/Track'));

interface InterceptorProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Interceptor(args: InterceptorProps) {
  const params = await args?.params;

  if (!params) {
    return null;
  }

  const wordCount = (wordCounts as Record<string, number>)[params.slug];

  return (
    <Modal>
      <PostModal slug={params.slug} wordCount={wordCount} />
      <Track slug={params.slug} inModal />
    </Modal>
  );
}
