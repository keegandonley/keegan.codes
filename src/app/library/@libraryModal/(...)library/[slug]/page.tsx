import { BookModal } from '@/components/BookModal';
import { Modal } from '@/components/Modal';

export const runtime = 'edge';

interface InterceptorProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LibraryInterceptor(props: InterceptorProps) {
  const params = await props.params;

  return (
    <Modal>
      <BookModal slug={params.slug} wordCount={0} />
    </Modal>
  );
}
