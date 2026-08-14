import { getSlugParams } from '@/app/library/util';
import { BookModal } from '@/components/BookModal';
import { Modal } from '@/components/Modal';

export const instant = false;

interface InterceptorProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getSlugParams();
}

export default async function LibraryInterceptor(props: InterceptorProps) {
  const params = await props.params;

  return (
    <Modal>
      <BookModal slug={params.slug} wordCount={0} />
    </Modal>
  );
}
