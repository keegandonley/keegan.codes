import { LoadingContext } from "@/app/loadingProvider";
import { usePathname } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";

export const useLinkClick = () => {
  const ctx = useContext(LoadingContext);
  const path = usePathname();
  const { setLoading } = ctx;

  const onClick = useCallback(
    (href: string) => (e: MouseEvent) => {
      if (href !== window.location.href) {
        setLoading(true);
      }
    },
    [setLoading]
  );

  const getLinks = useCallback(() => {
    const links = Array.from(document.getElementsByTagName("a"));
    for (const link of links) {
      if (link.getAttribute("data-click-handler-linked") !== "true") {
        if (link.target !== "_blank") {
          link.setAttribute("data-click-handler-linked", "true");
          link.onmouseup = onClick(link.href);
        }
      }
    }
  }, [onClick]);

  useEffect(() => {
    const interval = setInterval(() => {
      getLinks();
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [getLinks]);

  useEffect(() => {
    setLoading(false);
  }, [path, setLoading]);
};
