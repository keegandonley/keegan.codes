import { useRouter } from 'next/navigation';

export const useBackToBlog = () => {
  const router = useRouter();

  const handleBack = () => {
    document.body.classList.remove('lockScroll');
    router.back();
  };

  return handleBack;
};
