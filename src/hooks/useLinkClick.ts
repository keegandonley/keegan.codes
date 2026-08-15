import { LoadingContext } from '@/app/loadingProvider';
import { usePathname } from 'next/navigation';
import { use, useCallback, useEffect } from 'react';

export const useLinkClick = () => {
  const ctx = use(LoadingContext);
  const path = usePathname();
  const { setLoading } = ctx;

  const onMouseUp = useCallback(
    (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.('a');

      if (!anchor || anchor.target === '_blank') {
        return;
      }

      const { href } = anchor;

      if (
        !href.startsWith(window.location.href) &&
        !href.startsWith('mailto:') &&
        !e.metaKey
      ) {
        setLoading(true);
      }
    },
    [setLoading],
  );

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);

    return () => document.removeEventListener('mouseup', onMouseUp);
  }, [onMouseUp]);

  useEffect(() => {
    setLoading(false);
  }, [path, setLoading]);
};
