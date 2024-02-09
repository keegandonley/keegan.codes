import { LoadingContext } from "@/app/loadingProvider";
import { usePathname } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";

export const useLinkClick = () => {
  const ctx = useContext(LoadingContext);
  const path = usePathname();
  const { setLoading } = ctx;

  const onClick = useCallback(
    (href: string) => (e: MouseEvent) => {
      if (!href.startsWith(window.location.href)) {
        setLoading(true);
      }
    },
    [setLoading]
  );

  const getLinks = useCallback(() => {
    setTimeout(() => {
      const links = Array.from(document.getElementsByTagName("a"));
      for (const link of links) {
        if (link.target !== "_blank") {
          link.onmouseup = onClick(link.href);
        }
      }
    }, 1);
  }, [onClick]);

  useEffect(() => {
    const observer = new MutationObserver(getLinks);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => observer.disconnect();
  }, [getLinks]);

  useEffect(() => {
    setLoading(false);
  }, [path, setLoading]);
};
