import { BookModal } from "@/components/BookModal";
import { Modal } from "@/components/Modal";

export const runtime = "edge";

interface InterceptorProps {
  params: {
    slug: string;
  };
}

export default async function LibraryInterceptor({ params }: InterceptorProps) {
  return (
    <Modal>
      <BookModal slug={params.slug} wordCount={0} />
    </Modal>
  );
}
