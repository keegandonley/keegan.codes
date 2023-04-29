import { Modal } from "@/components/Modal";
import { PostModal } from "@/components/PostModal";
import "../../../syntax-theme.css";
import wordCounts from "../../../../post-word-counts.json";
import { Track } from "@/components/Track";

export const runtime = "nodejs";

interface InterceptorProps {
  params: {
    slug: string;
  };
}

export default async function Interceptor({ params }: InterceptorProps) {
  const wordCount = (wordCounts as Record<string, number>)[params.slug];
  return (
    <Modal>
      <PostModal slug={params.slug} wordCount={wordCount} />
      <Track slug={params.slug} inModal />
    </Modal>
  );
}
