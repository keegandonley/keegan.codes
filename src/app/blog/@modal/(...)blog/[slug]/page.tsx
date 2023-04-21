import { Modal } from "@/components/Modal";
import { PostModal } from "@/components/PostModal";
import "../../../../syntax-theme.css";

export const runtime = "experimental-edge";

interface InterceptorProps {
  params: {
    slug: string;
  };
}

export default function Interceptor({ params }: InterceptorProps) {
  return (
    <Modal>
      <PostModal slug={params.slug} />
    </Modal>
  );
}
