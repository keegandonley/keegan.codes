import Modal from "./Modal";
import RenderPost from "./RenderPost";

export default function Interceptor({ params }: any) {
  return (
    <Modal>
      <RenderPost slug={params.slug} />
    </Modal>
  );
}
