import Books from '@/books';
import { BookModal } from '@/components/BookModal';
import { Modal } from '@/components/Modal';

export const instant = false;

interface InterceptorProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return Object.keys(Books).map((key) => ({ slug: (Books as any)[key].slug }));
}

export default async function LibraryInterceptor(props: InterceptorProps) {
  const params = await props.params;

  return (
    <Modal>
      <BookModal slug={params.slug} wordCount={0} />
    </Modal>
  );
}
