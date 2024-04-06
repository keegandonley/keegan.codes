import { usePathname, useSelectedLayoutSegments } from 'next/navigation';

export const useBlogRouter = () => {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();

  const isLikelyInterceptedBlogPage =
    segments[0] === 'blog' && segments.length === 1;

  const isExactlyBlogPage = pathname === '/blog' || isLikelyInterceptedBlogPage;

  return isExactlyBlogPage;
};
