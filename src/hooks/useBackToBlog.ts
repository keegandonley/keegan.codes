import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useBackToBlog = () => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    document.body.classList.remove("lockScroll");
    router.back();
  }, [router]);

  return handleBack;
};
