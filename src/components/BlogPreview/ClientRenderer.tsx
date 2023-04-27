"use client";
import { Post } from "@/types/post";
import { merge } from "@/util/classNames";
import { useState } from "react";
import styles from "./blogPreview.module.css";
import Image from "next/image";
import { BUCKET_URL } from "@/util/r2";
import { parseToProps } from "@/util/image";
import { H1 } from "../Post/Heading/H1";
import { Paragraph } from "../Paragraph";
import { BottomFade } from "../BottomFade";
import Link from "next/link";

interface PostWithMetadata extends Post {
  metadata?: ImageMetadata;
}

interface ClientRendererProps {
  posts: PostWithMetadata[];
}

export const ClientRenderer = ({ posts }: ClientRendererProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {posts.map((post, postIndex) => {
        return (
          <Link
            key={post.slug}
            className={merge(
              styles.imageParent,
              postIndex === activeIndex && styles.active
            )}
            onMouseOver={() => setActiveIndex(postIndex)}
            href={`/blog/${post.slug}`}
          >
            <span className={styles.text}>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
            </span>
            <Image
              src={`${BUCKET_URL}/${post.cover}`}
              alt="todo"
              fill
              {...parseToProps(post.metadata)}
            />
          </Link>
        );
      })}
    </>
  );
};
