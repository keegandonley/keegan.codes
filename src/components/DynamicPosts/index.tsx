"use client";

import { Post } from "@/types/post";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MDXEntryRow } from "../MDXEntryRow";

interface DynamicPostsProps {
  previousPage: number;
  isLikelyMobile: boolean;
  pageCount: number;
  postsPerPage: number;
}

interface PostWithViewCount extends Post {
  viewCount: number;
}

const DynamicPosts = (props: DynamicPostsProps) => {
  const { previousPage, isLikelyMobile, pageCount, postsPerPage } = props;
  const currentPage = previousPage + 1;
  const [isVisibile, setIsVisible] = useState(false);
  const [pageData, setPageData] = useState<PostWithViewCount[]>();
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= pageCount;

  const observer = useMemo(() => {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      return new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsVisible(true);
          }
        },
        {
          threshold: 0,
        }
      );
    }
  }, []);

  useEffect(() => {
    const element = document.getElementsByClassName(
      `last-element-page-${previousPage}`
    )[0];
    if (element) {
      observer?.observe(element);
    }

    return () => {
      if (element) {
        observer?.unobserve(element);
      }
    };
  }, [observer, previousPage]);

  const getPostData = useCallback(async () => {
    const result = await fetch(`/api/posts?page=${currentPage}`);
    setPageData(await result.json());
  }, [currentPage]);

  useEffect(() => {
    if (isVisibile && !pageData) {
      getPostData();
    }
  }, [getPostData, isVisibile, pageData]);

  return (
    <>
      {pageData?.map((post, index) => {
        return (
          <MDXEntryRow
            key={post.slug}
            index={index + previousPage * postsPerPage}
            isLikelyMobile={isLikelyMobile}
            {...post}
            published={new Date(post.published)}
            className={
              index === pageData.length - 1
                ? `last-element-page-${currentPage}`
                : ""
            }
            fixedViewCount={post.viewCount}
          />
        );
      })}
      {hasNextPage && pageData ? (
        <DynamicPosts
          previousPage={currentPage}
          isLikelyMobile={isLikelyMobile}
          pageCount={pageCount}
          postsPerPage={postsPerPage}
        />
      ) : null}
      {hasNextPage && !pageData ? (
        <>
          <MDXEntryRow
            key="extra-1"
            index={-1}
            filler
            isLikelyMobile={isLikelyMobile}
          />
          <MDXEntryRow
            key="extra-2"
            index={-1}
            filler
            isLikelyMobile={isLikelyMobile}
          />
          <MDXEntryRow
            key="extra-3"
            index={-1}
            filler
            isLikelyMobile={isLikelyMobile}
          />
        </>
      ) : null}
    </>
  );
};

export default DynamicPosts;
