import dynamic from "next/dynamic";
import { Suspense } from "react";
import Posts from "@/posts";
import { Delay } from "@/components/Delay";
import { AnimatedGraph } from "@/components/AnimatedGraph";

const DynamicPagination = dynamic(() => import("@/components/Pagination"));

const postsPerPage = 12;

export default function BlogLayout({ children }: any) {
  const allPosts = Object.keys(Posts);
  const pageCount = Math.ceil(allPosts.length / postsPerPage);
  return (
    <>
      {children}
      <Delay>
        <Suspense>
          <DynamicPagination pageCount={pageCount} segment="blog" />
        </Suspense>
        <AnimatedGraph />
      </Delay>
    </>
  );
}
